
'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '@/lib/utils';
import { BusSimulator } from './bus-simulator';

// Data extracted from maps.html
const stops = [
    { nome: "Rodoviária", lat: 41.809415, lng: -6.760639 },
    { nome: "Tribunal", lat: 41.807603, lng: -6.758991 },
    { nome: "Rua 5 de Outubro", lat: 41.806847, lng: -6.758414 },
    { nome: "Rua Alexandre Herculano 1", lat: 41.805292, lng: -6.758664 },
    { nome: "Rua Alexandre Herculano 2", lat: 41.803494, lng: -6.759249 },
    { nome: "Flor da Ponte", lat: 41.800309, lng: -6.761267 },
    { nome: "Escola Agraria", lat: 41.796821, lng: -6.764754 },
    { nome: "Escola superior de Tecnologia", lat: 41.795326, lng: -6.767155 },
    { nome: "Planatorio", lat: 41.792746, lng: -6.769520 },
    { nome: "Avenida das Cantarias 1", lat: 41.790137, lng: -6.771144 },
    { nome: "Avenida das Cantarias", lat: 41.787688, lng: -6.773416 },
    { nome: "Rua Arquitecto Viana de Lima 1", lat: 41.788376, lng: -6.775767 },
    { nome: "Rua Arquitecto Viana de Lima 2", lat: 41.790521, lng: -6.779245 },
    { nome: "Rua Coronal Teófilo de Morais 1", lat: 41.791228, lng: -6.784129 },
    { nome: "Rua Coronel Teófilo de Morais 2", lat: 41.788297, lng: -6.780605 },
    { nome: "Rua Coronel Teófilo de Morais 3", lat: 41.787320, lng: -6.778463 },
    { nome: "Avenida das Cantarias 2", lat: 41.785224, lng: -6.775720 },
    { nome: "Avenida das Cantaias 3", lat: 41.783334, lng: -6.777509 },
    { nome: "Nerba", lat: 41.780167, lng: -6.779058 },
    { nome: "Avenida das CAntarias 4", lat: 41.780293, lng: -6.778807 },
    { nome: "Avenida das Cantarias 5", lat: 41.783100, lng: -6.777420 },
    { nome: "Avenida das Cantarias 6", lat: 41.784864, lng: -6.775736 },
    { nome: "Polidesportivo IPB", lat: 41.787401, lng: -6.773324 },
    { nome: "Avenida das Cantarias 7", lat: 41.789334, lng: -6.771464 },
    { nome: "Planatorio (Volta)", lat: 41.792702, lng: -6.769343 },
    { nome: "Escola Superior de TEcnologia (Volta)", lat: 41.795073, lng: -6.767225 },
    { nome: "Rua Artur Mirandela 1", lat: 41.794060, lng: -6.765672 },
    { nome: "Rua Artur Mirandela 2", lat: 41.794202, lng: -6.763812 },
    { nome: "Rua do Vale Churido", lat: 41.793875, lng: -6.761712 },
    { nome: "Rua do Vale Churido 2", lat: 41.794947, lng: -6.760367 },
    { nome: "Rua São João de BRito", lat: 41.798301, lng: -6.759672 },
    { nome: "Flor da Ponte (Volta)", lat: 41.800118, lng: -6.760573 },
    { nome: "Rua da República", lat: 41.805793, lng: -6.757107 },
    { nome: "Avenida João da Cruz", lat: 41.807384, lng: -6.758440 }
].map(p => ({ name: p.nome, coord: [p.lat, p.lng] as [number, number] }));

export const routePolyline: [number, number][] = stops.map(s => s.coord);
if (routePolyline.length > 0) {
    routePolyline.push(routePolyline[0]); // Close the loop
}

export const stopIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
});


const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        if (routePolyline.length > 1) {
            const bounds = L.latLngBounds(routePolyline);
            map.fitBounds(bounds, { padding: [40, 40] });
        }
    }, [map]);
    return null;
}

export default function BusMap({ className }: { className?: string }) {
    return (
        <MapContainer
            center={[41.8061, -6.7569]}
            zoom={15}
            scrollWheelZoom={false}
            className={cn("h-full w-full", className)}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={routePolyline} color="blue" weight={4} opacity={0.8} />
            {stops.map(stop => (
                <Marker key={stop.name} position={stop.coord} icon={stopIcon}>
                    <Tooltip>{stop.name}</Tooltip>
                </Marker>
            ))}
            <BusSimulator />
            <MapResizer />
        </MapContainer>
    );
}
