'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { FeedbackButton } from './feedback-button';
import { FeedbackFormStep } from './feedback-form-step';
import { FeedbackHeader } from './feedback-header';
import { FeedbackTypeStep } from './feedback-type-step';

export type FeedbackType = 'bug' | 'idea' | 'other';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log({ feedbackType, email, description, experience });
    resetForm();
  };

  const resetForm = () => {
    setStep('type');
    setFeedbackType(null);
    setEmail('');
    setDescription('');
    setExperience(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-80 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <FeedbackHeader
              onClose={resetForm}
              onBack={() => setStep('type')}
              showBackButton={step === 'form'}
            />
            <AnimatePresence mode="wait">
              {step === 'type' ? (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <FeedbackTypeStep
                    onSelect={(type: FeedbackType | null) => {
                      setFeedbackType(type);
                      setStep('form');
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ height: 'auto', opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 'auto', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FeedbackFormStep
                    email={email}
                    setEmail={setEmail}
                    description={description}
                    setDescription={setDescription}
                    experience={experience}
                    setExperience={setExperience}
                    onSubmit={handleSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <FeedbackButton onClick={() => setIsOpen(true)} />
        )}
      </AnimatePresence>
    </div>
  );
}
