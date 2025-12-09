import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SplashPage() {
  const splashBg = PlaceHolderImages.find((img) => img.id === 'splash-bg');

  return (
    <main className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center p-4">
      {splashBg && (
        <Image
          src={splashBg.imageUrl}
          alt={splashBg.description}
          fill
          className="object-cover"
          data-ai-hint={splashBg.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <Icons.logo className="h-24 w-24 mb-4 text-white" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Smart Bragança
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light">
          Tecnologia a favor da cidade
        </p>
        <Button asChild size="lg" className="mt-10 text-lg px-8 py-6">
          <Link href="/login">Entrar na Plataforma</Link>
        </Button>
      </div>
      <div className="absolute bottom-6 z-10 text-center text-xs text-white/50">
        <p>Um projeto para um futuro mais sustentável e conectado.</p>
        <p>ODS: 7, 11, 12, 13</p>
      </div>
    </main>
  );
}
