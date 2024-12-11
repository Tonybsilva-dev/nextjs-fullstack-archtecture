import { ClockIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/modules/components/ui/card';
import { PageProps } from '@/shared/modules/types/page-props';

import { SignOutButton } from '../components/sign-out-button';

export const TenantPendingView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card
        className="w-full max-w-md"
        aria-label={t('accessibility.card.title')}
        aria-describedby="pending-description"
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {t('page.title')}
          </CardTitle>
          <CardDescription id="pending-description" className="text-center">
            {t('page.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <ClockIcon
            className="h-16 w-16 text-yellow-500"
            aria-label={t('accessibility.icon')}
          />
          <p className="text-center text-muted-foreground">
            {t('content.message.primary')}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <SignOutButton label={t('content.buttons.sign-out')} />
        </CardFooter>
      </Card>
    </div>
  );
};
