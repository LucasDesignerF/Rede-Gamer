
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Server,
  Gamepad2,
  ChevronDown,
  Bot,
  Globe,
  Zap,
  Moon,
  Package,
  X,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [minecraftMenuOpen, setMinecraftMenuOpen] = useState(false);
  const [gameServersMenuOpen, setGameServersMenuOpen] = useState(false);
  const [serversMenuOpen, setServersMenuOpen] = useState(false);
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                <div className="flex w-full items-center justify-between gap-10 lg:w-auto">
                    <Link href="/" aria-label="home" className="flex items-center space-x-2">
                        <Image src="/images/RedeGamer.png" alt="Rede Gamer" width={64} height={64} />
                    </Link>
                    <button aria-label="Open Menu" className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                    <div className="hidden lg:flex items-center gap-6 relative z-10">
                        <Link className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-2 py-3 transition" href="/">Início</Link>
                        
                        <DropdownMenu open={minecraftMenuOpen} onOpenChange={setMinecraftMenuOpen}>
                          <DropdownMenuTrigger asChild>
                             <button onMouseEnter={() => setMinecraftMenuOpen(true)} onMouseLeave={() => setMinecraftMenuOpen(false)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-3 transition focus:outline-none">
                                Minecraft <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onMouseEnter={() => setMinecraftMenuOpen(true)} onMouseLeave={() => setMinecraftMenuOpen(false)} className="w-80">
                            <DropdownMenuItem asChild>
                              <Link href="/minecraft" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Gamepad2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Minecraft Vanilla</p>
                                  <p className="text-muted-foreground text-sm">Servidores para jogar com amigos, com ou sem plugins.</p>
                                </div>
                               </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/modpacks" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Minecraft Modpacks</p>
                                  <p className="text-muted-foreground text-sm">Instale os modpacks mais famosos com apenas 1 clique.</p>
                                </div>
                               </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu open={gameServersMenuOpen} onOpenChange={setGameServersMenuOpen}>
                           <DropdownMenuTrigger asChild>
                             <button onMouseEnter={() => setGameServersMenuOpen(true)} onMouseLeave={() => setGameServersMenuOpen(false)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-3 transition focus:outline-none">
                                Servidores de Jogos <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onMouseEnter={() => setGameServersMenuOpen(true)} onMouseLeave={() => setGameServersMenuOpen(false)} className="w-80">
                             <DropdownMenuItem asChild>
                               <Link href="/games" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Gamepad2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Hospedagem</p>
                                  <p className="text-muted-foreground text-sm">Hospede diversos jogos em um plano único e poderoso.</p>
                                </div>
                               </Link>
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <DropdownMenu open={serversMenuOpen} onOpenChange={setServersMenuOpen}>
                           <DropdownMenuTrigger asChild>
                             <button onMouseEnter={() => setServersMenuOpen(true)} onMouseLeave={() => setServersMenuOpen(false)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-3 transition focus:outline-none">
                                Servidores <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onMouseEnter={() => setServersMenuOpen(true)} onMouseLeave={() => setServersMenuOpen(false)} className="w-80">
                             <DropdownMenuItem asChild>
                               <Link href="/vps" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">VPS</p>
                                  <p className="text-muted-foreground text-sm">Servidores virtuais para projetos flexíveis.</p>
                                </div>
                               </Link>
                             </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                               <Link href="/baremetal" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Server className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Bare Metal</p>
                                  <p className="text-muted-foreground text-sm">Desempenho máximo com acesso total ao hardware físico.</p>
                                </div>
                               </Link>
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu open={appsMenuOpen} onOpenChange={setAppsMenuOpen}>
                           <DropdownMenuTrigger asChild>
                             <button onMouseEnter={() => setAppsMenuOpen(true)} onMouseLeave={() => setAppsMenuOpen(false)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-3 transition focus:outline-none">
                                Aplicações <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onMouseEnter={() => setAppsMenuOpen(true)} onMouseLeave={() => setAppsMenuOpen(false)} className="w-80">
                             <DropdownMenuItem asChild>
                               <Link href="/apps" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Bot className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Hospedagem de Bots</p>
                                  <p className="text-muted-foreground text-sm">Hospede suas aplicações com facilidade.</p>
                                </div>
                               </Link>
                             </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                               <Link href="/sites" className="flex gap-4 p-3">
                                <div className="bg-muted p-3 rounded-lg">
                                  <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-base">Sites</p>
                                  <p className="text-muted-foreground text-sm">Hospedagem com cPanel e gerenciador de arquivos.</p>
                                </div>
                               </Link>
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Link className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-3 transition" href="#">Suporte</Link>

                    </div>
                </div>
                <div className={cn("lg:hidden w-full absolute top-full left-0 bg-background border-b border-border/40 shadow-md", mobileMenuOpen ? 'block' : 'hidden')}>
                    <div className="p-6">
                        <ul className="space-y-6 text-base">
                            <li><Link onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-accent-foreground block duration-150" href="/">Início</Link></li>
                             <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-muted-foreground hover:text-accent-foreground duration-150">
                                  Minecraft <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 space-y-4 pl-4">
                                  <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/minecraft"><Gamepad2 className="w-4 h-4" />Minecraft Vanilla</Link>
                                  <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/modpacks"><Package className="w-4 h-4" />Minecraft Modpacks</Link>
                                </CollapsibleContent>
                              </Collapsible>
                             <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-muted-foreground hover:text-accent-foreground duration-150">
                                  Servidores de Jogos <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 space-y-4 pl-4">
                                  <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/games"><Gamepad2 className="w-4 h-4" />Hospedagem</Link>
                                </CollapsibleContent>
                              </Collapsible>
                             <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-muted-foreground hover:text-accent-foreground duration-150">
                                  Servidores <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 space-y-4 pl-4">
                                  <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/vps"><ShieldCheck className="w-4 h-4" />VPS</Link>
                                  <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/baremetal"><Server className="w-4 h-4" />Bare Metal</Link>
                                </CollapsibleContent>
                              </Collapsible>
                             <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-muted-foreground hover:text-accent-foreground duration-150">
                                  Aplicações <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 space-y-4 pl-4">
                                   <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/apps"><Bot className="w-4 h-4" />Hospedagem de Bots</Link>
                                   <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground block duration-150" href="/sites"><Globe className="w-4 h-4" />Sites</Link>
                                </CollapsibleContent>
                              </Collapsible>
                            <li><Link onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-accent-foreground block duration-150" href="#">Suporte</Link></li>
                        </ul>
                    </div>
                    <div className="flex w-full flex-col space-y-3 p-6 pt-0">
                        <Button asChild size="lg" className="w-full bg-gradient-primary hover:opacity-90">
                            <a href="https://financeiro.redegamer.com.br"><span>Área do Cliente</span></a>
                        </Button>
                    </div>
                </div>
                <div className={cn("hidden lg:flex items-center", mobileMenuOpen ? 'block' : 'hidden')} data-state={mobileMenuOpen ? 'active' : 'inactive'}>
                    <div className="flex items-center gap-3">
                        <Button asChild size="default" className="px-6 h-9 bg-gradient-primary hover:opacity-90">
                            <a href="https://financeiro.redegamer.com.br"><span>Área do Cliente</span></a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
