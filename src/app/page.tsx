
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Clock, ShieldCheck, Zap, Sparkles, Settings2, Headphones, Clock9, Check, Package, FolderSearch, HardDrive, Laptop, Rocket, Wifi, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative bg-background overflow-hidden py-24">
          <div className="container max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
            <div className="max-w-3xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Melhor qualidade apenas aqui
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Soluções em Hospedagem<br/>de última Geração
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Experimente desempenho, segurança, estabilidade e suporte incomparáveis em nossa plataforma de hospedagem de ponta.
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
                <a href="https://discord.gg/w4RhuhrBS2" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="cursor-pointer bg-gradient-primary hover:opacity-90 transition-all duration-200 text-white text-base px-6 py-3 rounded-xl shadow-lg h-auto"
                  >
                    Entre em contato
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden sm:block relative">
              <Image
                src="/images/v2.png"
                width="565"
                height="501"
                alt="Servidores de alta performance"
                className="pl-6 w-[500px] sm:w-[600px] lg:w-[660px] xl:w-[600px] drop-shadow-2xl"
                data-ai-hint="server rack"
              />
            </div>
          </div>
        </section>

        <section className="py-10 bg-background text-foreground"><div className="container mx-auto max-w-7xl px-6"><div className="text-center mb-16"><h2 className="text-4xl font-bold lg:text-5xl">Benefícios de um serviço de qualidade</h2><p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Descubra como oferecemos estabilidade, segurança e suporte incomparável para o seu projeto.</p></div><div className="grid gap-16 lg:grid-cols-3"><div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border"><div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><ShieldCheck className="w-6 h-6" /></div><div><h3 className="mb-2 text-xl font-semibold">Segurança</h3><p className="text-muted-foreground">Proteção com Cloudflare 100% Inline, firewall premium e DNS de alta performance para conexões seguras e rápidas.</p></div></div></div><div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border"><div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><Clock9 className="w-6 h-6" /></div><div><h3 className="mb-2 text-xl font-semibold">Uptime 99,7%</h3><p className="text-muted-foreground">Garantimos 99,7% de uptime, mantendo seus jogos e aplicações sempre online e sem interrupções.</p></div></div></div><div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card p-6 rounded-2xl border border-border"><div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><Headphones className="w-6 h-6" /></div><div><h3 className="mb-2 text-xl font-semibold">Suporte rápido</h3><p className="text-muted-foreground">Suporte ágil e eficiente, pronto para ajudar você a qualquer hora, com atendimento rápido e amigável.</p></div></div></div></div></div></section>

        <section className="py-16 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-32"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="relative">
                  <Image 
                    src="/images/v1.png" 
                    alt="Servidores de Alta Performance" 
                    width={600}
                    height={400}
                    className="hidden sm:block rounded-xl"
                  />
                  <div className="absolute -z-10 -bottom-10 -right-20 w-64 h-64 bg-background rounded-full blur-2xl"></div>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm">
                  Infraestrutura premium
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Servidores de Alta Performance</h2>
                <p className="text-muted-foreground mb-6">Nossa infraestrutura é construída com hardware de última geração, garantindo velocidade e estabilidade para seus jogos e aplicações</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1 rounded">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Data center tier III</h3>
                      <p className="text-sm text-muted-foreground">Estamos localizados no Data Center Ascenty, em Osasco - SP</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1 rounded">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Proteção anti-ddos Cloudflare</h3>
                      <p className="text-sm text-muted-foreground">Contamos com a proteção DDos Cloudflare Magic Transit 100% Inline</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1 rounded">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Uptime</h3>
                      <p className="text-sm text-muted-foreground">Serviços estáveis e com hardware de última geração</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1 rounded">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Flexibilidade</h3>
                      <p className="text-sm text-muted-foreground">Diversos processadores para todo tipo de aplicação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h1 className="text-center text-4xl font-semibold lg:text-5xl">Alguns dos nossos serviços</h1>
              <p className="text-muted-foreground">Explore opções criadas para atender diferentes necessidades — desde iniciantes até grandes projetos. Nossos planos oferecem desempenho, segurança e suporte de qualidade para impulsionar o sucesso do seu servidor.</p>
            </div>
            <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
              
              <Card className="flex flex-col gap-6 rounded-xl p-4 md:p-6 transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-medium">BARE METAL</CardTitle>
                  <span className="my-3 block text-2xl font-semibold">A partir de R$ 1479.99</span>
                  <CardDescription>Performance extrema para ambientes sensíveis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator className="border-dashed" />
                  <ul className="list-outside space-y-3 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Processadores variados</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Até 256 GB de RAM</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />IP Dedicado</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />AntiDDoS in-line</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Hardware próprio</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full cursor-pointer" variant="outline">
                    <Link href="/baremetal">Começar com este plano</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col gap-6 rounded-xl p-4 md:p-6 transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-medium">SERVIDORES VPS</CardTitle>
                  <span className="my-3 block text-2xl font-semibold">A partir de R$ 29.99</span>
                  <CardDescription>Flexibilidade e disponibilidade superiores.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator className="border-dashed" />
                  <ul className="list-outside space-y-3 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Processadores variados</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Até 128 GB de RAM</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />IP Dedicado</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />AntiDDoS in-line</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Hardware próprio</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                   <Button asChild className="w-full cursor-pointer" variant="outline">
                    <Link href="/vps">Começar com este plano</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col gap-6 rounded-xl p-4 md:p-6 transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-medium">HOSPEDAGEM MINECRAFT</CardTitle>
                  <span className="my-3 block text-2xl font-semibold">A partir de R$ 23.99</span>
                  <CardDescription>Hospedagem compartilhada de alta performance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator className="border-dashed" />
                  <ul className="list-outside space-y-3 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Processadores variados</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Até 64 GB de RAM</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Suporte a mods e plugins</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />AntiDDoS in-line</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Hardware próprio</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                   <Button asChild className="w-full cursor-pointer" variant="outline">
                    <Link href="/minecraft">Começar com este plano</Link>
                  </Button>
                </CardFooter>
              </Card>
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
                        <div className="flex size-6"><Package className="m-auto size-4" /></div>
                        O que é uma hospedagem de jogos?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Hospedagem de jogos é um serviço que permite que jogadores aluguem servidores para hospedar jogos multiplayer online. Isso garante que o jogo esteja sempre disponível para outros jogadores se conectarem e jogarem juntos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><ShieldCheck className="m-auto size-4" /></div>
                        Meu servidor é protegido contra ataques DDoS?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Sim, todos os nossos servidores incluem proteção avançada contra ataques DDoS para garantir que seu jogo permaneça online e estável, mesmo sob ataque.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                       <div className="flex items-center gap-3">
                        <div className="flex size-6"><FolderSearch className="m-auto size-4" /></div>
                        Qual a diferença entre VPS, Dedicado e Hospedagem de Jogos?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Hospedagem de jogos é otimizada para jogos específicos. VPS oferece um ambiente virtualizado com mais flexibilidade. Servidores dedicados oferecem recursos de hardware exclusivos para máxima performance.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><HardDrive className="m-auto size-4" /></div>
                        Em quanto tempo meu servidor fica online?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Nossos servidores são provisionados instantaneamente após a confirmação do pagamento, então seu servidor estará online em questão de minutos.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-5" className="bg-background shadow-xs rounded-lg border px-4">
                    <AccordionTrigger className="text-base py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6"><Laptop className="m-auto size-4" /></div>
                        Preciso de conhecimento técnico para contratar um servidor?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      Não! Oferecemos painéis de controle fáceis de usar e suporte dedicado para ajudá-lo a configurar e gerenciar seu servidor, mesmo que você não tenha experiência técnica.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gradient-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, hsl(var(--primary) / 0.15) 25%, transparent 25%),
                    linear-gradient(-45deg, hsl(var(--primary) / 0.15) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, hsl(var(--ring) / 0.15) 75%),
                    linear-gradient(-45deg, transparent 75%, hsl(var(--ring) / 0.15) 75%)
                  `,
                  backgroundSize: '64px 64px',
                  animation: 'move 4s linear infinite'
                }}
              ></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Fale com a nossa equipe</h2>
              <p className="mb-8 text-primary-foreground/80 text-lg">Está com dúvidas ou precisa de ajuda? Nossa equipe está pronta para te atender.</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="https://discord.gg/w4RhuhrBS2" target="_blank" rel="noopener noreferrer">
                  Entrar em contato
                </a>
              </Button>
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
