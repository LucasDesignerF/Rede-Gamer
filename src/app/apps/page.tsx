
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Zap, Settings2, Cpu, Server, MemoryStick, HardDrive, ArrowRight, CheckCircle, Rocket, Wifi, Lock, Code, Terminal, SlidersHorizontal, Loader2, Bot, Sparkles, User, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createCheckoutLink } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

type Tech = 'NodeJS' | 'Python';

const appPlans = [
  { 
    id: 'node-iniciante', 
    name: 'NodeJS Iniciante', 
    tech: 'NodeJS' as Tech,
    description: 'Ideal para iniciar seu bot em Node.js.',
    vcpu: '0.5vCPU Core', 
    ram: '1GB RAM', 
    bots: 2,
    storage: '10GB SSD NVMe', 
    price: 3.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 28,
  },
  { 
    id: 'node-profissional', 
    name: 'NodeJS Profissional', 
    tech: 'NodeJS' as Tech,
    description: 'Mais poder para aplicações Node.js.',
    vcpu: '1vCPU Cores', 
    ram: '2GB RAM', 
    bots: 4,
    storage: '20GB SSD NVMe', 
    price: 7.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 29,
  },
  { 
    id: 'node-empresarial', 
    name: 'NodeJS Empresarial', 
    tech: 'NodeJS' as Tech,
    description: 'Performance robusta para Node.js.',
    vcpu: '2vCPU Cores',
    ram: '4GB RAM', 
    bots: 8,
    storage: '30GB SSD NVMe', 
    price: 15.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 30,
  },
  { 
    id: 'python-iniciante', 
    name: 'Python Iniciante', 
    tech: 'Python' as Tech,
    description: 'Ideal para iniciar seu bot em Python.',
    vcpu: '0.5vCPU Core', 
    ram: '1GB RAM', 
    bots: 2,
    storage: '10GB SSD NVMe', 
    price: 3.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 31,
  },
  { 
    id: 'python-profissional', 
    name: 'Python Profissional', 
    tech: 'Python' as Tech,
    description: 'Mais poder para aplicações Python.',
    vcpu: '1vCPU Cores', 
    ram: '2GB RAM', 
    bots: 4,
    storage: '20GB SSD NVMe', 
    price: 7.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 32,
  },
  { 
    id: 'python-empresarial', 
    name: 'Python Empresarial', 
    tech: 'Python' as Tech,
    description: 'Performance robusta para Python.',
    vcpu: '2vCPU Cores',
    ram: '4GB RAM', 
    bots: 8,
    storage: '30GB SSD NVMe', 
    price: 15.99,
    features: ['Suporte Incluso', 'Anti-DDoS'],
    available: true,
    paymenterProductId: 33,
  },
];


