'use client';

import Link from 'next/link'
import { Button } from '@/shared/modules/components/ui/button'

export const HomeView = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-6 px-4 lg:px-8 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-xl font-semibold" href="#">
            PayFlow
          </Link>
          <nav className="flex gap-6">
            <Link className="text-sm text-gray-600 hover:text-gray-900" href="#features">
              Recursos
            </Link>
            <Link className="text-sm text-gray-600 hover:text-gray-900" href="#pricing">
              Preços
            </Link>
            <Link className="text-sm text-gray-600 hover:text-gray-900" href="#contact">
              Contato
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Gerencie Clientes e Pagamentos com Facilidade
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 mb-8">
              Simplifique sua gestão financeira e de clientes com nossa plataforma intuitiva e poderosa.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#contact">
                <Button>
                  Comece Agora
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestão de Clientes</h3>
                <p className="text-gray-600">
                  Organize e acompanhe informações detalhadas dos clientes, histórico de interações e preferências.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Processamento de Pagamentos</h3>
                <p className="text-gray-600">
                  Aceite diversos métodos de pagamento e gerencie transações de forma segura e eficiente.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Relatórios e Análises</h3>
                <p className="text-gray-600">
                  Obtenha insights valiosos com relatórios detalhados sobre vendas, clientes e tendências financeiras.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {['Básico', 'Profissional', 'Empresarial'].map((plan, index) => (
                <div key={plan} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                  <p className="text-gray-600 mb-4">
                    {index === 0 ? 'Para pequenos negócios' : index === 1 ? 'Para empresas em crescimento' : 'Para grandes corporações'}
                  </p>
                  <p className="text-3xl font-bold mb-6">
                    R$ {index === 0 ? '99' : index === 1 ? '199' : '399'}<span className="text-sm font-normal">/mês</span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Gestão de clientes',
                      'Processamento de pagamentos',
                      index > 0 && 'Relatórios avançados',
                      index > 1 && 'API personalizada',
                    ].filter(Boolean).map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="mr-2 text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                    Escolher Plano
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 mb-8">
              Entre em contato conosco para uma demonstração gratuita ou para começar a usar nossa plataforma hoje mesmo.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#contact">
                <Button>
                  Solicitar Demonstração
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2023 PayFlow. Todos os direitos reservados.</p>
          <nav className="flex gap-4 mt-4 sm:mt-0">
            <Link className="text-sm text-gray-600 hover:text-gray-900" href="#">
              Termos de Serviço
            </Link>
            <Link className="text-sm text-gray-600 hover:text-gray-900" href="#">
              Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

