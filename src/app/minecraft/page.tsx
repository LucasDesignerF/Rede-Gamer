
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Sparkles, Settings2, MapPin, Cpu, Server, Gauge, MemoryStick, HardDrive, BadgeDollarSign, CircleX, ArrowRight, CheckCircle, Check, Rocket, Wifi, Lock, Package, Wrench, DatabaseBackup, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { createCheckoutLink } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";


const processors = [
  { id: 'ryzen9-9950x', name: 'Ryzen 9 9950X', available: false },
  { id: 'ryzen9-7950x', name: 'Ryzen 9 7950X', available: false },
  { id: 'ryzen9-5950x', name: 'Ryzen 9 5950X', available: false },
  { id: 'ryzen7-5700x', name: 'Ryzen 7 5700X', available: true },
];

const ramPlans = [
    { id: '4gb', ram: 4, vcpu: 3, clock: 5.8, storage: 30, price: 23.99, recommended: false, additionalServers: 0, paymenterProductId: 10 },
    { id: '6gb', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommended: true, additionalServers: 1, paymenterProductId: 11 },
    { id: '8gb', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommended: true, additionalServers: 1, paymenterProductId: 12 },
    { id: '10gb', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommended: true, additionalServers: 2, paymenterProductId: 13 },
    { id: '12gb', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommended: true, additionalServers: 2, paymenterProductId: 14 },
    { id: '14gb', ram: 14, vcpu: 8, clock: 5.8, storage: 105, price: 83.99, recommended: true, additionalServers: 3, paymenterProductId: 15 },
    { id: '16gb', ram: 16, vcpu: 9, clock: 5.8, storage: 120, price: 95.99, recommended: true, additionalServers: 3, paymenterProductId: 16 },
    { id: '20gb', ram: 20, vcpu: 12, clock: 5.8, storage: 150, price: 119.99, recommended: true, additionalServers: 4, paymenterProductId: 17 },
    { id: '24gb', ram: 24, vcpu: 14, clock: 5.8, storage: 180, price: 143.99, recommended: true, additionalServers: 5, paymenterProductId: 18 },
    { id: '32gb', ram: 32, vcpu: 16, clock: 5.8, storage: 240, price: 191.99, recommended: true, additionalServers: 6, paymenterProductId: 19 },
    { id: '48gb', ram: 48, vcpu: 20, clock: 5.8, storage: 360, price: 287.99, recommended: true, additionalServers: 8, paymenterProductId: 20 },
    { id: '64gb', ram: 64, vcpu: 24, clock: 5.8, storage: 480, price: 383.99, recommended: true, additionalServers: 10, paymenterProductId: 21 },
];

const sampleLogs = [
  '[INFO] Cluster sincronizado com datacenter US-EAST-1',
  '[INFO] Backup automático concluído',
  '[INFO] Load balancer operacional - latência média: 23ms',
  '[INFO] Ram disponível: 23.5 GB',
  '[MONITOR] Todas as portas monitoradas estão ativas',
  '[INFO] CPU usage estável - 48%',
  '[INFO] 3 novos jogadores conectados',
  '[SECURITY] Tentativa de acesso não autorizada bloqueada',
  '[INFO] Plugins atualizados com sucesso',
  '[INFO] Verificação de segurança concluída',
  '[AVISO] Pico de uso detectado',
];

