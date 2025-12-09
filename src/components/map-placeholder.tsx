import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function MapPlaceholder({ className }: { className?: string }) {
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
}
