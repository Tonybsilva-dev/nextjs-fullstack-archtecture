import { Bug, Lightbulb, MoreHorizontal } from 'lucide-react';

import { Button } from '../../ui/button';
import { FeedbackType } from '.';

const feedbackTypes: {
  [key in FeedbackType]: { title: string; icon: React.ReactNode };
} = {
  bug: { title: 'Reportar um bug', icon: <Bug className="h-6 w-6" /> },
  idea: { title: 'Sugerir uma ideia', icon: <Lightbulb className="h-6 w-6" /> },
  other: {
    title: 'Outro feedback',
    icon: <MoreHorizontal className="h-6 w-6" />,
  },
};

export function FeedbackTypeStep({
  onSelect,
}: {
  onSelect: (type: FeedbackType) => void;
}) {
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
