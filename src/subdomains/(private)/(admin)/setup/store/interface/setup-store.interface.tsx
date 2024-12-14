'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { BanIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { EmptyState } from '@/shared/modules/components/custom/empty-state';
import { Button } from '@/shared/modules/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/modules/components/ui/dialog';

import { Stepper } from '../components/stepper';
import { FormBasicInfo } from '../components/steps/form-basic-info';
import { FormContactInfo } from '../components/steps/form-contact-info';
import { FormLocation } from '../components/steps/form-location';
import { FormReview } from '../components/steps/form-review';
import { storeZodSchema } from '../validations/setup-store.validations';

type StoreData = {
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
};

const defaultValues: StoreData = {
  name: '',
  description: '',
  category: '',
  address: '',
  phone: '',
  email: '',
  latitude: 0,
  longitude: 0,
};

export default function SetupStoreView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [askGeoPermission, setAskGeoPermission] = useState(false);
  const [geoChecked, setGeoChecked] = useState(false); // Para saber se já tentamos pedir a localização

  // Inicializando o react-hook-form com zodResolver
  const methods = useForm<StoreData>({
    resolver: zodResolver(storeZodSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { setValue } = methods;

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Contact Info' },
    { number: 3, title: 'Location Setup' },
    { number: 4, title: 'Payment Setup' },
    { number: 5, title: 'Review & Confirm' },
  ];

  const nextStep = async () => {
    if (currentStep === 1) {
      const valid = await methods.trigger(['name', 'description', 'category']);
      if (!valid) return;
    } else if (currentStep === 2) {
      const valid = await methods.trigger(['address', 'phone', 'email']);
      if (!valid) return;
    } else if (currentStep === 3) {
      // Valida latitude e longitude
      const valid = await methods.trigger(['latitude', 'longitude']);
      if (!valid) return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FormBasicInfo />;
      case 2:
        return <FormContactInfo />;
      case 3:
        return (
          <>
            <Dialog open={askGeoPermission} onOpenChange={setAskGeoPermission}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Allow Geolocation?</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600">
                  We would like to access your current location to start the map
                  view as close as possible to your store.
                </p>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Usuário nega
                      setAskGeoPermission(false);
                      setGeoChecked(true);
                    }}
                  >
                    No, thanks
                  </Button>
                  <Button
                    onClick={() => {
                      // Tentar obter a localização
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          setValue('latitude', latitude);
                          setValue('longitude', longitude);
                          setAskGeoPermission(false);
                          setGeoChecked(true);
                        },
                        (error) => {
                          console.error('Geolocation error:', error);
                          // Não conseguiu geolocalizar, segue sem
                          setAskGeoPermission(false);
                          setGeoChecked(true);
                        }
                      );
                    }}
                  >
                    Allow
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {geoChecked && <FormLocation />}
          </>
        );
      case 5:
        return <FormReview />;
      default:
        return <EmptyState text="Setup not implemented" icon={BanIcon} />;
    }
  };

  useEffect(() => {
    if (currentStep === 3 && !geoChecked) {
      setAskGeoPermission(true);
    }
  }, [currentStep, geoChecked]);

  return (
    <FormProvider {...methods}>
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
              <Button variant="outline" onClick={() => signOut()}>
                Cancel
              </Button>
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
    </FormProvider>
  );
}
