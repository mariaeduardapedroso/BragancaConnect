'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { sustainableRoutePlanning } from '@/ai/flows/sustainable-route-planning';
import type { SustainableRoutePlanningOutput } from '@/ai/flows/sustainable-route-planning';
import { Loader2, Route, Clock, BarChart } from 'lucide-react';
import { MapPlaceholder } from '@/components/map-placeholder';

const formSchema = z.object({
  startLocation: z.string().min(2, {
    message: 'A localização de partida deve ter pelo menos 2 caracteres.',
  }),
  endLocation: z.string().min(2, {
    message: 'O destino deve ter pelo menos 2 caracteres.',
  }),
  preferences: z.array(z.string()).optional(),
});

const preferenceItems = [
  { id: 'walking', label: 'A pé' },
  { id: 'publicTransport', label: 'Transporte Público' },
  { id: 'electricVehicle', label: 'Veículo Elétrico' },
] as const;

export default function SustainableRoutingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SustainableRoutePlanningOutput | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: '',
      endLocation: '',
      preferences: ['publicTransport'],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await sustainableRoutePlanning({
        ...values,
        preferences: values.preferences as (
          | 'walking'
          | 'publicTransport'
          | 'electricVehicle'
        )[],
      });
      setResult(response);
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao planear a rota. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <PageTitle title="Planeador de Rota Sustentável" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Encontre o seu caminho verde</CardTitle>
            <CardDescription>
              Introduza a sua partida e destino para encontrar a rota mais
              ecológica, combinando várias opções de transporte.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="startLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Partida</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Praça da Sé"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Destino</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Centro de Compostagem"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Preferências
                        </FormLabel>
                        <FormDescription>
                          Selecione os seus modos de transporte preferidos.
                        </FormDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {preferenceItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="preferences"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value ?? []),
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'A calcular...' : 'Planear Rota'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="flex items-center justify-center">
          {!result && !isLoading && !error && (
             <div className="text-center text-muted-foreground">
                <Route className="mx-auto h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold">A sua rota aparecerá aqui</h3>
                <p>Preencha o formulário para começar.</p>
              </div>
          )}
          {isLoading && (
             <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-16 w-16 mb-4 animate-spin text-primary" />
                <h3 className="text-xl font-semibold">A IA está a pensar...</h3>
                <p>A gerar a melhor rota para si e para o planeta.</p>
              </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <Card className="w-full shadow-lg animate-in fade-in-50">
              <CardHeader>
                <CardTitle>Rota Sugerida</CardTitle>
                <CardDescription>
                  De {form.getValues('startLocation')} para{' '}
                  {form.getValues('endLocation')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Tempo Estimado</p>
                        <p className="text-2xl font-bold flex items-center justify-center gap-2"><Clock className="h-6 w-6"/> {result.estimatedTime}</p>
                    </div>
                     <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Sustentabilidade</p>
                        <p className="text-2xl font-bold flex items-center justify-center gap-2"><BarChart className="h-6 w-6"/>{result.sustainabilityScore || 'N/A'}/100</p>
                    </div>
                 </div>

                <div>
                    <h4 className="font-semibold mb-2">Instruções:</h4>
                    <p className="text-base whitespace-pre-wrap bg-muted p-4 rounded-lg">{result.routeDescription}</p>
                </div>

                <MapPlaceholder />

              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
