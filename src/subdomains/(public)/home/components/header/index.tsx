import { useTranslations } from 'next-intl';

import { HeaderHome } from './header-home';

export default function HeaderHomePage() {
  const t = useTranslations('components.header-home');

  const navSections = [
    {
      label: t('sections.discover-restaurants.label'),
      items: [
        {
          title: t('sections.discover-restaurants.items.top-rated.title'),
          href: '/restaurants/top-rated',
          description: t(
            'sections.discover-restaurants.items.top-rated.description'
          ),
        },
        {
          title: t('sections.discover-restaurants.items.nearby-map.title'),
          href: '/restaurants/map',
          description: t(
            'sections.discover-restaurants.items.nearby-map.description'
          ),
        },
        {
          title: t('sections.discover-restaurants.items.search-cuisine.title'),
          href: '/restaurants/search',
          description: t(
            'sections.discover-restaurants.items.search-cuisine.description'
          ),
        },
      ],
    },
    {
      label: t('sections.manage-experience.label'),
      items: [
        {
          title: t('sections.manage-experience.items.reserve-table.title'),
          href: '/reservations',
          description: t(
            'sections.manage-experience.items.reserve-table.description'
          ),
        },
        {
          title: t('sections.manage-experience.items.track-orders.title'),
          href: '/orders',
          description: t(
            'sections.manage-experience.items.track-orders.description'
          ),
        },
        {
          title: t('sections.manage-experience.items.save-favorites.title'),
          href: '/favorites',
          description: t(
            'sections.manage-experience.items.save-favorites.description'
          ),
        },
      ],
    },
    {
      label: t('sections.help-resources.label'),
      items: [
        {
          title: t('sections.help-resources.items.faq.title'),
          href: '/faq',
          description: t('sections.help-resources.items.faq.description'),
        },
        {
          title: t('sections.help-resources.items.developer.title'),
          href: '/developer',
          description: t('sections.help-resources.items.developer.description'),
        },
        {
          title: t('sections.help-resources.items.contact-support.title'),
          href: '/contact',
          description: t(
            'sections.help-resources.items.contact-support.description'
          ),
        },
      ],
    },
  ];

  return (
    <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-6">
      <HeaderHome params={{ translations: t }} navigation={navSections} />
    </header>
  );
}
