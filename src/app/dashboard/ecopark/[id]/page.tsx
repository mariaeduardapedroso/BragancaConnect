'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Trees, Sun, Zap, Bike, Smartphone, Tablet, Route } from 'lucide-react';
import Link from 'next/link';

// Static data for a single Ecopark
const ecoparkDetails = {
  id: 'ep-01',
  name: 'Ecoparque do Castelo',
  energy: 15.2,
  slots: 8,
  occupied: 3,
  address: 'Junto às Muralhas do Castelo de Bragança',
  devices: [
    { type: 'Bicicleta', count: 2 },
    { type: 'Smartphone', count: 5 },
    { type: 'Tablet', count: 1 },
  ]
};

export default function EcoparkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const freeSlots = ecoparkDetails.slots - ecoparkDetails.occupied;

  return (
    <div>
      <PageTitle title="Detalhes do Ecoparque">
        <Button asChild variant="outline">
          <Link href="/dashboard/ecopark">Voltar à Lista</Link>
        </Button>
      </PageTitle>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Trees className="h-8 w-8 text-primary" />
              {ecoparkDetails.name}
            </CardTitle>
            <CardDescription>{ecoparkDetails.address}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Energia Solar Gerada Hoje</p>
              <p className="text-4xl font-bold text-chart-3 flex items-center justify-center gap-2">
                <Sun className="h-8 w-8" /> {ecoparkDetails.energy} kWh
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center font-medium">
                <span className='text-lg'>Vagas de Carregamento</span>
                <span className="font-bold text-primary text-2xl">
                  {freeSlots} / {ecoparkDetails.slots}
                </span>
              </div>
              <Progress value={(ecoparkDetails.occupied / ecoparkDetails.slots) * 100} className="h-4" />
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Dispositivos Ligados</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <p className="flex items-center gap-2 font-medium"><Bike className="h-5 w-5 text-muted-foreground"/> Bicicletas</p>
                  <p className="font-bold text-lg">2</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <p className="flex items-center gap-2 font-medium"><Smartphone className="h-5 w-5 text-muted-foreground"/> Smartphones</p>
                  <p className="font-bold text-lg">5</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <p className="flex items-center gap-2 font-medium"><Tablet className="h-5 w-5 text-muted-foreground"/> Tablets/Outros</p>
                  <p className="font-bold text-lg">1</p>
                </div>
              </div>
            </div>
             <Button asChild size="lg" className="w-full h-14 text-xl">
              <Link href="/dashboard/sustainable-routing">
                <Route className="mr-3" />
                Criar Rota até Aqui
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardContent className="p-0 h-full">
            <MapPlaceholder className="aspect-auto h-full min-h-[500px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
