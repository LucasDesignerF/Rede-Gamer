
import { Header } from '@/components/header';
import { Footer } from '@/app/footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 py-24 md:py-32">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Termos de Serviço</h1>
          <div className="space-y-8 text-muted-foreground prose dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Visão Geral</h2>
              <p>
                Estes Termos de Serviço ("Termos") regem o seu acesso e uso dos serviços de hospedagem
                fornecidos pela Rede Gamer ("nós", "nosso"). Ao contratar ou usar nossos serviços, você concorda
                em ficar vinculado por estes Termos. Se você não concordar com qualquer parte dos termos,
                não poderá acessar o serviço.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Uso dos Serviços</h2>
              <p>
                Você concorda em usar nossos serviços apenas para fins lícitos. Você é responsável por
                todo o conteúdo hospedado em seu servidor e por todas as atividades que ocorram em sua conta.
                Atividades proibidas incluem, mas não se limitam a:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Hospedagem de material ilegal, como conteúdo pirateado ou malicioso.</li>
                <li>Envio de spam ou qualquer forma de comunicação não solicitada.</li>
                <li>Ataques de negação de serviço (DDoS) ou qualquer outra atividade que prejudique a rede.</li>
                <li>Uso excessivo de recursos que afete negativamente outros clientes.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Pagamentos e Faturamento</h2>
              <p>
                Os serviços são cobrados em um ciclo recorrente (mensal ou anual). O pagamento deve ser
                feito antecipadamente para o próximo ciclo de serviço. A falha no pagamento resultará na
                suspensão e, eventualmente, no encerramento de sua conta. Os preços estão sujeitos a
                alterações com aviso prévio de 30 dias.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cancelamento e Reembolso</h2>
              <p>
                Você pode cancelar seu serviço a qualquer momento através da nossa área do cliente.
                Oferecemos uma política de reembolso de 7 dias para novas contratações de hospedagem.
                Taxas de registro de domínio e outros complementos não são reembolsáveis.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitação de Responsabilidade</h2>
              <p>
                A Rede Gamer não será responsável por quaisquer danos diretos, indiretos, incidentais
                ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços. Isso inclui,
                mas não se limita a, perda de dados ou lucros cessantes.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos você
                sobre quaisquer alterações publicando os novos Termos nesta página. É sua responsabilidade
                revisar estes Termos periodicamente.
              </p>
              <p className="mt-4">
                Última atualização: 23 de julho de 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
