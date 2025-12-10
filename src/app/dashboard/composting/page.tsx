
'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Leaf, Gift, Scale, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

// Static data for deposit history
const depositHistory = [
    { date: '2024-07-21', weight: 1.5, points: 15 },
    { date: '2024-07-18', weight: 0.8, points: 8 },
    { date: '2024-07-15', weight: 2.1, points: 21 },
    { date: '2024-07-12', weight: 1.2, points: 12 },
    { date: '2024-07-10', weight: 3.0, points: 30 },
]

export default function CompostingPage() {
  return (
    <div>
      <PageTitle title="Compostagem de Orgânicos" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              Histórico de Depósitos
            </CardTitle>
            <CardDescription>
              Consulte os seus últimos depósitos de resíduos orgânicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
                {depositHistory.map((deposit, index) => (
                    <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-background p-2 rounded-lg">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{deposit.date}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Scale className="h-4 w-4"/> {deposit.weight.toFixed(1)} kg
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <p className="font-bold text-xl text-right text-accent-foreground">+{deposit.points} PTS</p>
                        </div>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <Leaf className="h-20 w-20 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4">A sua contribuição faz a diferença!</h3>
                <p className="text-lg text-muted-foreground max-w-md">
                    Cada quilo de resíduo orgânico que composta ajuda a reduzir o lixo em aterros, diminui a emissão de gases de efeito estufa e cria um fertilizante natural para os nossos solos.
                </p>
            </div>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Recompensas</CardTitle>
                    <CardDescription>Veja o que pode ganhar com os seus pontos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/wallet">
                         <Button className="w-full h-14 text-lg">
                            <Gift className="mr-2" />
                            Ver a Minha Carteira
                            <ArrowRight className="ml-auto"/>
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
