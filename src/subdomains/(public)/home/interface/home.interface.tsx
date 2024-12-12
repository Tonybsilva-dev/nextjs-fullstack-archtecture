'use client';

import { CustomLink } from '@/shared/modules/components/custom/link';
import { Typography } from '@/shared/modules/components/ui/typography';
import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

import HeaderHomePage from '../components/header';
import { ContactMeSection } from '../components/sections/contact-me-section';
import { CTASection } from '../components/sections/cta-section';
import { FeaturesSection } from '../components/sections/feature-section';
import { HighlightsSection } from '../components/sections/highlights-section';
import { DemoSection } from '../components/sections/request-demo-section';

export const HomeView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  /*
  TODO:
    - Adicionar acessibilidade
  */

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderHomePage />
      <main className="flex-1">
        <section
          id="call-to-action-section"
          className="flex w-full justify-center"
        >
          <CTASection params={{ translations: t }} />
        </section>
        <section id="highlight-section" className="flex w-full justify-center">
          <HighlightsSection params={{ translations: t }} />
        </section>
        <section id="feature-section" className="flex w-full justify-center">
          <FeaturesSection params={{ translations: t }} />
        </section>
        <section id="contact-me" className="flex w-full justify-center">
          <DemoSection params={{ translations: t }} />
        </section>
        <section id="contact-me" className="flex w-full justify-center">
          <ContactMeSection params={{ translations: t }} />
        </section>
        {/*
        <section id="contact" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <Typography as="h2" variant="h2" className="mb-6 text-center">
              {t('contact-title')}
            </Typography>
            <Typography
              variant="body1"
              className="mx-auto mb-8 max-w-2xl text-center text-gray-600"
            >
              {t('contact-description')}
            </Typography>
            <div className="flex justify-center gap-4">
              <CustomLink href="/request-demo">
                <Button>{t('contact-demo-button')}</Button>
              </CustomLink>
              <CustomLink href="#contact">
                <Button variant="outline">{t('contact-contact-button')}</Button>
              </CustomLink>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
          <Typography variant="caption" className="text-sm text-gray-600">
            {t('footer.footer-copy', { NAME_APPLICATION })}
          </Typography>
          <nav className="mt-4 flex gap-4 sm:mt-0">
            <CustomLink
              className="text-sm text-gray-600 hover:text-gray-900"
              href="/terms-and-conditions"
            >
              {t('footer.terms-and-conditions')}
            </CustomLink>
          </nav>
        </div>
      </footer>
    </div>
  );
};
