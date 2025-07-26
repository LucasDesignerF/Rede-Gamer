
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 md:col-span-4 text-center md:text-left">
            <h3 className="text-xl font-bold">Rede Gamer</h3>
            <p className="text-muted-foreground">Oferecendo as melhores soluções em hospedagem de servidores de jogos desde 2023.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">© 2025 Rede Gamer. Todos os direitos reservados.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">Termos de Serviço</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
