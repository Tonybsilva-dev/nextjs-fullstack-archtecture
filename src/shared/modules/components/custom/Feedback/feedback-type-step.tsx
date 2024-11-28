import { Bug, Lightbulb, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../ui/button';
import { FeedbackType } from '.';

export function FeedbackTypeStep({
  onSelect,
}: {
  onSelect: (type: FeedbackType) => void;
}) {
  const t = useTranslations('components.feedback-widget');

  const feedbackTypes: {
    [key in FeedbackType]: { title: string; icon: React.ReactNode };
  } = {
    bug: {
      title: t('type-step.bug'),
      icon: <Bug className="h-6 w-6" />,
    },
    idea: {
      title: t('type-step.idea'),
      icon: <Lightbulb className="h-6 w-6" />,
    },
    other: {
      title: t('type-step.other'),
      icon: <MoreHorizontal className="h-6 w-6" />,
    },
  };

  return (
    <div className="space-y-4 p-4">
      {Object.entries(feedbackTypes).map(([key, { title, icon }]) => (
        <Button
          key={key}
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => onSelect(key as FeedbackType)}
        >
          <span className="mr-2">{icon}</span>
          {title}
        </Button>
      ))}
    </div>
  );
}
