'use client';

import Link from 'next/link';

import { Button } from '@/shared/modules/components/ui/button';

import HeaderHomePage from '../components/header';

export const HomeView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderHomePage />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Gerencie Clientes e Pagamentos com Facilidade
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Simplifique sua gestão financeira e de clientes com nossa
              plataforma intuitiva e poderosa.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#contact">
                <Button>Comece Agora</Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">Saiba Mais</Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Recursos Principais
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Gestão de Clientes
                </h3>
                <p className="text-gray-600">
                  Organize e acompanhe informações detalhadas dos clientes,
                  histórico de interações e preferências.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Processamento de Pagamentos
                </h3>
                <p className="text-gray-600">
                  Aceite diversos métodos de pagamento e gerencie transações de
                  forma segura e eficiente.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Relatórios e Análises
                </h3>
                <p className="text-gray-600">
                  Obtenha insights valiosos com relatórios detalhados sobre
                  vendas, clientes e tendências financeiras.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Planos e Preços
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {['Básico', 'Profissional', 'Empresarial'].map((plan, index) => (
                <div key={plan} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold">{plan}</h3>
                  <p className="mb-4 text-gray-600">
                    {index === 0
                      ? 'Para pequenos negócios'
                      : index === 1
                        ? 'Para empresas em crescimento'
                        : 'Para grandes corporações'}
                  </p>
                  <p className="mb-6 text-3xl font-bold">
                    R$ {index === 0 ? '99' : index === 1 ? '199' : '399'}
                    <span className="text-sm font-normal">/mês</span>
                  </p>
                  <ul className="mb-6 space-y-2">
                    {[
                      'Gestão de clientes',
                      'Processamento de pagamentos',
                      index > 0 && 'Relatórios avançados',
                      index > 1 && 'API personalizada',
                    ]
                      .filter(Boolean)
                      .map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="mr-2 text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={index === 1 ? 'default' : 'outline'}
                  >
                    Escolher Plano
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Pronto para Começar?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Entre em contato conosco para uma demonstração gratuita ou para
              começar a usar nossa plataforma hoje mesmo.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#contact">
                <Button>Solicitar Demonstração</Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline">Fale Conosco</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
          <p className="text-sm text-gray-600">
            © 2023 PayFlow. Todos os direitos reservados.
          </p>
          <nav className="mt-4 flex gap-4 sm:mt-0">
            <Link
              className="text-sm text-gray-600 hover:text-gray-900"
              href="#"
            >
              Termos de Serviço
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-gray-900"
              href="#"
            >
              Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};
