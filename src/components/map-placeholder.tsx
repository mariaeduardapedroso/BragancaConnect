import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';


export type MarkerData = {
    x: number;
    y: number;
    label: string;
}

export function MapPlaceholder({ className, markers = [] }: { className?: string, markers?: MarkerData[] }) {
  const mapImage = PlaceHolderImages.find(
    (img) => img.id === 'map-placeholder'
  );

  if (!mapImage) {
    return (
      <div
        className={cn(
          'aspect-[4/3] w-full rounded-lg bg-muted flex items-center justify-center',
          className
        )}
      >
        <p className="text-muted-foreground">Map loading...</p>
      </div>
    );
  }

  return (
    <div
      className={cn('relative aspect-video w-full rounded-lg overflow-hidden border shadow-sm', className)}
    >
      <Image
        src={mapImage.imageUrl}
        alt={mapImage.description}
        fill
        className="object-cover"
        data-ai-hint={mapImage.imageHint}
      />
      {markers.map((marker, index) => (
        <div key={index} style={{left: `${marker.x}%`, top: `${marker.y}%`}} className="absolute transform -translate-x-1/2 -translate-y-full">
            <div className="relative group">
                <MapPin className="h-10 w-10 text-primary fill-primary/40 drop-shadow-lg" />
                <div className="absolute bottom-full mb-2 w-max bg-foreground text-background text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 left-1/2">
                    {marker.label}
                </div>
            </div>
        </div>

      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
}
