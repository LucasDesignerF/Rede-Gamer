
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Sparkles, Settings2, MapPin, Cpu, Server, Gauge, MemoryStick, HardDrive, Package, ArrowRight, CheckCircle, Rocket, Wifi, Lock, Wrench, DatabaseBackup, TrendingUp, Group } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type ModLoader = 'Forge' | 'Fabric' | 'NeoForge';

type ModpackPlan = {
  id: string;
  name: string;
  ram: number;
  vcpu: number;
  clock: number;
  storage: number;
  price: number;
  recommendedPlayers: string;
  imageUrl: string;
  loader: ModLoader;
};

const allModpackPlans: ModpackPlan[] = [
  { id: 'all-magic-arcana', name: 'All the Magic - Arcana', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Magic - Arcana.png', loader: 'Forge' },
  { id: 'atms', name: 'All the Magic Spellbound', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Magic Spellbound - ATMS.png', loader: 'Forge' },
  { id: 'allthesky', name: 'All The Sky', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All The Sky.png', loader: 'Forge' },
  { id: 'atm-gravitas', name: 'All the Mods - Gravitas', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods - Gravitas - ATMG.png', loader: 'Forge' },
  { id: 'atm-gravitas2', name: 'All The Mods - Gravitas²', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All The Mods - Gravitas².png', loader: 'Forge' },
  { id: 'atmslop', name: 'All the Mods - Slice of Pi', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods - Slice of Pi - ATM SLOP.jpeg', loader: 'Forge' },
  { id: 'atmslop2', name: 'All the Mods - ATM6 Lite', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods - Slice of Pi2 - ATM SLOP2 - ATM6 Lite.jpeg', loader: 'Forge' },
  { id: 'atm-vb', name: 'All the Mods: Volcano Block - ATMVB', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods: Volcano Block ATMVB.png', loader: 'NeoForge' },
  { id: 'atm-magic', name: 'All the Mods: All the Magic', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods: All the Magic - ATM.jpeg', loader: 'Forge' },
  { id: 'atm0', name: 'All the Mods 0 - ATM0', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods 0 - ATM0.jpeg', loader: 'Forge' },
  { id: 'atm1', name: 'All the Mods 1 - ATM1', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods - ATM1.png', loader: 'Forge' },
  { id: 'atm2', name: 'All the Mods 2 - ATM2', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 2 - ATM2.jpeg', loader: 'Forge' },
  { id: 'atm3', name: 'All the Mods 3 - ATM3', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 3 - ATM3.png', loader: 'Forge' },
  { id: 'atm3e', name: 'All the Mods 3 Expert', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods 3 Expert - ATM3E.jpeg', loader: 'Forge' },
  { id: 'atm3l', name: 'All the Mods 3: Lite', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods 3: Lite - ATM3L.png', loader: 'Forge' },
  { id: 'atm3r', name: 'All the Mods 3 - Remix', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 3 - Remix - ATM3R.png', loader: 'Forge' },
  { id: 'atm4', name: 'All the Mods 4 - ATM4', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 4 - ATM4.jpeg', loader: 'Forge' },
  { id: 'atm5', name: 'All the Mods 5 - ATM5', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 5 - ATM5.jpeg', loader: 'Forge' },
  { id: 'atm6', name: 'All the Mods 6 - ATM6', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 6 - ATM6.gif', loader: 'Forge' },
  { id: 'atm6sky', name: 'All the Mods 6 - Skyblock', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 6 - To the Sky - ATM6sky.png', loader: 'Forge' },
  { id: 'atm7', name: 'All the Mods 7 - ATM7', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 7 - ATM7.jpeg', loader: 'Forge' },
  { id: 'atm7sky', name: 'All the Mods 7 - To the Sky', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 7 - To the Sky .png', loader: 'Forge' },
  { id: 'atm7l', name: 'All the Mods 7 Lite', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods 7 Lite - Spark - ATM7L.png', loader: 'Forge' },
  { id: 'atm8', name: 'All the Mods 8 - ATM8', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 8 - ATM8.png', loader: 'Forge' },
  { id: 'atm9', name: 'All the Mods 9 - ATM9', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 9 - ATM9.png', loader: 'NeoForge' },
  { id: 'atm9-no-frills', name: 'All the Mods 9 - No Frills', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 9 - No Frills.png', loader: 'NeoForge' },
  { id: 'atm9-sky', name: 'All the Mods 9 - To the Sky', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods 9 - To the Sky.png', loader: 'NeoForge' },
  { id: 'atm1e', name: 'All the Mods Expert - ATM1E', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods Expert - ATM1E.png', loader: 'Forge' },
  { id: 'atm-expert-remastered', name: 'All The Mods Expert: Remastered', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-10', imageUrl: '/images/All The Mods Expert: Remastered - ATM.png', loader: 'Forge' },
  { id: 'atmf', name: 'All the Mods Fabric', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/All the Mods Fabric - ATMF.png', loader: 'Fabric' },
  { id: 'atm1l', name: 'All the Mods Lite - ATM1L', ram: 4, vcpu: 3, clock: 5.8, storage: 30, price: 23.99, recommendedPlayers: '5-10', imageUrl: '/images/All the Mods Lite - ATM1L.jpeg', loader: 'Forge' },
  { id: 'atm10', name: 'All the Mods 10 - ATM10', ram: 14, vcpu: 8, clock: 5.8, storage: 105, price: 83.99, recommendedPlayers: '5-20', imageUrl: '/images/All the Mods 10 - ATM10.png', loader: 'Forge' },
  { id: 'better-mc-fabric-bmc2', name: 'Better MC [FABRIC] - BMC2', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/Better MC [FABRIC] - BMC2.webp', loader: 'Fabric' },
  { id: 'better-mc-fabric-bmc3', name: 'Better MC [FABRIC] - BMC3', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/Better MC [FABRIC] - BMC3.webp', loader: 'Fabric' },
  { id: 'better-mc-forge', name: 'Better MC [FORGE] - BMC4', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-15', imageUrl: '/images/Better MC [FORGE] - BMC4.webp', loader: 'Forge' },
  { id: 'better-mc-neoforge-bmc5', name: 'Better MC [NEOFORGE] BMC5', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommendedPlayers: '5-15', imageUrl: '/images/Better MC [NEOFORGE] BMC5.jpeg', loader: 'NeoForge' },
  { id: 'better-mc-skyblock', name: 'Better MC Skyblock [BMCS]', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/Better MC Skyblock [BMCS].jpeg', loader: 'Forge' },
  { id: 'cobblemon-fabric', name: 'Cobblemon [FABRIC]', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '10-25', imageUrl: '/images/Cobblemon.webp', loader: 'Fabric' },
  { id: 'cobblemon-neoforge', name: 'Cobblemon [NEOFORGE]', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '10-25', imageUrl: '/images/Cobblemon.webp', loader: 'NeoForge' },
  { id: 'dawncraft', name: 'DawnCraft', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-10', imageUrl: '/images/DawnCraft.webp', loader: 'Forge' },
  { id: 'enigmatica9', name: 'Enigmatica 9', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommendedPlayers: '5-15', imageUrl: '/images/Enigmatica 9.jpeg', loader: 'Forge' },
  { id: 'fabulously-optimized', name: 'Fabulously Optimized', ram: 6, vcpu: 4, clock: 5.8, storage: 45, price: 35.99, recommendedPlayers: '10-30', imageUrl: '/images/Fabulously Optimized.webp', loader: 'Fabric' },
  { id: 'mto', name: 'Maul The Odds - MTO', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/Maul The Odds - MTO.png', loader: 'Forge' },
  { id: 'pixelmon', name: 'Pixelmon', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '10-20', imageUrl: '/images/Pixelmon.png', loader: 'Forge' },
  { id: 'prominence2', name: 'Prominence II RPG', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/Prominence II RPG.webp', loader: 'Fabric' },
  { id: 'rlcraft', name: 'RLCraft', ram: 8, vcpu: 5, clock: 5.8, storage: 60, price: 47.99, recommendedPlayers: '5-10', imageUrl: '/images/RLCraft.png', loader: 'Forge' },
  { id: 'technode', name: 'Technodefirmacraft', ram: 12, vcpu: 7, clock: 5.8, storage: 90, price: 71.99, recommendedPlayers: '5-15', imageUrl: '/images/Technodefirmacraft.png', loader: 'NeoForge' },
  { id: 'vault-hunters-3rd', name: 'Vault Hunters Official Modpack (Third Edition)', ram: 10, vcpu: 6, clock: 5.8, storage: 75, price: 59.99, recommendedPlayers: '5-15', imageUrl: '/images/Vault Hunters.png', loader: 'Forge' },
].sort((a, b) => a.name.localeCompare(b.name));


const processors = [
  { id: 'ryzen7-5700x', name: 'Ryzen 7 5700X', available: true },
];

const sampleLogs = [
  '[INFO] Carregando modpack...',
  '[INFO] Sincronizando com o datacenter US-EAST-1',
  '[INFO] Backup automático concluído',
  '[INFO] Load balancer operacional - latência média: 23ms',
  '[MONITOR] Todas as portas monitoradas estão ativas',
  '[INFO] CPU usage estável - 55%',
  '[INFO] 5 novos jogadores conectados',
  '[SECURITY] Tentativa de acesso não autorizada bloqueada',
  '[INFO] Verificação de segurança concluída',
  '[AVISO] Pico de uso de RAM detectado',
];

export default function ModpacksPage() {
  const [selectedProcessor] = useState(processors[0]);
  const [selectedLoader, setSelectedLoader] = useState<ModLoader>('Forge');
  
  const [filteredModpacks, setFilteredModpacks] = useState<ModpackPlan[]>([]);
  const [selectedModpackPlan, setSelectedModpackPlan] = useState<ModpackPlan | null>(null);

  const [cpuUsage, setCpuUsage] = useState(15.2);
  const [memoryUsage, setMemoryUsage] = useState(2.8);
  const [logs, setLogs] = useState<string[]>([]);
  const consoleLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newFiltered = allModpackPlans.filter(p => p.loader === selectedLoader);
    setFilteredModpacks(newFiltered);
    if (newFiltered.length > 0) {
      setSelectedModpackPlan(newFiltered[0]);
    } else {
      setSelectedModpackPlan(null);
    }
  }, [selectedLoader]);

  useEffect(() => {
    if (!selectedModpackPlan) return;

    const cpuInterval = setInterval(() => {
      setCpuUsage(Math.random() * (45 - 15) + 15);
    }, 2000);

    const memoryInterval = setInterval(() => {
      setMemoryUsage(Math.random() * (selectedModpackPlan.ram * 0.8 - selectedModpackPlan.ram * 0.2) + selectedModpackPlan.ram * 0.2);
    }, 2500);
    
    const logInterval = setInterval(() => {
      setLogs(prevLogs => {
        const newLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)].replace('modpack...', `modpack ${selectedModpackPlan.name}...`);
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
  }, [selectedModpackPlan]);

  useEffect(() => {
    if (consoleLogRef.current) {
      consoleLogRef.current.scrollTop = consoleLogRef.current.scrollHeight;
    }
  }, [logs]);

  const handleModpackSelect = (plan: ModpackPlan) => {
    setSelectedModpackPlan(plan);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full pt-20 md:pt-24 lg:pt-32 pb-0">
            <div className="container max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
              <div className="max-w-3xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                  <Package className="w-4 h-4" />
                  Instalação com 1 Clique
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                  Hospedagem de Modpacks<br /> <span className="text-gradient">de Alta Performance</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                  Servidores otimizados para os modpacks mais populares. Comece a jogar em minutos com nosso hardware de ponta e proteção Anti-DDoS.
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
                  <a href="#planos">
                    <Button
                      size="lg"
                      className="cursor-pointer bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto"
                    >
                      Ver Planos
                    </Button>
                  </a>
                </div>
              </div>
              <div className="hidden sm:block relative">
                <Image
                  src="/images/minecraft-steve.webp"
                  width="565"
                  height="501"
                  alt="Hospedagem de Modpacks Minecraft com Steve"
                  className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 text-sm flex items-center gap-3 border border-muted">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-medium text-muted-foreground">40+ servidores online</span>
                </div>
              </div>
            </div>
        </section>

        <section id="planos" className="pt-20">
            <div className="container max-w-3xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mb-16">ESCOLHA SEU MODPACK</h1>
            </div>
            <div className="container max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-10">
                      <Card className="rounded-3xl shadow-2xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-700 transition-all">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha o Mod Loader</h2>
                            <div className="flex flex-wrap gap-4">
                                {(['Forge', 'Fabric', 'NeoForge'] as ModLoader[]).map((loader) => (
                                <Button
                                    key={loader}
                                    variant="outline"
                                    onClick={() => setSelectedLoader(loader)}
                                    className={cn(
                                    "px-5 py-2.5 rounded-xl cursor-pointer text-sm font-semibold transition border flex items-center gap-2",
                                    selectedLoader === loader
                                        ? "border-primary bg-muted"
                                        : "text-zinc-700 dark:text-zinc-300 border-zinc-300 bg-white dark:bg-zinc-800 hover:border-primary/50"
                                    )}
                                >
                                    <Package className="w-4 h-4" />{loader}
                                </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Escolha o Modpack</h2>
                          {filteredModpacks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                              {filteredModpacks.map((plan) => (
                                <div
                                  id={plan.id}
                                  key={plan.id}
                                  onClick={() => handleModpackSelect(plan)}
                                  className={cn(
                                    "relative group cursor-pointer border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg",
                                    selectedModpackPlan?.id === plan.id
                                      ? "border-primary bg-muted ring-2 ring-primary"
                                      : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50"
                                  )}
                                >
                                  <Image src={plan.imageUrl} alt={plan.name} width={64} height={64} className="mx-auto rounded-md mb-4" data-ai-hint="game logo" />
                                  <p className="font-bold text-base md:text-lg text-zinc-800 dark:text-white">{plan.name}</p>
                                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{plan.recommendedPlayers} jogadores</p>
                                  <p className="text-sm font-semibold mt-2 text-zinc-800 dark:text-white">R${plan.price.toFixed(2).replace('.', ',')}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">Nenhum modpack encontrado para este loader.</p>
                          )}
                        </div>
                      </Card>
                    </div>
                    
                    {selectedModpackPlan && (
                      <div className="bg-card rounded-3xl h-fit p-6 md:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700 transition-all sticky top-24">
                        <h3 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Resumo do Plano</h3>
                        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
                          <div className="flex items-center gap-3">
                              <Image src={selectedModpackPlan.imageUrl} alt={selectedModpackPlan.name} width={40} height={40} className="rounded-md" data-ai-hint="game logo" />
                              <div>
                                  <h4 className="font-bold text-lg">{selectedModpackPlan.name}</h4>
                                  <p className="flex items-center gap-2 text-xs text-muted-foreground"><strong>Localização:</strong><Image alt="Brasil" width={16} height={12} className="w-4 h-3 rounded-sm" src="https://flagcdn.com/w40/br.png" /></p>
                              </div>
                          </div>
                          <hr className="my-3 border-zinc-200 dark:border-zinc-700" />
                          <p className="font-semibold text-2xl">Total Mensal:<span className="text-gradient font-bold ml-1">R${selectedModpackPlan.price.toFixed(2).replace('.', ',')}</span></p>
                          <hr className="my-4 border-zinc-200 dark:border-zinc-700" />
                          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span>{selectedProcessor.name}</span></div>
                            <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" /><span>{selectedModpackPlan.vcpu}vCPU [{selectedModpackPlan.clock}GHz]</span></div>
                            <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /><span>{selectedModpackPlan.ram}GB RAM</span></div>
                            <div className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /><span>{selectedModpackPlan.storage}GB SSD NVME</span></div>
                            <div className="flex items-center gap-2"><Group className="w-4 h-4 text-primary" /><span>Até {selectedModpackPlan.recommendedPlayers} jogadores</span></div>
                            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><span>Proteção Anti-DDoS Inclusa</span></div>
                            <div className="flex items-center gap-2"><Package className="w-4 h-4 text-primary" /><span>Instalação com 1 Clique</span></div>
                          </div>
                        </div>
                        <a href="https://financeiro.redegamer.com.br/store/minecraft-br-ryzen-7-5700x/minecraft-5700x-br-01" target="_blank" rel="noopener noreferrer" className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition text-white bg-gradient-primary hover:opacity-90 cursor-pointer text-center">
                          Contratar Plano<ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                </div>
            </div>
        </section>

        <section className="container mx-auto max-w-7xl py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(4,93,117,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl font-bold mb-4">Gerencie seu Modpack com Facilidade</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Nosso painel de controle intuitivo permite que você instale e gerencie seu servidor de modpack sem complicações.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start px-4">
            <div className="space-y-6 order-2 lg:order-1">
              {[
                { title: 'Instalação de modpacks com 1 clique', description: 'Instale centenas de modpacks populares sem sair do nosso painel.' },
                { title: 'Atualizações automáticas', description: 'Mantenha seu modpack sempre atualizado com nossas ferramentas.' },
                { title: 'Gerenciador de Mundos', description: 'Crie, delete e gerencie múltiplos mundos para seu servidor.' },
                { title: 'Backups automáticos', description: 'Seus dados seguros e disponíveis a todo momento.' },
                { title: 'Acesso total aos arquivos via FTP', description: 'Tenha controle total sobre os arquivos do seu servidor.' },
                { title: 'Suporte a mods e plugins adicionais', description: 'Adicione ainda mais personalização ao seu modpack.' },
              ].map((feature, index) => (
                <div key={index} className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div className="ml-3">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedModpackPlan && (
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
                          <div className="h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${(memoryUsage / selectedModpackPlan.ram) * 100}%` }}></div>
                        </div>
                        <div className="text-right text-sm mt-1">{memoryUsage.toFixed(1)}GB / {selectedModpackPlan.ram}GB</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm mb-2">Disco</div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700">
                        <div className="h-2 bg-primary rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${(selectedModpackPlan.storage / 2) / selectedModpackPlan.storage * 100}%` }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">{(selectedModpackPlan.storage / 2).toFixed(1)}GB / {selectedModpackPlan.storage}GB</div>
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
            )}
          </div>
        </section>

        <section className="dark:bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-10 md:flex-row md:gap-16">
              <div className="md:w-1/3">
                <div className="sticky top-20">
                  <h2 className="mt-4 text-4xl md:text-5xl font-bold">Perguntas Frequentes sobre Modpacks</h2>
                  <p className="text-muted-foreground mt-4">Encontre respostas para as dúvidas mais comuns sobre nossos serviços de hospedagem de modpacks.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Package className="m-auto size-4" /></div>
                        <span className="text-base text-left">Como funciona o processo de instalação de modpack?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nosso painel permite a instalação automática de centenas de modpacks (como All The Mods, RLCraft, etc.) com apenas um clique, sem necessidade de configuração manual.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Clock className="m-auto size-4" /></div>
                        <span className="text-base text-left">Posso mudar de modpack depois de contratar?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim! Nosso painel permite que você troque de modpack a qualquer momento com poucos cliques. Recomendamos fazer um backup do seu mundo antes de trocar.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Wrench className="m-auto size-4" /></div>
                        <span className="text-base text-left">Posso adicionar ou remover mods de um modpack?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, você tem acesso total aos arquivos do servidor via FTP, o que permite adicionar ou remover mods conforme sua preferência. Lembre-se que isso pode afetar a estabilidade do modpack.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><DatabaseBackup className="m-auto size-4" /></div>
                        <span className="text-base text-left">Como funciona o sistema de backups?</span>
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
                        <span className="text-base text-left">O plano recomendado é suficiente?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nossos planos recomendados são baseados em testes e na documentação oficial dos modpacks para um número específico de jogadores. Se você planeja ter mais jogadores ou adicionar muitos mods extras, pode ser necessário um upgrade.
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
