
'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Card, CardContent } from '@/components/ui/card';
import { Bus, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const nextBus = {
  line: '3A',
  destination: 'Sé',
  arrivalTime: 5, // minutes
};

export default function BusStopDisplayPage() {
  const [countdown, setCountdown] = useState(nextBus.arrivalTime * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="bg-background text-foreground">
      <PageTitle title="Ecrã de Paragem (Modo TV)" />
      <Card className="w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center text-center bg-card shadow-2xl p-8">
        <CardContent className="flex flex-col items-center justify-center p-0">
          <p className="text-4xl md:text-5xl font-medium text-muted-foreground mb-6">
            Próximo Autocarro
          </p>
          <div className="flex items-center gap-6 md:gap-8 mb-4">
            <Bus className="h-24 w-24 md:h-32 md:w-32 text-primary" />
            <div>
              <p className="text-6xl md:text-8xl font-bold leading-none">
                {nextBus.line}
              </p>
              <p className="text-3xl md:text-4xl font-light tracking-wider">
                {nextBus.destination}
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-4xl md:text-5xl font-medium text-muted-foreground mb-4 flex items-center gap-4">
               <Clock className="h-12 w-12" /> Chega em:
            </p>
            <p className="text-8xl md:text-9xl font-bold text-accent-foreground tabular-nums">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-center mt-4 text-muted-foreground">
        Este ecrã foi desenhado com alto contraste e texto grande para fácil leitura em paragens de autocarro.
      </div>
    </div>
  );
}
