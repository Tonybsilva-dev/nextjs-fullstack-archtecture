import {
  AngryIcon,
  CameraIcon,
  FrownIcon,
  MehIcon,
  SendIcon,
  SmileIcon,
  SmilePlusIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../ui/button';
import Iconify from '../../ui/iconify';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Textarea } from '../../ui/textarea';

const emojis = [
  { value: 'very-bad', icon: <AngryIcon className="h-6 w-6" /> },
  { value: 'bad', icon: <FrownIcon className="h-6 w-6" /> },
  { value: 'neutral', icon: <MehIcon className="h-6 w-6" /> },
  { value: 'good', icon: <SmileIcon className="h-6 w-6" /> },
  { value: 'very-good', icon: <SmilePlusIcon className="h-6 w-6" /> },
];

export function FeedbackFormStep({
  email,
  setEmail,
  description,
  setDescription,
  experience,
  setExperience,
  onSubmit,
}: {
  email: string;
  setEmail: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  experience: string | null;
  setExperience: (value: string) => void;
  onSubmit: () => void;
}) {
  const t = useTranslations('components.feedback-widget.form-step');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4 p-4"
    >
      <Input
        type="email"
        placeholder={t('email-placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder={t('description-placeholder')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Separator />
      <div>
        <Label className="mb-2 block text-center">
          {t('experience-label')}
        </Label>
        <RadioGroup
          className="flex justify-between"
          value={experience || ''}
          onValueChange={setExperience}
        >
          {emojis.map((emoji) => (
            <div key={emoji.value} className="flex flex-col items-center">
              <RadioGroupItem
                value={emoji.value}
                id={emoji.value}
                className="sr-only"
              />
              <Label
                htmlFor={emoji.value}
                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-yellow-100"
              >
                {emoji.icon}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div className="flex gap-2">
        <Button size={'icon'} className="px-3" variant={'outline'}>
          <Iconify icon={CameraIcon} />
          <span className="sr-only">{t('buttons.add-screenshot')}</span>
        </Button>
        <Button type="submit" className="w-full">
          <span className="sr-only">{t('buttons.submit')}</span>
          <SendIcon className="mr-2 h-4 w-4" />
          {t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}
