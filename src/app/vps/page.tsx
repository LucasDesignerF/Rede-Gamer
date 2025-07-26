'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Zap, Settings2, Cpu, Server, MemoryStick, HardDrive, ArrowRight, CheckCircle, Rocket, Wifi, Lock, Layers, TrendingUp, Terminal, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createCheckoutLink } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

const vpsPlans = [
  { 
    id: 'vps-1', 
    name: 'VPS Starter', 
    vcpu: '2 vCores', 
    processor: 'AMD Ryzen 7 5700X',
    ram: '4GB DDR4', 
    storage: '30GB NVMe', 
    network: '1 Gbps', 
    price: 59.99, 
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 1
  },
  { 
    id: 'vps-2', 
    name: 'VPS Basic', 
    vcpu: '3 vCores', 
    processor: 'AMD Ryzen 7 5700X',
    ram: '8GB DDR4', 
    storage: '60GB NVMe', 
    network: '1 Gbps', 
    price: 91.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 2
  },
  { 
    id: 'vps-3', 
    name: 'VPS Growth', 
    vcpu: '4 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '12GB DDR4', 
    storage: '80GB NVMe', 
    network: '1 Gbps', 
    price: 119.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 3
  },
  { 
    id: 'vps-4', 
    name: 'VPS Pro', 
    vcpu: '5 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '16GB DDR4', 
    storage: '90GB NVMe', 
    network: '1 Gbps', 
    price: 149.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 4
  },
  { 
    id: 'vps-5', 
    name: 'VPS Business', 
    vcpu: '6 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '24GB DDR4', 
    storage: '128GB NVMe', 
    network: '1 Gbps', 
    price: 299.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 5
  },
  { 
    id: 'vps-6', 
    name: 'VPS Enterprise', 
    vcpu: '7 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '32GB DDR4', 
    storage: '192GB NVMe', 
    network: '1 Gbps', 
    price: 449.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 6
  },
  { 
    id: 'vps-7', 
    name: 'VPS Elite', 
    vcpu: '8 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '48GB DDR4', 
    storage: '210GB NVMe', 
    network: '1 Gbps', 
    price: 599.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 7
  },
  { 
    id: 'vps-8', 
    name: 'VPS Ultimate', 
    vcpu: '12 vCores',
    processor: 'AMD Ryzen 7 5700X',
    ram: '64GB DDR4', 
    storage: '256GB NVMe', 
    network: '1 Gbps', 
    price: 749.99,
    activation: '30 Segundos',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF',
    paymenterProductId: 8
  },
];

