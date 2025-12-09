'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Route, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Static data for a single bin, as we don't have a backend
const binDetails = {
  id: 'bin-001',
  location: 'Praça da Sé',
  level: 95,
  status: 'Cheio',
  type: 'Indiferenciado',
  lastCollection: '2024-07-22 08:00',
  fillHistory: [
    { name: 'Seg', level: 30 },
    { name: 'Ter', level: 50 },
    { name: 'Qua', level: 75 },
    { name: 'Qui', level: 85 },
    { name: 'Sex', level: 90 },
    { name: 'Sáb', level: 92 },
    { name: 'Hoje', level: 95 },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Cheio':
      return 'hsl(var(--destructive))';
    case 'Médio':
      return 'hsl(var(--chart-3))';
    case 'Vazio':
      return 'hsl(var(--accent))';
    default:
      return 'hsl(var(--muted))';
  }
};

export default function WasteBinDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <PageTitle title="Detalhes do Contentor">
        <Button asChild variant="outline">
          <Link href="/dashboard/waste-bins">Voltar à Lista</Link>
        </Button>
      </PageTitle>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Trash2 className="h-8 w-8 text-primary" />
              {binDetails.location}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Tipo:</span>
              <span className="font-bold">{binDetails.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Estado:</span>
              <span
                className="font-bold"
                style={{ color: getStatusColor(binDetails.status) }}
              >
                {binDetails.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center font-medium">
                <span>Nível de Ocupação</span>
                <span className="font-bold text-primary text-2xl">
                  {binDetails.level}%
                </span>
              </div>
              <Progress value={binDetails.level} className="h-4" />
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="font-medium text-muted-foreground">
                Última Recolha:
              </span>
              <span>{binDetails.lastCollection}</span>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6" />
              Histórico de Ocupação (Últimos 7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pr-8">
            {/* A real chart would be implemented here */}
            <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
                 <p className="text-muted-foreground">Gráfico de histórico de ocupação apareceria aqui.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
