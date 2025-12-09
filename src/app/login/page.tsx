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

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <Link href="/" className='flex justify-center mb-4'>
              <Icons.logo className="h-16 w-16 text-primary" />
            </Link>
            <CardTitle className="text-3xl">Bem-vindo</CardTitle>
            <CardDescription className="text-base">
              Aceda à plataforma Smart Bragança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email ou NIF
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="seunome@email.com ou 123456789"
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
              Não tem conta?{' '}
              <Link
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Registe-se aqui.
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
