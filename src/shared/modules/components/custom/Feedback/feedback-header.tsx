import { ChevronLeftIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../ui/button';
import Iconify from '../../ui/iconify';

export function FeedbackHeader({
  onClose,
  onBack,
  showBackButton,
}: {
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}) {
  const t = useTranslations('components.feedback-widget');

  return (
    <div className="flex items-center justify-between bg-zinc-800 p-4 text-white">
      {showBackButton && onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Iconify icon={ChevronLeftIcon} />
          <span className="sr-only"> {t('header.back-button')}</span>
        </Button>
      )}
      <h2 className="text-lg font-semibold">
        <h2>{t('header.title')}</h2>
      </h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <Iconify icon={XIcon} />
        <span className="sr-only"> {t('header.close-button')}</span>
      </Button>
    </div>
  );
}
