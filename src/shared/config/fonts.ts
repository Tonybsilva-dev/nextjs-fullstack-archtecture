import localFont from 'next/font/local';

export const barlow = localFont({
  src: [
    {
      path: '../..//assets/fonts/Barlow-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../..//assets/fonts/Barlow-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../..//assets/fonts/Barlow-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-barlow',
});