export default function VpsPage() {
  const [selectedPlan, setSelectedPlan] = useState(vpsPlans[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePlanSelect = (plan) => {
    if (plan.available) {
      setSelectedPlan(plan);
    }
  };

  const handlePurchase = async () => {
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
              <span className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                <Layers className="w-4 h-4" />
                Virtualização de Alta Performance
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Servidores VPS <br /> <span className="text-gradient">Flexibilidade e Escalabilidade</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Controle total, recursos dedicados e escalabilidade sob demanda. Nossos Servidores Virtuais Privados (VPS) são a solução perfeita para seus projetos em crescimento.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start items-center gap-6 text-base">
                <div className="flex items-center gap-3 text-foreground">
                  <Zap className="w-5 h-5 text-primary" />
                  Ativação Instantânea
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Terminal className="w-5 h-5 text-primary" />
                  Acesso Root
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  99.9% Uptime
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto">
                  Ver Planos
                </Button>
              </div>
            </div>
            <div className="hidden sm:block relative">
              <Image
                src="/images/ded.png"
                width="565"
                height="501"
                alt="Servidor VPS"
                className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                data-ai-hint="server cloud network"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="planos" className="py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mb-16">ESCOLHA SEU SERVIDOR VPS</h1>
          </div>
          <div className="container max-w-7xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-10">
                <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Selecione uma Configuração</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {vpsPlans.map((plan) => (
                        <div
                          id={plan.id}
                          key={plan.id}
                          onClick={() => handlePlanSelect(plan)}
                          className={cn(
                            "relative group cursor-pointer border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg",
                            selectedPlan.id === plan.id
                              ? "border-primary bg-muted ring-2 ring-primary"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50",
                            !plan.available && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {plan.discount && (
                            <span className="absolute top-4 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">{plan.discount}</span>
                          )}
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-lg text-zinc-800 dark:text-white">{plan.name}</p>
                              <p className="text-sm text-muted-foreground">{plan.vcpu} ({plan.processor})</p>
                            </div>
                            {!plan.available && <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-2 py-1 rounded-full">Indisponível</span>}
                          </div>
                          <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                          <div className="space-y-2 text-sm">
                            <p className="flex justify-between"><span>RAM:</span> <span className="font-semibold">{plan.ram}</span></p>
                            <p className="flex justify-between"><span>Armazenamento:</span> <span className="font-semibold">{plan.storage}</span></p>
                            <p className="flex justify-between"><span>Rede:</span> <span className="font-semibold">{plan.network}</span></p>
                          </div>
                          <p className="text-xl font-semibold mt-4 text-zinc-800 dark:text-white">R${plan.price.toFixed(2).replace('.', ',')}<span className="text-sm text-muted-foreground">/mês</span></p>
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
                    <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>{selectedPlan.vcpu} ({selectedPlan.processor})</span></div>
                    <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedPlan.ram}</span></div>
                    <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedPlan.storage}</span></div>
                    <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-primary" /><span>Rede de {selectedPlan.network}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>Ativação em {selectedPlan.activation}</span></div>
                    <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><span>Proteção Anti-DDoS Inclusa</span></div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Acesso Root Completo</span></div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>IP Dedicado</span></div>
                  </div>
                </div>
                <Button 
                  onClick={handlePurchase} 
                  disabled={isProcessing}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Contratar VPS'}
                  {!isProcessing && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-background py-20 text-foreground">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold lg:text-5xl">Sistemas Operacionais</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Veja as distribuições disponíveis que temos para instalação em seu servidor.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Image src="/images/Debian.svg" alt="Debian" width={80} height={80} data-ai-hint="operating system logo" />
                <span className="text-lg font-semibold">Debian</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <Image src="/images/Ubuntu.svg" alt="Ubuntu" width={80} height={80} data-ai-hint="operating system logo" />
                <span className="text-lg font-semibold">Ubuntu</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <Image src="/images/Windows%20Server.svg" alt="Windows Server" width={80} height={80} data-ai-hint="operating system logo" />
                <span className="text-lg font-semibold">Windows Server</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <Image src="/images/CentOS.svg" alt="CentOS" width={80} height={80} data-ai-hint="operating system logo" />
                <span className="text-lg font-semibold">CentOS</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-background text-foreground">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold lg:text-5xl">Por que escolher um Servidor VPS?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Descubra os benefícios de ter um ambiente virtualizado, flexível e seguro para seus projetos.
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
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Segurança de Ponta</h3>
                    <p className="text-muted-foreground">
                      Proteção DDoS com infraestrutura própria e Cloudflare Magic Transit, garantindo defesa robusta com mais de 321 Tbps.
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
                    <h3 className="mb-2 text-xl font-semibold">Flexibilidade Total</h3>
                    <p className="text-muted-foreground">
                      Instale o sistema operacional de sua escolha e personalize o ambiente como desejar com acesso root completo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Escalabilidade Fácil</h3>
                    <p className="text-muted-foreground">
                      Aumente ou diminua os recursos do seu VPS a qualquer momento para acompanhar o crescimento do seu projeto.
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
                    Encontre respostas para as dúvidas mais comuns sobre nossos servidores VPS.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Layers className="m-auto size-4" /></div>
                        O que é um Servidor VPS?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Um Servidor Virtual Privado (VPS) é um ambiente de servidor isolado criado dentro de um servidor físico mais potente. Ele oferece recursos (CPU, RAM, disco) que são dedicados a você, combinando a flexibilidade de um servidor dedicado com um custo mais acessível.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Terminal className="m-auto size-4" /></div>
                        Eu tenho acesso root ao servidor?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, você terá acesso root completo (ou de Administrador, no caso de Windows Server). Isso lhe dá total liberdade para instalar sistemas operacionais, softwares e configurar o ambiente de acordo com suas necessidades.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><TrendingUp className="m-auto size-4" /></div>
                        É possível fazer upgrade do meu plano VPS?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, uma das grandes vantagens do VPS é a escalabilidade. Você pode facilmente fazer upgrade (ou downgrade) do seu plano a qualquer momento através da sua área de cliente para ajustar os recursos conforme a necessidade do seu projeto.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Zap className="m-auto size-4" /></div>
                        Qual o tempo de ativação do VPS?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      A ativação do seu servidor VPS é instantânea após a confirmação do pagamento. Você receberá todas as informações de acesso por e-mail em poucos minutos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><ShieldCheck className="m-auto size-4" /></div>
                        Qual proteção DDoS está inclusa?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.
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
} // Added closing brace
