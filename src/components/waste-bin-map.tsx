
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

// Hardcoded coordinates and status for the organic bins for simplicity
const bins = [
    { name: "Praça da Sé", coord: [41.8075, -6.7570] as [number, number], status: 'Cheio' },
    { name: "Jardim do Castelo", coord: [41.8045, -6.7555] as [number, number], status: 'Vazio' },
    { name: "Avenida Sá Carneiro", coord: [41.8080, -6.7590] as [number, number], status: 'Médio' },
    { name: "Mercado Municipal", coord: [41.8060, -6.7520] as [number, number], status: 'Cheio' },
    { name: "Parque dos Tupis", coord: [41.8050, -6.7540] as [number, number], status: 'Vazio' },
    { name: "Escola Superior de Educação", coord: [41.8000, -6.7600] as [number, number], status: 'Médio' },
    { name: "Câmara Municipal", coord: [41.8069, -6.7582] as [number, number], status: 'Vazio' },
    { name: "Largo do Principal", coord: [41.8058, -6.7593] as [number, number], status: 'Cheio' },
];

const createColoredIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="white" stroke-width="1.5"><path d="M12 2C7.03 2 3 6.03 3 11c0 6.5 9 11 9 11s9-4.5 9-11C21 6.03 16.97 2 12 2zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="12" cy="11" r="2.5" fill="white"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const statusConfig = {
  'Cheio': { color: 'hsl(var(--destructive))', icon: createColoredIcon('hsl(var(--destructive))') },
  'Médio': { color: 'hsl(var(--chart-3))', icon: createColoredIcon('hsl(var(--chart-3))') },
  'Vazio': { color: 'hsl(var(--accent))', icon: createColoredIcon('hsl(var(--accent))') },
};


export default function WasteBinMap({ className }: { className?: string }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current).setView([41.8061, -6.7569], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);


        // Add bin markers
        bins.forEach(bin => {
            const config = statusConfig[bin.status as keyof typeof statusConfig] || statusConfig['Médio'];
            L.marker(bin.coord, { icon: config.icon }).addTo(mapRef.current!).bindPopup(`<b>${bin.name}</b><br>Estado: ${bin.status}`);
        });

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

    }, []); 

    return <div ref={mapContainerRef} className={cn("h-full w-full", className)} style={{ zIndex: 0 }}></div>;
}
