import { motion } from 'framer-motion';
import { MessageSquareIcon } from 'lucide-react';

import { Button } from '../../ui/button';

export function FeedbackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <Button onClick={onClick} className="h-14 w-14 rounded-full">
        <MessageSquareIcon className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}
