'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BatteryCharging, Clock, MapPin, Route, Zap } from 'lucide-react';
import Link from 'next/link';

// Static data for a single charger, as we don't have a backend
const chargerDetails = {
  id: 'ev-01',
  location: 'Câmara Municipal',
  address: 'Praça do Município, 5300-275 Bragança',
  status: 'Disponível',
  type: 'CCS',
  power: '50 kW',
  estimatedWait: '0 min',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponível':
      return 'hsl(var(--accent))';
    case 'Ocupado':
      return 'hsl(var(--destructive))';
    default:
      return 'hsl(var(--muted))';
  }
};

export default function ChargerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <PageTitle title="Detalhes do Carregador">
        <Button asChild variant="outline">
          <Link href="/dashboard/chargers">Voltar à Lista</Link>
        </Button>
      </PageTitle>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <BatteryCharging className="h-8 w-8 text-primary" />
              {chargerDetails.location}
            </CardTitle>
            <CardDescription className='flex items-center gap-2 pt-2'>
                <MapPin className='h-4 w-4'/> {chargerDetails.address}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium text-muted-foreground">Estado:</span>
              <span
                className="font-bold text-2xl"
                style={{ color: getStatusColor(chargerDetails.status) }}
              >
                {chargerDetails.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Potência</p>
                    <p className="text-xl font-bold flex items-center justify-center gap-2"><Zap className="h-5 w-5"/> {chargerDetails.power}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Conector</p>
                    <p className="text-xl font-bold">{chargerDetails.type}</p>
                </div>
            </div>

             <div className="flex justify-between items-center text-base">
              <span className="font-medium text-muted-foreground">
                Tempo de espera estimado:
              </span>
              <span className='flex items-center gap-2 font-bold'><Clock className='h-5 w-5' />{chargerDetails.estimatedWait}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg h-[400px] md:h-auto">
          <CardContent className="p-0 h-full">
            {/* A real map would be implemented here, centered on the charger */}
            <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
                 <p className="text-muted-foreground">Mapa com a localização do posto apareceria aqui.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
