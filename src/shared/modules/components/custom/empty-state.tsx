import { LucideIcon } from 'lucide-react';
import React from 'react';

import Iconify from '../ui/iconify';
import { Typography } from '../ui/typography';

type EmptyStateProps = {
  icon: LucideIcon;
  text: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-4 text-gray-400 dark:text-yellow-600">
        {' '}
        <Iconify icon={icon} />{' '}
      </div>
      <Typography variant={'body2'}>{text}</Typography>
    </div>
  );
};
