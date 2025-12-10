
'use client';
import { useEffect, useRef, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { routePolyline } from './bus-map';

const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -12],
});

// Utility functions
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function interpolateLatLng(a: [number, number], b: [number, number], t: number): [number, number] {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}
function segmentDistanceMeters(a: [number, number], b: [number, number]) {
    const R = 6371000;
    const toRad = (d: number) => d * Math.PI / 180;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

const segLens = routePolyline.length > 1 ? routePolyline.slice(0, -1).map((p, i) => segmentDistanceMeters(p, routePolyline[i + 1]!)) : [];

export const BusSimulator = () => {
    useMap();
    const [busPosition, setBusPosition] = useState<[number, number] | null>(routePolyline.length > 0 ? routePolyline[0] : null);
    const busState = useRef({ seg: 0, t: 0, speed: 6.11 });
    const animationFrameId = useRef<number | null>(null);
    const lastTime = useRef(performance.now());
    
    useEffect(() => {
        const animate = (now: number) => {
            const dt = (now - lastTime.current) / 1000;
            lastTime.current = now;

            const state = busState.current;
            let advance = state.speed * dt; // meters

            while (advance > 0 && segLens.length > 0) {
                const currentSeg = state.seg % segLens.length;
                const segLen = segLens[currentSeg] || 0;
                if (segLen === 0) {
                    state.seg = (state.seg + 1) % (routePolyline.length -1);
                    state.t = 0;
                    continue;
                }
                const rem = (1 - state.t) * segLen;

                if (advance < rem) {
                    state.t += advance / segLen;
                    advance = 0;
                } else {
                    advance -= rem;
                    state.seg = (state.seg + 1) % (routePolyline.length - 1);
                    state.t = 0;
                }
            }
            
            const currentPoint = routePolyline[state.seg];
            const nextPoint = routePolyline[state.seg + 1];

            if(currentPoint && nextPoint) {
                 const newPos = interpolateLatLng(currentPoint, nextPoint, state.t);
                 setBusPosition(newPos);
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            if(animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return busPosition ? <Marker position={busPosition} icon={busIcon} /> : null;
}
