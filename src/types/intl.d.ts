import 'next-intl';

declare module 'next-intl' {
  interface Messages {
    'features-section': {
      title: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
  }
}
