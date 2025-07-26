
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Sparkles, Settings2, Gamepad2, Server, MemoryStick, HardDrive, ArrowRight, CircleX, CheckCircle, Group, Cpu, Rocket, Wifi, Lock, Layers, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const games = [
  { id: 'rust', name: 'Rust', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg?t=1738927718', minRam: 6 },
  { id: 'palworld', name: 'Palworld', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg?t=1737094038', minRam: 8 },
  { id: 'dayz', name: 'DayZ', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/221100/header.jpg?t=1739463180', minRam: 6 },
  { id: 'project-zomboid', name: 'Project Zomboid', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg?t=1739309087', minRam: 4 },
  { id: '7d2d', name: '7 Days to Die', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/251570/header.jpg?t=1736194886', minRam: 4 },
  { id: 'unturned', name: 'Unturned', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/304930/header.jpg?t=1734630748', minRam: 4 },
  { id: 'satisfactory', name: 'Satisfactory', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/526870/header.jpg?t=1737364583', minRam: 6 },
  { id: 'terraria', name: 'Terraria', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1731252354', minRam: 4 },
];

const ramPlans = [
    { id: '4gb', ram: 4, storage: 30, price: 39.90, recommendedPlayers: '5-10' },
    { id: '6gb', ram: 6, storage: 45, price: 59.85, recommendedPlayers: '10-20' },
    { id: '8gb', ram: 8, storage: 60, price: 79.80, recommendedPlayers: '20-30' },
    { id: '10gb', ram: 10, storage: 75, price: 99.75, recommendedPlayers: '30-40' },
    { id: '12gb', ram: 12, storage: 90, price: 119.70, recommendedPlayers: '40-50' },
    { id: '16gb', ram: 16, storage: 120, price: 159.60, recommendedPlayers: '50-70' },
    { id: '20gb', ram: 20, storage: 150, price: 199.50, recommendedPlayers: '70-90' },
    { id: '24gb', ram: 24, storage: 180, price: 239.40, recommendedPlayers: '90-110' },
    { id: '32gb', ram: 32, storage: 240, price: 319.20, recommendedPlayers: '110-150' },
    { id: '48gb', ram: 48, storage: 360, price: 478.80, recommendedPlayers: '150-200' },
    { id: '64gb', ram: 64, storage: 480, price: 638.40, recommendedPlayers: '200+' },
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [selectedRamPlan, setSelectedRamPlan] = useState(ramPlans.find(p => p.ram >= games[0].minRam) || ramPlans[0]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    const suitablePlan = ramPlans.find(p => p.ram >= game.minRam) || ramPlans[0];
    setSelectedRamPlan(suitablePlan);
  };

  const handleRamSelect = (plan) => {
    setSelectedRamPlan(plan);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative bg-background overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
            <div className="max-w-3xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Melhor qualidade apenas aqui
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Hospedagem de Jogos<br />a partir de <span className="text-gradient">R$39,90/mês</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Servidores sob medida para seus jogos. Configure em segundos, jogue com amigos e aproveite a performance de ponta com proteção Anti-DDoS.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start items-center gap-6 text-base">
                <div className="flex items-center gap-3 text-foreground">
                  <Settings2 className="w-5 h-5 text-primary" />
                  Setup em 60s
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Anti-DDoS
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  99.9% Uptime
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto">
                  Criar Servidor Agora
                </Button>
              </div>
            </div>
            <div className="hidden sm:block relative">
              <Image
                src="/images/games.png"
                width="565"
                height="501"
                alt="Hospedagem de Servidores de Jogos"
                className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                data-ai-hint="game character controller"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 text-sm flex items-center gap-3 border border-muted">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-medium text-muted-foreground">+20 aplicações online</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="planos" className="py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mb-16">MONTE SEU PLANO</h1>
          </div>
          <div className="container max-w-7xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha o Jogo</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {games.map((game) => (
                          <div
                            key={game.id}
                            onClick={() => handleGameSelect(game)}
                            className={cn(
                              "relative group cursor-pointer border rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-lg",
                              selectedGame.id === game.id
                                ? "border-primary bg-muted ring-2 ring-primary"
                                : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50"
                            )}
                          >
                            <Image src={game.imageUrl} alt={game.name} width={64} height={64} className="mx-auto rounded-md mb-2 object-cover" data-ai-hint="game logo" />
                            <p className="font-semibold text-sm text-zinc-800 dark:text-white truncate">{game.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha a Memória RAM</h2>
                      <p className="text-muted-foreground mb-4 -mt-2 text-sm">O plano recomendado para <span className="font-bold text-primary">{selectedGame.name}</span> precisa de no mínimo {selectedGame.minRam}GB de RAM.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {ramPlans
                          .filter(plan => plan.ram >= selectedGame.minRam)
                          .map((plan) => (
                            <div
                              id={plan.id}
                              key={plan.id}
                              onClick={() => handleRamSelect(plan)}
                              className={cn(
                                "relative group cursor-pointer border rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg",
                                selectedRamPlan.id === plan.id
                                  ? "border-primary bg-muted ring-2 ring-primary"
                                  : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50"
                              )}
                            >
                              <Server className="text-3xl mx-auto mt-3 mb-3 text-primary" />
                              <p className="font-bold text-lg text-zinc-800 dark:text-white">{plan.ram}GB RAM</p>
                              <p className="text-sm font-semibold mt-2 text-zinc-800 dark:text-white">R${plan.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="bg-card rounded-3xl h-fit p-6 md:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700 transition-all sticky top-24">
                  <h3 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Resumo do Pedido</h3>
                  <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="flex items-center gap-3">
                        <Image src={selectedGame.imageUrl} alt={selectedGame.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="game logo" />
                        <div>
                            <h4 className="font-bold text-lg">{selectedGame.name}</h4>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground"><strong>Localização:</strong><Image alt="Brasil" width={16} height={12} className="w-4 h-3 rounded-sm" src="https://flagcdn.com/w40/br.png" /></p>
                        </div>
                    </div>
                    <hr className="my-3 border-zinc-200 dark:border-zinc-700" />
                    <p className="font-semibold text-2xl">Total Mensal:<span className="text-gradient font-bold ml-1">R${selectedRamPlan.price.toFixed(2).replace('.', ',')}</span></p>
                    <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                    <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-primary" /><span>{selectedGame.name}</span></div>
                      <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>Ryzen 9 9950X/7950X</span></div>
                      <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedRamPlan.ram}GB RAM</span></div>
                      <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedRamPlan.storage}GB SSD NVME</span></div>
                      <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><span>Proteção Anti-DDoS Inclusa</span></div>
                      
                      {selectedRamPlan.ram >= selectedGame.minRam ? (
                        <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600">Recomendado para {selectedRamPlan.recommendedPlayers} jogadores</span></div>
                      ) : (
                        <div className="flex items-center gap-2"><CircleX className="w-4 h-4 text-yellow-500" /><span className="text-yellow-600">Pode apresentar baixa performance</span></div>
                      )}
                    </div>
                  </div>
                  <a href="https://financeiro.redegamer.com.br/store/minecraft-br-ryzen-7-5700x/minecraft-5700x-br-01" target="_blank" rel="noopener noreferrer" className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center">
                    Criar Servidor Agora<ArrowRight className="w-4 h-4" />
                  </a>
                </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-background text-foreground">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold lg:text-5xl">Por que escolher nossos servidores?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Descubra como oferecemos estabilidade, segurança e suporte incomparável para o seu projeto.
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Hardware Premium</h3>
                    <p className="text-muted-foreground">
                      Processadores AMD de alto desempenho e armazenamento NVMe para máximo desempenho.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Rede de Alta Velocidade</h3>
                    <p className="text-muted-foreground">
                      Conexões de até 10Gbps com proteção Anti-DDoS incluída em todos os planos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Suporte Especializado</h3>
                    <p className="text-muted-foreground">
                      Equipe técnica disponível 24/7 para auxiliar em qualquer necessidade.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Garantia de Uptime</h3>
                    <p className="text-muted-foreground">
                      99.7% de disponibilidade garantida com monitoramento constante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dark:bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-10 md:flex-row md:gap-16">
              <div className="md:w-1/3">
                <div className="sticky top-20">
                  <h2 className="mt-4 text-4xl md:text-5xl font-bold">Perguntas Frequentes</h2>
                  <p className="text-muted-foreground mt-4">
                    Encontre respostas para as dúvidas mais comuns sobre nossos serviços de hospedagem de jogos.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Gamepad2 className="m-auto size-4" /></div>
                        O que é uma hospedagem de jogos e como funciona?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Hospedagem de jogos é um serviço que permite alugar servidores para hospedar jogos multiplayer online. Isso garante que o jogo esteja sempre disponível para outros jogadores se conectarem e jogarem juntos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Clock className="m-auto size-4" /></div>
                        Qual é o tempo de ativação da hospedagem?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      A ativação do servidor é instantânea após a confirmação do pagamento. Você receberá os dados de acesso por e-mail em poucos minutos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                       <div className="flex items-center gap-3">
                        <div className="flex size-6"><Layers className="m-auto size-4" /></div>
                         Posso trocar o jogo do meu servidor depois de contratado?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                     Sim, você pode! Oferecemos a flexibilidade de reinstalar um novo jogo em seu servidor a qualquer momento através do nosso painel de controle. Lembre-se de fazer um backup do seu mundo antigo, pois a reinstalação apagará os dados atuais.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><TrendingUp className="m-auto size-4" /></div>
                        É possível fazer upgrade do plano?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, você pode fazer o upgrade (ou downgrade) do seu plano a qualquer momento diretamente pela área do cliente, pagando apenas a diferença.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-5" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><ShieldCheck className="m-auto size-4" /></div>
                        Existe proteção contra ataques DDoS?
                      </div>
                    </AccordionTrigger>
                     <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, todos os nossos servidores incluem proteção avançada contra ataques DDoS para garantir que seu jogo permaneça online e estável, mesmo sob ataque.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

      </main>
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
    </div>
  );
}
