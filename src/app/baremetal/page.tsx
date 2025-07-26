
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Sparkles, Settings2, MapPin, Cpu, Server, MemoryStick, HardDrive, ArrowRight, CheckCircle, Rocket, Wifi, Lock, Package, Wrench, DatabaseBackup, TrendingUp, Columns, Construction, Network, ArrowLeftRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const allBareMetalPlans = [
  {
    id: 'bm-sp-5600',
    name: 'BM-SP-5600',
    processor: 'AMD Ryzen 5 5600',
    cores: '6 Núcleos / 12 Threads',
    clock: 'Até 4.4GHz',
    ram: '64GB DDR4',
    storage: '1TB NVMe',
    network: '1 Gbps',
    price: 1479.99,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-5500',
    name: 'BM-SP-5500',
    processor: 'AMD Ryzen 5 5500',
    cores: '6 Núcleos / 12 Threads',
    clock: 'Até 4.2GHz',
    ram: '64GB DDR4',
    storage: '500GB NVMe',
    network: '1 Gbps',
    price: 1049.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-12400f',
    name: 'BM-SP-12400F',
    processor: 'INTEL Core i5-12400F',
    cores: '6 Núcleos / 12 Threads',
    clock: 'Até 4.4GHz',
    ram: '64GB DDR4',
    storage: '1TB NVMe',
    network: '1 Gbps',
    price: 1124.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-5700',
    name: 'BM-SP-5700',
    processor: 'AMD Ryzen 7 5700',
    cores: '8 Núcleos / 16 Threads',
    clock: 'Até 4.6GHz',
    ram: '128GB DDR4',
    storage: '1TB NVMe',
    network: '1 Gbps',
    price: 1349.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-5900xt',
    name: 'BM-SP-5900XT',
    processor: 'AMD Ryzen 9 5900XT',
    cores: '16 Núcleos / 32 Threads',
    clock: 'Até 4.8GHz',
    ram: '128GB DDR4',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 1799.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-7950x-64',
    name: 'BM-SP-7950X',
    processor: 'AMD Ryzen 9 7950X',
    cores: '16 Núcleos / 32 Threads',
    clock: 'Até 5.7GHz',
    ram: '64GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 3099.99,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-7900',
    name: 'BM-SP-7900',
    processor: 'AMD Ryzen 9 7900',
    cores: '12 Núcleos / 24 Threads',
    clock: 'Até 5.4GHz',
    ram: '128GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 2249.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-9900x',
    name: 'BM-SP-9900X',
    processor: 'AMD Ryzen 9 9900X',
    cores: '12 Núcleos / 24 Threads',
    clock: 'Até 5.6GHz',
    ram: '128GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 2699.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-9950x-128',
    name: 'BM-SP-9950X',
    processor: 'AMD Ryzen 9 9950X',
    cores: '12 Núcleos / 24 Threads',
    clock: 'Até 5.6GHz',
    ram: '128GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 2999.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-7950x-128',
    name: 'BM-SP-7950X Pro',
    processor: 'AMD Ryzen 9 7950X',
    cores: '16 Núcleos / 32 Threads',
    clock: 'Até 5.7GHz',
    ram: '128GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 3699.99,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
  {
    id: 'bm-sp-9950x-192',
    name: 'BM-SP-9950X Pro',
    processor: 'AMD Ryzen 9 9950X',
    cores: '16 Núcleos / 32 Threads',
    clock: 'Até 5.6GHz',
    ram: '192GB DDR5',
    storage: '2TB NVMe',
    network: '1 Gbps',
    price: 3299.90,
    setupFee: 'Grátis',
    activation: '72 Horas',
    protection: 'Nossa proteção contra DDoS conta com infraestrutura própria em São Paulo, múltiplos pontos de mitigação distribuídos estrategicamente e a tecnologia Cloudflare Magic Transit. Com isso, garantimos defesa robusta com capacidade superior a 321 Tbps contra ataques em todas as camadas.',
    available: true,
    discount: '50% OFF'
  },
];

const categories = [
    { id: 'amd', name: 'AMD Ryzen' },
    { id: 'intel', name: 'INTEL Core' },
];

export default function BareMetalPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredPlans = allBareMetalPlans
    .filter(p => p.processor.toUpperCase().startsWith(selectedCategory.name.toUpperCase()))
    .sort((a, b) => a.price - b.price);
  
  const [selectedPlan, setSelectedPlan] = useState(filteredPlans[0] || allBareMetalPlans.find(p => p.available) || allBareMetalPlans[0]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const newFilteredPlans = allBareMetalPlans.filter(p => p.processor.toUpperCase().startsWith(category.name.toUpperCase())).sort((a,b) => a.price - b.price);
    if (newFilteredPlans.length > 0) {
      setSelectedPlan(newFilteredPlans[0]);
    } else if (allBareMetalPlans.length > 0) {
      setSelectedPlan(allBareMetalPlans.find(p => p.available) || allBareMetalPlans[0]);
    }
  };

  const handlePlanSelect = (plan) => {
    if (plan.available) {
      setSelectedPlan(plan);
    }
  };
  
  const formatPrice = (price) => {
    if (price === 0) return 'Consulte';
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  const renderPlanCard = (plan) => (
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
            <p className="font-bold text-lg text-zinc-800 dark:text-white">{plan.processor}</p>
            <p className="text-sm text-muted-foreground">{plan.cores} ({plan.clock})</p>
        </div>
        {!plan.available && <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-2 py-1 rounded-full">Indisponível</span>}
      </div>
      <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
      <div className="space-y-2 text-sm">
        <p className="flex justify-between"><span>RAM:</span> <span className="font-semibold">{plan.ram}</span></p>
        <p className="flex justify-between"><span>Armazenamento:</span> <span className="font-semibold">{plan.storage}</span></p>
        <p className="flex justify-between"><span>Rede:</span> <span className="font-semibold">{plan.network}</span></p>
      </div>
      <p className="text-xl font-semibold mt-4 text-zinc-800 dark:text-white">
        {plan.price > 0 ? `R$${formatPrice(plan.price)}` : formatPrice(plan.price)}
        {plan.price > 0 && <span className="text-sm text-muted-foreground">/mês</span>}
      </p>
    </div>
  );


  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative bg-background overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
            <div className="max-w-3xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                <Server className="w-4 h-4" />
                Performance Absoluta
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Servidores Bare Metal<br /> <span className="text-gradient">Hardware 100% Dedicado</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Potência máxima, sem virtualização. Obtenha acesso exclusivo a recursos de hardware para suas aplicações mais exigentes com nossos servidores Bare Metal.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start items-center gap-6 text-base">
                <div className="flex items-center gap-3 text-foreground">
                  <Settings2 className="w-5 h-5 text-primary" />
                  Ativação Rápida
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
                 <a href="#planos">
                    <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto">
                    Ver Planos
                    </Button>
                </a>
              </div>
            </div>
            <div className="hidden sm:block relative">
              <Image
                src="/images/Bare-Metal.png"
                width="565"
                height="501"
                alt="Servidor Bare Metal"
                className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                data-ai-hint="server rack"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="planos" className="py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mb-16">ESCOLHA SEU SERVIDOR BARE METAL</h1>
          </div>
          <div className="container max-w-7xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha a Categoria</h2>
                        <div className="flex flex-wrap gap-4">
                            {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="outline"
                                onClick={() => handleCategorySelect(cat)}
                                className={cn(
                                "px-5 py-2.5 rounded-xl cursor-pointer text-sm font-semibold transition border flex items-center gap-2",
                                selectedCategory.id === cat.id
                                    ? "border-primary bg-muted"
                                    : "text-zinc-700 dark:text-zinc-300 border-zinc-300 bg-white dark:bg-zinc-800 hover:border-primary/50"
                                )}
                            >
                                <Cpu className="w-4 h-4" />{cat.name}
                            </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Planos {selectedCategory.name}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {filteredPlans.map(renderPlanCard)}
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
                            <h4 className="font-bold text-lg">{selectedPlan.processor}</h4>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground"><strong>Localização:</strong><Image alt="Brasil" width={16} height={12} className="w-4 h-3 rounded-sm" src="https://flagcdn.com/w40/br.png" /></p>
                        </div>
                    </div>
                    <hr className="my-3 border-zinc-200 dark:border-zinc-700" />
                    <p className="font-semibold text-2xl">Total Mensal:
                      <span className="text-gradient font-bold ml-1">
                        {selectedPlan.price > 0 ? `R$${formatPrice(selectedPlan.price)}` : formatPrice(selectedPlan.price)}
                      </span>
                    </p>
                     <p className="text-sm text-muted-foreground">Taxa de instalação: {selectedPlan.setupFee}</p>
                    <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                    <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>{selectedPlan.processor}</span></div>
                      <div className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-primary" /><span>{selectedPlan.cores} ({selectedPlan.clock})</span></div>
                      <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedPlan.ram}</span></div>
                      <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedPlan.storage}</span></div>
                      <div className="flex items-center gap-2"><Network className="w-4 h-4 text-primary" /><span>Rede de {selectedPlan.network}</span></div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>Ativação em {selectedPlan.activation}</span></div>
                      <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><span>Proteção Anti-DDoS Inclusa</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Acesso Root Completo</span></div>
                    </div>
                  </div>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center">
                    Contratar Servidor<ArrowRight className="w-4 h-4" />
                  </a>
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
              <h2 className="text-4xl font-bold lg:text-5xl">Por que escolher Bare Metal?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Descubra os benefícios de ter um hardware 100% dedicado para suas aplicações mais críticas.
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Desempenho Máximo</h3>
                    <p className="text-muted-foreground">
                      Acesso direto e exclusivo ao hardware físico, sem camadas de virtualização que consomem recursos.
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
                    <Settings2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Controle Total</h3>
                    <p className="text-muted-foreground">
                      Acesso root completo para instalar qualquer sistema operacional e personalizar o ambiente como desejar.
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
                    <h3 className="mb-2 text-xl font-semibold">Recursos Garantidos</h3>
                    <p className="text-muted-foreground">
                      Toda a CPU, RAM e armazenamento são exclusivamente seus, sem compartilhamento ou 'vizinhos barulhentos'.
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
                    Encontre respostas para as dúvidas mais comuns sobre nossos servidores Bare Metal.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Server className="m-auto size-4" /></div>
                        O que é um servidor Bare Metal?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Bare Metal é um servidor físico dedicado a um único cliente. Você tem acesso direto ao hardware, sem nenhuma camada de virtualização, garantindo desempenho máximo e controle total.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Clock className="m-auto size-4" /></div>
                        Qual é o tempo de ativação do servidor?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      A ativação de um servidor Bare Metal geralmente leva até 72 horas, dependendo da configuração e da disponibilidade do hardware. Nossa equipe trabalha para provisionar seu servidor o mais rápido possível.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                       <div className="flex items-center gap-3">
                        <div className="flex size-6"><Wrench className="m-auto size-4" /></div>
                         Eu tenho acesso root ao servidor?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                     Sim, você terá acesso root completo (ou de Administrador, no caso de Windows Server). Isso lhe dá total liberdade para instalar o sistema operacional de sua escolha, softwares e configurar o ambiente de acordo com suas necessidades.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><TrendingUp className="m-auto size-4" /></div>
                        É possível fazer upgrade de hardware?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, upgrades de componentes como RAM e armazenamento são possíveis. Entre em contato com nosso suporte para discutir as opções disponíveis para o seu plano e agendar a atualização.
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
}