export default function AppsPage() {
  const [selectedTech, setSelectedTech] = useState<Tech>('NodeJS');
  
  const filteredPlans = appPlans.filter(p => p.tech === selectedTech);
  
  const [selectedPlan, setSelectedPlan] = useState(filteredPlans[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleTechSelect = (tech: Tech) => {
    setSelectedTech(tech);
    const newFilteredPlans = appPlans.filter(p => p.tech === tech);
    if (newFilteredPlans.length > 0) {
      setSelectedPlan(newFilteredPlans[0]);
    }
  };
  
  const handlePlanSelect = (plan) => {
    if (plan.available) {
      setSelectedPlan(plan);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPlan || !selectedPlan.paymenterProductId) {
        toast({
            title: "Erro",
            description: "Este plano não está configurado para compra.",
            variant: "destructive",
        });
        return;
    }
    setIsProcessing(true);
    const result = await createCheckoutLink(selectedPlan.paymenterProductId);
    
    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    } else {
      toast({
        title: "Erro",
        description: result.error || "Não foi possível criar o link de checkout.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };


  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative bg-background overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
            <div className="max-w-3xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-purple-900/20 dark:text-purple-300 mb-6">
                <Sparkles className="w-4 h-4" />
                Melhor qualidade apenas aqui
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Hospedagem de Bots<br/>a partir de <span className="text-primary">R$3,99/mês</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Configure seu bot em segundos e mantenha tudo online 24/7. Performance garantida, escalabilidade fácil e proteção Anti-DDoS inclusa.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start items-center gap-6 text-base">
                <div className="flex items-center gap-3 text-foreground">
                  <Settings2 className="w-5 h-5 text-primary"/>
                  Setup em 60s
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary"/>
                  Anti-DDoS
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-primary"/>
                  99.9% Uptime
                </div>
              </div>
              <div className="mt-8">
              </div>
            </div>
            <div className="hidden sm:block relative">
                <Image
                    src="/images/bot.png"
                    width="565"
                    height="501"
                    alt="Bot"
                    className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                    data-ai-hint="robot mascot server"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 text-sm flex items-center gap-3 border border-muted">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-medium text-muted-foreground">+100 bots online</span>
                </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="planos" className="py-20">
          <div className="container max-w-7xl mx-auto px-4 pb-16">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold">Conheça nossos <span className="text-primary">planos</span></h2>
                <p className="text-muted-foreground mt-2 text-sm">Escolha o plano ideal para seu bot. Todos os planos incluem proteção DDoS e uptime de 99.7%</p>
                 <div className="flex justify-center flex-wrap gap-4 mt-6">
                    <Button 
                      onClick={() => handleTechSelect('NodeJS')} 
                      variant={selectedTech === 'NodeJS' ? 'default' : 'outline'}
                      className="px-6 py-6 text-sm rounded-xl">
                      <Image className="w-8 mr-2" src="/images/node.webp" alt="Node.js" width={32} height={32} />NodeJS
                    </Button>
                    <Button 
                      onClick={() => handleTechSelect('Python')} 
                      variant={selectedTech === 'Python' ? 'default' : 'outline'}
                      className="px-6 py-6 text-sm rounded-xl">
                      <Image className="w-8 mr-2" src="/images/python.webp" alt="Python" width={32} height={32} />Python
                    </Button>
                </div>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Selecione uma Configuração</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPlans.map((plan) => (
                            <div
                              id={plan.id}
                              key={plan.id}
                              onClick={() => handlePlanSelect(plan)}
                              className={cn(
                                "relative group cursor-pointer border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg",
                                selectedPlan?.id === plan.id
                                  ? "border-primary bg-muted ring-2 ring-primary"
                                  : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50",
                                !plan.available && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-lg text-zinc-800 dark:text-white">{plan.name}</p>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>
                                {!plan.available && <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-2 py-1 rounded-full">Indisponível</span>}
                              </div>
                              <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                              <div className="space-y-2 text-sm">
                                <p className="flex justify-between items-start"><span>CPU:</span> <span className="font-semibold text-right">{plan.vcpu}</span></p>
                                <p className="flex justify-between items-start"><span>RAM:</span> <span className="font-semibold text-right">{plan.ram}</span></p>
                                <p className="flex justify-between items-start"><span>Bots:</span> <span className="font-semibold text-right">{plan.bots}</span></p>
                                <p className="flex justify-between items-start"><span>Armazenamento:</span> <span className="font-semibold text-right">{plan.storage}</span></p>
                              </div>
                              <p className="text-xl font-semibold mt-4 text-zinc-800 dark:text-white">R${plan.price.toFixed(2).replace('.', ',')}<span className="text-sm text-muted-foreground">/mês</span></p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Card>
                </div>
                {selectedPlan && (
                  <div className="bg-card rounded-3xl h-fit p-6 md:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700 transition-all sticky top-24">
                    <h3 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Resumo do Pedido</h3>
                    <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-3">
                          <Server className="w-10 h-10 text-primary" />
                          <div>
                              <h4 className="font-bold text-lg">{selectedPlan.name}</h4>
                              <p className="flex items-center gap-2 text-xs text-muted-foreground"><strong>Localização:</strong><Image alt="Brasil" width={16} height={12} className="w-4 h-3 rounded-sm" src="https://flagcdn.com/w40/br.png" /></p>
                          </div>
                      </div>
                      <hr className="my-3 border-zinc-200 dark:border-zinc-700" />
                      <p className="font-semibold text-2xl">Total Mensal:<span className="text-gradient font-bold ml-1">R${selectedPlan.price.toFixed(2).replace('.', ',')}</span></p>
                      <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>{selectedPlan.vcpu}</span></div>
                        <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedPlan.ram}</span></div>
                        <div className="flex items-center gap-2"><Bot className="w-4 h-4 text-primary" /><span>{selectedPlan.bots} Bots</span></div>
                        <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedPlan.storage}</span></div>
                        {selectedPlan.features.map(feature => (
                           <div key={feature} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>{feature}</span></div>
                        ))}
                      </div>
                    </div>
                     <Button 
                      onClick={handlePurchase} 
                      disabled={isProcessing || !selectedPlan.available}
                      className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center"
                    >
                      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Contratar Plano'}
                      {!isProcessing && <ArrowRight className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </section>
        
        <section className="py-28 bg-background text-foreground">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold lg:text-5xl">Por que hospedar sua aplicação conosco?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Oferecemos um ambiente robusto, seguro e fácil de usar para que você possa focar no desenvolvimento.
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Desempenho Otimizado</h3>
                    <p className="text-muted-foreground">
                      Hardware com processadores AMD e armazenamento NVMe para garantir a melhor performance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Segurança e Estabilidade</h3>
                    <p className="text-muted-foreground">
                      Proteção Anti-DDoS e infraestrutura confiável para manter sua aplicação sempre online e segura.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Painel de Controle Intuitivo</h3>
                    <p className="text-muted-foreground">
                      Gerencie seus arquivos, veja logs em tempo real e administre sua aplicação com facilidade.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Ativação Rápida</h3>
                    <p className="text-muted-foreground">
                      Seu ambiente de hospedagem é liberado instantaneamente após a confirmação do pagamento.
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
                    Tire suas dúvidas sobre a hospedagem de aplicações e bots.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Code className="m-auto size-4" /></div>
                        Quais linguagens de programação são suportadas?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nossa plataforma é flexível e suporta as principais linguagens usadas para bots e aplicações, como Node.js, Python, Go e Java. Você tem a liberdade de configurar seu ambiente como preferir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Terminal className="m-auto size-4" /></div>
                        Eu tenho acesso ao terminal (shell)?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                     Sim, você terá acesso ao terminal através do nosso painel de controle web, permitindo que você instale dependências (via npm, pip, etc.) e gerencie sua aplicação com comandos.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><HardDrive className="m-auto size-4" /></div>
                        Posso hospedar um banco de dados?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, você pode hospedar bancos de dados como MySQL, MongoDB e Redis. O gerenciamento do banco de dados pode ser feito diretamente pelo nosso painel de controle.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Zap className="m-auto size-4" /></div>
                        Como funciona o deploy da minha aplicação?
                      </div>
                    </AccordionTrigger>
                     <AccordionContent className="pb-5 text-muted-foreground">
                      Você pode enviar seus arquivos facilmente através do nosso gerenciador de arquivos web ou via SFTP. Após o upload, basta usar o terminal para instalar as dependências e iniciar sua aplicação.
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
