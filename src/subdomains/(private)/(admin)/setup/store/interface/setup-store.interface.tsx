'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BanIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

import { EmptyState } from '@/shared/modules/components/custom/empty-state';
import { Button } from '@/shared/modules/components/ui/button';

import { Stepper } from '../components/stepper';
import { FormBasicInfo } from '../components/steps/form-basic-info';
import { FormContactInfo } from '../components/steps/form-contact-info';
import { FormReview } from '../components/steps/form-review';

type StoreData = {
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  email: string;
};

export default function SetupStoreView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeData, setStoreData] = useState<StoreData>({
    name: '',
    description: '',
    category: '',
    address: '',
    phone: '',
    email: '',
  });

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Contact Info' },
    { number: 3, title: 'Payment Setup' },
    { number: 4, title: 'Review & Confirm' },
  ];

  const nextStep = () =>
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const updateStoreData = (field: keyof StoreData, value: string) =>
    setStoreData((data) => ({ ...data, [field]: value }));

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormBasicInfo
            storeData={storeData}
            updateStoreData={updateStoreData}
          />
        );
      case 2:
        return (
          <FormContactInfo
            storeData={storeData}
            updateStoreData={updateStoreData}
          />
        );
      case 4:
        return <FormReview storeData={storeData} />;
      default:
        return <EmptyState text="Setup not implemented" icon={BanIcon} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="mb-2 text-3xl font-light">Before continuing...</h1>
      <p className="mb-8 text-gray-600">
        Complete the steps below to start your journey with us!
      </p>
      <div className="w-full max-w-3xl">
        <Stepper steps={steps} currentStep={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between">
          {currentStep === 1 ? (
            <Button variant="outline">Cancel</Button>
          ) : (
            <Button
              variant="outline"
              onClick={previousStep}
              className="flex items-center space-x-2"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Back</span>
            </Button>
          )}

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length}
            className="flex items-center space-x-2"
          >
            <span>{currentStep < steps.length ? 'Next Step' : 'Finish'}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
