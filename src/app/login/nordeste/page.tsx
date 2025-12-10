
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function NordesteLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the nordeste dashboard
    router.push('/dashboard-nordeste');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <Link href="/" className='flex justify-center mb-4'>
              <Icons.logo className="h-16 w-16 text-primary" />
            </Link>
            <CardTitle className="text-3xl">Portal Nordeste</CardTitle>
            <CardDescription className="text-base">
              Aceda à sua conta de entidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="entidade@nordeste.pt"
                required
                className="h-14 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Palavra-passe
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="h-14 text-lg"
                placeholder="********"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full h-14 text-lg">
              Entrar
            </Button>
            <p className="text-sm text-muted-foreground">
              Precisa de acesso?{' '}
              <Link
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Contacte o suporte.
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
