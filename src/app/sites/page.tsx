
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Zap, Settings2, Globe, Server, ArrowRight, CheckCircle, Rocket, Wifi, Lock, SlidersHorizontal, Loader2, Bot, Sparkles, User, Users, HardDrive, Terminal, GitBranch, Languages } from 'lucide-react';
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

const sitePlans = [
  {
    id: 'site-pessoal',
    name: 'Site Pessoal',
    description: 'Perfeito para sites estáticos e portfólios.',
    storage: '10GB SSD',
    bandwidth: '100GB',
    ram: '1GB',
    cpu: '1 vCore',
    price: 9.99,
    features: ['Node.js, Python, Go', 'Deploy via Git', 'Backups Semanais'],
    available: true,
    paymenterProductId: 34, 
  },
  {
    id: 'site-profissional',
    name: 'Site Profissional',
    description: 'Ideal para blogs e pequenas empresas.',
    storage: '50GB SSD',
    bandwidth: '500GB',
    ram: '2GB',
    cpu: '2 vCores',
    price: 19.99,
    features: ['Node.js, Python, Go', 'Deploy via Git', 'Backups Diários'],
    available: true,
    paymenterProductId: 35,
  },
  {
    id: 'site-empresarial',
    name: 'Site Empresarial',
    description: 'Solução robusta para e-commerce e grandes sites.',
    storage: '100GB SSD',
    bandwidth: 'Ilimitado',
    ram: '4GB',
    cpu: '4 vCores',
    price: 39.99,
    features: ['Node.js, Python, Go', 'Deploy via Git', 'Backups Diários'],
    available: true,
    paymenterProductId: 36,
  },
];


export default function SitesPage() {
  const [selectedPlan, setSelectedPlan] = useState(sitePlans[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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
                <Globe className="w-4 h-4" />
                Sua Presença Online
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Hospedagem para Sites<br/>e <span className="text-primary">Aplicações Modernas</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Lance seu site ou aplicação com a performance que você precisa. Suporte a Next.js, Astro, Node.js, Python e muito mais.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start items-center gap-6 text-base">
                <div className="flex items-center gap-3 text-foreground">
                  <GitBranch className="w-5 h-5 text-primary"/>
                  Deploy via Git
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Lock className="w-5 h-5 text-primary"/>
                  SSL Grátis
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Zap className="w-5 h-5 text-primary"/>
                  Ativação Rápida
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
                    alt="Hospedagem de Aplicações"
                    className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                    data-ai-hint="robot mascot server"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 text-sm flex items-center gap-3 border border-muted">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-medium text-muted-foreground">+50 sites online</span>
                </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="planos" className="py-20">
          <div className="container max-w-7xl mx-auto px-4 pb-16">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold">Conheça nossos <span className="text-primary">planos</span></h2>
                <p className="text-muted-foreground mt-2 text-sm">Escolha o plano ideal para seu site. Todos os planos incluem proteção DDoS e as melhores tecnologias.</p>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Selecione um Plano</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sitePlans.map((plan) => (
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
                                <p className="flex justify-between items-start"><span>CPU:</span> <span className="font-semibold text-right">{plan.cpu}</span></p>
                                <p className="flex justify-between items-start"><span>RAM:</span> <span className="font-semibold text-right">{plan.ram}</span></p>
                                <p className="flex justify-between items-start"><span>Armazenamento:</span> <span className="font-semibold text-right">{plan.storage}</span></p>
                                <p className="flex justify-between items-start"><span>Tráfego Mensal:</span> <span className="font-semibold text-right">{plan.bandwidth}</span></p>
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
                        <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedPlan.storage}</span></div>
                        <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-primary" /><span>Tráfego de {selectedPlan.bandwidth}</span></div>
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
                      Servidores com discos SSD NVMe e otimização para garantir a melhor performance para sua aplicação.
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
                    <h3 className="mb-2 text-xl font-semibold">Segurança e Confiabilidade</h3>
                    <p className="text-muted-foreground">
                      Proteção Anti-DDoS, SSL grátis e backups automáticos para manter seu site sempre online e seguro.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Deploy Simplificado</h3>
                    <p className="text-muted-foreground">
                      Faça o deploy de suas aplicações diretamente do seu repositório Git com facilidade.
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
                    Tire suas dúvidas sobre a hospedagem de aplicações e sites modernos.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Languages className="m-auto size-4" /></div>
                        Quais frameworks e linguagens são suportados?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nossa plataforma é flexível e suporta as principais tecnologias para aplicações web, como Node.js (com Next.js, Express, Astro) e Python (com Django, Flask). Você tem a liberdade de configurar seu ambiente como preferir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Lock className="m-auto size-4" /></div>
                        O certificado SSL está incluso?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                     Sim, todos os nossos planos de hospedagem incluem um certificado SSL (Let's Encrypt) gratuito, que é instalado e renovado automaticamente para garantir a segurança da sua aplicação e a confiança dos seus usuários.
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
                        <div className="flex size-6"><GitBranch className="m-auto size-4" /></div>
                        Como funciona o deploy da minha aplicação?
                      </div>
                    </AccordionTrigger>
                     <AccordionContent className="pb-5 text-muted-foreground">
                      Você pode fazer o deploy facilmente conectando seu repositório Git (GitHub, GitLab, etc.). Após a configuração inicial, cada `git push` pode acionar um novo build e deploy automaticamente. Você também tem acesso ao terminal para gerenciamento manual.
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