export default function MinecraftPage() {
  const [selectedProcessor, setSelectedProcessor] = useState(processors.find(p => p.id === 'ryzen7-5700x') || processors.find(p => p.available) || processors[0]);
  const [selectedRamPlan, setSelectedRamPlan] = useState(ramPlans.find(p => p.id === '4gb') || ramPlans[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const [cpuUsage, setCpuUsage] = useState(11.9);
  const [memoryUsage, setMemoryUsage] = useState(1.6);
  const [logs, setLogs] = useState<string[]>([]);
  const consoleLogRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const cpuInterval = setInterval(() => {
      setCpuUsage(Math.random() * (25 - 5) + 5);
    }, 2000);

    const memoryInterval = setInterval(() => {
      setMemoryUsage(Math.random() * (3.5 - 1) + 1);
    }, 2500);

    const logInterval = setInterval(() => {
      setLogs(prevLogs => {
        const newLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        const newLogs = [...prevLogs, newLog];
        if (newLogs.length > 50) {
          return newLogs.slice(newLogs.length - 50);
        }
        return newLogs;
      });
    }, 1500);

    return () => {
      clearInterval(cpuInterval);
      clearInterval(memoryInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (consoleLogRef.current) {
      consoleLogRef.current.scrollTop = consoleLogRef.current.scrollHeight;
    }
  }, [logs]);


  const handleProcessorSelect = (processor) => {
    if (processor.available) {
      setSelectedProcessor(processor);
    }
  };

  const handleRamSelect = (plan) => {
    setSelectedRamPlan(plan);
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    const result = await createCheckoutLink(selectedRamPlan.paymenterProductId);
    
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
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full pt-20 md:pt-24 lg:pt-32 pb-0">
            <div className="container max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
              <div className="max-w-3xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  Melhor qualidade apenas aqui
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                  Hospedagem de Minecraft<br />a partir de <span className="text-gradient">R$23,99/mês</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                  Configure seu servidor em segundos e jogue com seus amigos. Hardware de ponta e proteção Anti-DDoS inclusa.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 text-base">
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
                    99.7% Uptime
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="cursor-pointer bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto"
                  >
                    Criar Servidor Agora
                  </Button>
                </div>
              </div>
              <div className="hidden sm:block relative">
                <Image
                  src="/images/allay.webp"
                  width="565"
                  height="501"
                  alt="Hospedagem Minecraft"
                  className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 text-sm flex items-center gap-3 border border-muted">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-medium text-muted-foreground">40+ servidores online</span>
                </div>
              </div>
            </div>
        </section>

        <section id="planos" className="pt-0">
          <div className="w-full">
            <div className="container max-w-3xl mx-auto px-4 pt-0 text-center">
                <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mt-10 mb-16">ADQUIRA AGORA SUA HOSPEDAGEM</h1>
            </div>
            <div className="container max-w-7xl mx-auto px-4 pb-16">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-10">
                      <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Localização do Servidor</h2>
                          <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="cursor-pointer flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition border shadow-sm border-primary bg-muted">
                              <MapPin className="w-4 h-4" />Brasil
                            </Button>
                          </div>
                        </div>
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha o Processador</h2>
                          <div className="flex flex-wrap gap-4">
                            {processors.map((proc) => (
                              <Button
                                key={proc.id}
                                variant="outline"
                                onClick={() => handleProcessorSelect(proc)}
                                disabled={!proc.available}
                                className={cn(
                                  "px-5 py-2.5 rounded-xl cursor-pointer text-sm font-semibold transition border flex items-center gap-2",
                                  selectedProcessor.id === proc.id
                                    ? "border-primary bg-muted"
                                    : "text-zinc-700 dark:text-zinc-300 border-zinc-300 bg-white dark:bg-zinc-800 hover:border-primary/50"
                                )}
                              >
                                <Cpu className="w-4 h-4" />{proc.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha a Memória RAM</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                            {ramPlans.map((plan) => (
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
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{plan.vcpu}vCPU [{plan.clock}GHz]</p>
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
                        <p className="flex items-center gap-2"><strong>Localização:</strong><Image alt="Brasil" width={20} height={16} className="w-5 h-4 rounded-sm" src="https://flagcdn.com/w40/br.png" /></p>
                        <hr className="my-3 border-zinc-200 dark:border-zinc-700" />
                        <p className="font-semibold text-2xl">Total Mensal:<span className="text-gradient font-bold ml-1">R${selectedRamPlan.price.toFixed(2).replace('.', ',')}</span></p>
                        <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>{selectedProcessor.name}</span></div>
                          <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" /><span>{selectedRamPlan.vcpu}vCPU [{selectedRamPlan.clock}GHz]</span></div>
                          <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedRamPlan.ram}GB RAM</span></div>
                          <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedRamPlan.storage}GB SSD NVME</span></div>
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-primary" />
                            <span>
                              {selectedRamPlan.additionalServers > 0
                                ? `Até +${selectedRamPlan.additionalServers} servidor${selectedRamPlan.additionalServers > 1 ? 'es' : ''} adicional${selectedRamPlan.additionalServers > 1 ? 's' : ''}`
                                : 'Sem servidores adicionais'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><span>Proteção Anti-DDoS MagicTransit</span></div>
                          <div className="flex items-center gap-2"><BadgeDollarSign className="w-4 h-4 text-primary" /><span>Porta padrão por R$20,00</span></div>
                          
                          {selectedRamPlan.recommended ? (
                            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600">Recomendado para novas versões</span></div>
                          ) : (
                            <div className="flex items-center gap-2"><CircleX className="w-4 h-4 text-red-500" /><span className="text-red-600">Não recomendado para novas versões</span></div>
                          )}
                        </div>
                      </div>
                       <Button 
                        onClick={handlePurchase} 
                        disabled={isProcessing}
                        className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center"
                      >
                        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Criar Servidor Agora'}
                        {!isProcessing && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Qual plano é ideal para você?</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">O tamanho ideal do servidor depende do tipo de uso. Confira nossas recomendações:</p>
            </div>
            <Tabs defaultValue="vanilla" className="w-full">
              <TabsList className="inline-grid min-w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 mb-10 bg-muted rounded-lg p-1 shadow-inner h-auto">
                <TabsTrigger value="vanilla" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Vanilla</TabsTrigger>
                <TabsTrigger value="spigot" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Spigot/Paper</TabsTrigger>
                <TabsTrigger value="forge" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Forge</TabsTrigger>
                <TabsTrigger value="fabric" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Fabric</TabsTrigger>
                <TabsTrigger value="neoforge" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Neoforge</TabsTrigger>
                <TabsTrigger value="quilt" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Quilt</TabsTrigger>
                <TabsTrigger value="modpacks" className="py-3 px-4 text-sm font-semibold whitespace-nowrap rounded-lg transition-all duration-300 focus:outline-none data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg">Modpacks</TabsTrigger>
              </TabsList>
              <TabsContent value="vanilla">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Minecraft Vanilla</h3>
                    <p className="text-muted-foreground mb-8">Para servidores vanilla sem modificações, recomendamos:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 10 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mundo pequeno a médio</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">4GB RAM</span>
                        </div>
                        <Progress value={30} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">10-25 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mundo médio</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">10GB RAM</span>
                        </div>
                        <Progress value={60} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">25-40 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mundo grande</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB RAM</span>
                        </div>
                        <Progress value={90} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="spigot">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Spigot/Paper</h3>
                    <p className="text-muted-foreground mb-8">Para servidores com plugins, recomendamos:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 10 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Poucos plugins (ex: Essentials, LuckPerms)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">6GB RAM</span>
                        </div>
                        <Progress value={40} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">10-25 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Plugins moderados (ex: WorldEdit, Dynmap)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">12GB RAM</span>
                        </div>
                        <Progress value={65} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">25-50 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Muitos plugins e automações</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">20GB RAM</span>
                        </div>
                        <Progress value={90} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="forge">
                 <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Forge (Mods)</h3>
                    <p className="text-muted-foreground mb-8">Para servidores com mods individuais:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 5 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Poucos mods (5-10 mods leves)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">8GB RAM</span>
                        </div>
                         <Progress value={40} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">5-15 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods médios (10-25 mods)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">12GB RAM</span>
                        </div>
                        <Progress value={70} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">15-25 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods pesados (ex: Tech/Reactor mods)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB RAM</span>
                        </div>
                        <Progress value={95} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="fabric">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Fabric</h3>
                    <p className="text-muted-foreground mb-8">Para servidores Fabric, que são mais leves, recomendamos:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 15 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods de otimização (Sodium, etc)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">6GB RAM</span>
                        </div>
                        <Progress value={35} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">15-30 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods de conteúdo leve</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">10GB RAM</span>
                        </div>
                        <Progress value={60} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">30-50 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Vários mods de conteúdo</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB RAM</span>
                        </div>
                        <Progress value={85} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="neoforge">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Neoforge</h3>
                    <p className="text-muted-foreground mb-8">Para servidores Neoforge, com mods modernos:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 10 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods leves a médios</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">8GB RAM</span>
                        </div>
                         <Progress value={45} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">10-20 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Vários mods de conteúdo</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">12GB RAM</span>
                        </div>
                        <Progress value={70} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">20-35 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Modpacks ou mods pesados</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB RAM</span>
                        </div>
                        <Progress value={90} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="quilt">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Quilt</h3>
                    <p className="text-muted-foreground mb-8">Para servidores Quilt, focado em compatibilidade:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 15 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods de otimização e leves</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">6GB RAM</span>
                        </div>
                        <Progress value={40} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">15-30 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Mods de conteúdo e Fabric mods</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">10GB RAM</span>
                        </div>
                        <Progress value={65} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">30+ jogadores</h4>
                            <p className="text-sm text-muted-foreground">Grandes comunidades com muitos mods</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB+ RAM</span>
                        </div>
                        <Progress value={90} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="modpacks">
                <div className="rounded-xl bg-card shadow-lg border overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Modpacks</h3>
                    <p className="text-muted-foreground mb-8">Para modpacks grandes e populares:</p>
                    <div className="space-y-6">
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Até 5 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Modpacks leves (ex: FTB Lite, Better Minecraft Light)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">8GB RAM</span>
                        </div>
                        <Progress value={50} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">5-15 jogadores</h4>
                            <p className="text-sm text-muted-foreground">Modpacks médios (ex: All The Mods 6, RLCraft)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">12GB RAM</span>
                        </div>
                        <Progress value={75} className="h-2.5" />
                      </div>
                      <div className="group rounded-lg border p-5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">15+ jogadores</h4>
                            <p className="text-sm text-muted-foreground">Modpacks pesados (ex: All The Mods 10)</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors">16GB+ RAM</span>
                        </div>
                        <Progress value={100} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(4,93,117,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl font-bold mb-4">Gerencie seus serviços com facilidade</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Nosso painel de controle intuitivo permite que você gerencie todos os seus serviços em um só lugar, com facilidade e eficiência.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start px-4">
            <div className="space-y-6 order-2 lg:order-1">
              {[
                { title: 'Instalação de plugins e mods no painel', description: 'Instale seus plugins/mods com apenas 1 clique.' },
                { title: 'Instalação de modpacks', description: 'Instale modpacks com 1 clique e sem sair do nosso painel.' },
                { title: 'Divisor de servidores', description: 'Divida seu servidor em mais de um e edite-o do jeito que quiser.' },
                { title: 'Backups automáticos de arquivos e database', description: 'Todos os seus dados seguros e disponíveis a todo momento.' },
                { title: 'Recupere seus arquivos deletados', description: 'Sistema de lixeira para recuperação de arquivos deletados.' },
                { title: 'Vários subdomínios disponíveis', description: 'Contamos com vários subdomínios para seu servidor.' },
                { title: 'Migração simplificada', description: 'Nosso painel conta com um complemento de importação de arquivos e banco de dados, facilitando sua migração para nós.' },
              ].map((feature, index) => (
                <div key={index} className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <Check className="h-5 w-5 text-primary mt-1" />
                  <div className="ml-3">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-card rounded-lg shadow-lg border overflow-hidden dark:bg-dark-800 dark:border-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between p-3 border-b dark:bg-dark-800 dark:border-gray-700">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium">Painel de Controle</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Status:</span>
                    <span className="inline-flex items-center text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm mb-2">CPU</div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700">
                        <div className="h-2 bg-green-500 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${cpuUsage.toFixed(2)}%` }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">{cpuUsage.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm mb-2">Memória</div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700">
                        <div className="h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${(memoryUsage / 4) * 100}%` }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">{memoryUsage.toFixed(1)}GB / 4GB</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm mb-2">Disco</div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700">
                      <div className="h-2 bg-primary rounded-full transition-all duration-1000 ease-in-out" style={{ width: '30%' }}></div>
                    </div>
                    <div className="text-right text-sm mt-1">15.0GB / 50GB</div>
                  </div>
                  <div className="bg-black rounded-md p-4 font-mono text-xs text-green-400 h-80 flex flex-col">
                    <div ref={consoleLogRef} className="flex-1 overflow-auto space-y-1 mb-2">
                       {logs.map((log, index) => {
                          const isWarning = log.includes('[AVISO]');
                          const isSecurity = log.includes('[SECURITY]');
                          const logClass = isWarning ? 'text-yellow-400' : isSecurity ? 'text-red-500' : 'text-green-400';
                          return <p key={index} className={logClass}>{log}</p>
                       })}
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input className="w-full px-2 py-1 rounded bg-zinc-900 text-white text-xs outline-none" placeholder="Digite um comando, exemplo: /say Olá mundo" type="text" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-background text-foreground">
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
                  <h2 className="mt-4 text-5xl font-bold">Perguntas Frequentes sobre Hospedagem Minecraft</h2>
                  <p className="text-muted-foreground mt-4">Encontre respostas para as dúvidas mais comuns sobre nossos serviços de Servidores Dedicados.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Package className="m-auto size-4" /></div>
                        <span className="text-base">Qual é o tempo de ativação do servidor após a compra?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      A ativação do servidor é instantânea após a confirmação do pagamento. Você receberá os dados de acesso por e-mail em poucos minutos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Clock className="m-auto size-4" /></div>
                        <span className="text-base">Como funciona o processo de instalação de plugins e mods?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Oferecemos um painel de controle intuitivo com um instalador de 1 clique para a maioria dos plugins e mods populares. Você também pode enviá-los manualmente via FTP.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Wrench className="m-auto size-4" /></div>
                        <span className="text-base">Como funciona o processo de instalação de modpack?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nosso painel permite a instalação automática de centenas de modpacks (como All The Mods, RLCraft, etc.) com apenas um clique, sem necessidade de configuração manual.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><DatabaseBackup className="m-auto size-4" /></div>
                        <span className="text-base">Como funciona o sistema de backups?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Realizamos backups automáticos diariamente para garantir a segurança dos seus dados. Você pode restaurar um backup a qualquer momento através do nosso painel de controle.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><TrendingUp className="m-auto size-4" /></div>
                        <span className="text-base">É possível fazer upgrade do plano?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, você pode fazer o upgrade (ou downgrade) do seu plano a qualquer momento diretamente pela área do cliente, pagando apenas a diferença.
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
    </>
  );
}
