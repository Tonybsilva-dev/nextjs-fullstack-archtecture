import { Metadata } from 'next';

import SetupStoreView from '@/subdomains/(private)/(admin)/setup/store/interface/setup-store.interface';

export const metadata: Metadata = {
  title: 'Configurar loja',
};

export default function page() {
  return <SetupStoreView />;
}
