'use client';

import { BackButton } from "@/shared/modules/components/ui/back-button";
import { LAST_UPDATED_APPLICATION, NAME_APPLICATION } from "@/shared/modules/constants/application.constants";

export const TermsAndConditionsView = () => {
  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-24"
      aria-labelledby="terms-heading"
    >
      <BackButton />
      <div className="space-y-8">
        <header className="text-center">
          <h1
            id="terms-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Termos e Condições
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Última atualização: {LAST_UPDATED_APPLICATION}
          </p>
        </header>
        <div className="space-y-6">
          <section aria-labelledby="user-responsibilities">
            <h2 id="user-responsibilities" className="text-xl font-bold">
              Responsabilidades do usuário
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Ao usar o {NAME_APPLICATION}, você concorda em usar o serviço de forma
              responsável e legal. Isto inclui, mas não está limitado a,
              respeitar a privacidade dos outros, abster-se de atos abusivos ou
              comportamento de assédio e não se envolver em quaisquer atividades
              ilegais.
            </p>
          </section>
          <section aria-labelledby="data-privacy">
            <h2 id="data-privacy" className="text-xl font-bold">
              Privacidade dos dados
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Levamos a sério a privacidade dos seus dados. Qualquer informação
              pessoal que você nos fornecer será tratada de acordo com nossa
              Política de Privacidade. Não compartilharemos ou venderemos seus
              dados a terceiros sem o seu consentimento, exceto conforme exigido
              por lei.
            </p>
          </section>
          <section aria-labelledby="intellectual-property">
            <h2 id="intellectual-property" className="text-xl font-bold">
              Propriedade intelectual
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              A {NAME_APPLICATION}, incluindo seu software, conteúdo e marca, é
              propriedade de Antonio S e é protegida por direitos autorais e
              outras leis de propriedade intelectual. Você não pode reproduzir,
              modificar ou distribuir qualquer parte do serviço sem nosso
              consentimento prévio por escrito.
            </p>
          </section>
          <section aria-labelledby="liability-limitations">
            <h2 id="liability-limitations" className="text-xl font-bold">
              Limitação de responsabilidade
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Faremos esforços razoáveis para garantir a confiabilidade e
              disponibilidade do AI Meeting Bot Manager, mas não podemos
              garantir que o serviço será ininterrupto ou livre de erros. Não
              seremos responsáveis por quaisquer danos ou perdas resultantes do
              uso do serviço, incluindo, mas não limitado a, danos diretos,
              indiretos, incidentais ou consequenciais.
            </p>
          </section>
          <section aria-labelledby="terms-changes">
            <h2 id="terms-changes" className="text-xl font-bold">
              Mudanças nos Termos
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Reservamo-nos o direito de atualizar estes Termos e Condições a
              qualquer momento. Quaisquer alterações entrarão em vigor
              imediatamente após a publicação dos termos atualizados em nosso
              site. É sua responsabilidade revisar os Termos e Condições
              periodicamente para quaisquer atualizações.
            </p>
          </section>
          <section aria-labelledby="contact-us">
            <h2 id="contact-us" className="text-xl font-bold">
              Contate-nos
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Se você tiver alguma dúvida ou preocupação sobre estes Termos e
              Condições, por favor, contacte-nos em{" "}
              <a
                className="text-gray-900 underline dark:text-gray-50"
                href="mailto:contato@antoniobsilva.com.br?subject={NAME_APPLICATION}&body=Olá, me chamo ..."
              >
                contato@antoniobsilva.com.br
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>)
}

