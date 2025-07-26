
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-foreground text-center px-4 bg-transparent"
    >
      <Image
        src="/images/sadface.gif"
        alt="Rosto triste"
        width={150}
        height={150}
        unoptimized
        className="mb-8 rounded-full"
        data-ai-hint="sad face"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">404 | Esta página não foi encontrada</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Parece que você se perdeu. O recurso que você está procurando não existe ou foi movido.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o Início
        </Link>
      </Button>
    </div>
  );
}
