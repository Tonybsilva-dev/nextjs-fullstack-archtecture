import { ChevronLeftIcon, XIcon } from 'lucide-react';

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
        </Button>
      )}
      <h2 className="text-lg font-semibold">Envie seu feedback</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <Iconify icon={XIcon} />
      </Button>
    </div>
  );
}
