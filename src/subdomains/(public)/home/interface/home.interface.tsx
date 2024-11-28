'use client';

import Image from 'next/image';

import WOMAN_SELLER_IMAGE from '@/assets/images/woman-seller.jpg';
import { CustomLink } from '@/shared/modules/components/custom/link';
import { Button } from '@/shared/modules/components/ui/button';
import { Input } from '@/shared/modules/components/ui/input';
import { Typography } from '@/shared/modules/components/ui/typography';
import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

import { FeatureSectionHome } from '../components/feature-section';
import HeaderHomePage from '../components/header';

export const HomeView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  /*
  TODO:
    - Adicionar acessibilidade
  */

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderHomePage />
      <main className="flex-1">
        <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <div className="items-center lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <Typography
                variant="caption"
                color="primary"
                className="font-bold uppercase tracking-wide text-primary"
              >
                {t('organize-grow')}
              </Typography>
              <Typography as="h1" variant="h1" className="mt-1 text-gray-900">
                {t('manage-store')}
              </Typography>
              <Typography variant="body1" className="mt-3 text-gray-500">
                {t('description', { NAME_APPLICATION })}
              </Typography>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <form
                  action="#"
                  method="POST"
                  className="mt-3 space-y-3 sm:flex sm:items-center sm:space-y-0"
                >
                  <Input
                    type="email"
                    placeholder={t('email-placeholder')}
                    className="block w-full rounded-md py-3 text-base placeholder-gray-500 shadow-sm sm:flex-1"
                  />
                  <Button
                    type="submit"
                    className="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
                  >
                    {t('cta-button')}
                  </Button>
                </form>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <Image
                  src={WOMAN_SELLER_IMAGE}
                  alt={t('image-alt')}
                  width={500}
                  height={500}
                  className="w-full object-cover"
                />
                <div
                  className="absolute bottom-0 right-0 hidden h-64 w-64 rounded-tl-full bg-primary lg:block"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <section id="features" className="flex w-full justify-center">
          <FeatureSectionHome params={{ translations: t }} />
        </section>
        {/*
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <Typography as="h2" variant="h2" className="mb-12 text-center">
              {t('feature.features-title')}
            </Typography>
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="flex items-center justify-center">
                  <Typography as="h3" variant="h3" className="mb-2">
                    {t('feature.clients-title')}
                  </Typography>
                </div>
                <Typography variant="body1" className="text-gray-600">
                  {t('feature.clients-description')}
                </Typography>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Typography as="h3" variant="h3" className="mb-2">
                  {t('feature.payments-title')}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  {t('feature.payments-description')}
                </Typography>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Typography as="h3" variant="h3" className="mb-2">
                  {t('feature.reports-title')}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  {t('feature.reports-description')}
                </Typography>
              </div>
            </div>
          </div>
        </section> */}
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
              <CustomLink href="#contact">
                <Button>{t('contact-demo-button')}</Button>
              </CustomLink>
              <CustomLink href="#contact">
                <Button variant="outline">{t('contact-contact-button')}</Button>
              </CustomLink>
            </div>
          </div>
        </section>
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
