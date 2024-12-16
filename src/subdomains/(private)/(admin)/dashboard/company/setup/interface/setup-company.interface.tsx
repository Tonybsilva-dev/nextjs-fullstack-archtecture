'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { BanIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { EmptyState } from '@/shared/modules/components/custom/empty-state';
import { Button } from '@/shared/modules/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/modules/components/ui/dialog';
import { PageProps } from '@/shared/modules/types/page-props';
import { AppError } from '@/shared/modules/utils/errors';
import { formatDate } from '@/shared/modules/utils/format-date';

import { Stepper } from '../components/stepper';
import { FormBasicInfo } from '../components/steps/form-basic-info';
import { FormContactInfo } from '../components/steps/form-contact-info';
import { FormLocation } from '../components/steps/form-location';
import { FormReview } from '../components/steps/form-review';
import { storeZodSchema } from '../validations/setup-company.validations';

type StoreData = {
  name: string;
  document: string;
  description: string;
  categories: string[];
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
};

const defaultValues: StoreData = {
  name: '',
  document: '',
  description: '',
  categories: [],
  address: '',
  phone: '',
  email: '',
  latitude: 0,
  longitude: 0,
};

export const SetupCompanyView = ({ params, router }: PageProps) => {
  const { translations: t } = params;

  const [currentStep, setCurrentStep] = useState(1);
  const [askGeoPermission, setAskGeoPermission] = useState(false);
  const [geoChecked, setGeoChecked] = useState(false);

  const schema = storeZodSchema(t);

  const methods = useForm<StoreData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const { setValue } = methods;

  const steps = [
    { number: 1, title: t('steps.1.title') },
    { number: 2, title: t('steps.2.title') },
    { number: 3, title: t('steps.3.title') },
    { number: 4, title: t('steps.4.title') },
    { number: 5, title: t('steps.5.title') },
  ];

  const nextStep = async () => {
    if (currentStep === 1) {
      const valid = await methods.trigger([
        'name',
        'document',
        'description',
        'categories',
      ]);
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
        return <FormBasicInfo params={{ translations: t }} />;
      case 2:
        return <FormContactInfo params={{ translations: t }} />;
      case 3:
        return (
          <>
            <Dialog open={askGeoPermission} onOpenChange={setAskGeoPermission}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {t('form.dialog.allow-geolocation')}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600">
                  {t('form.dialog.geolocation-description')}
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
                    {t('form.buttons.denyLocation')}
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
                    {t('form.buttons.allowLocation')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {geoChecked && <FormLocation params={{ translations: t }} />}
          </>
        );
      case 5:
        return <FormReview params={{ translations: t }} />;
      default:
        return <EmptyState text={t('form.empty-state')} icon={BanIcon} />;
    }
  };

  useEffect(() => {
    if (currentStep === 3 && !geoChecked) {
      setAskGeoPermission(true);
    }
  }, [currentStep, geoChecked]);

  const onSubmit = async (data: StoreData) => {
    try {
      const response = await fetch('/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(t('form.status.success.message'), {
          description: formatDate(new Date()),
        });

        signOut();

        toast.success(t('form.signOutMessage'));
      } else {
        toast.error(responseData.error, {
          description: formatDate(new Date()),
        });
      }
      methods.reset();
    } catch (error) {
      const appError = AppError.from(error);
      appError.logError();

      toast.error(appError.message, {
        description: formatDate(new Date()),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
        <h1 className="mb-2 text-3xl font-light">{t('page.title')}</h1>
        <p className="mb-8 text-gray-600">{t('page.description')}</p>
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
              <Button variant="outline" onClick={router?.back}>
                {t('form.buttons.cancel')}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={previousStep}
                className="flex items-center space-x-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>{t('form.buttons.back')}</span>
              </Button>
            )}

            <Button
              onClick={() => {
                if (currentStep < steps.length) {
                  nextStep();
                } else {
                  methods.handleSubmit(onSubmit)();
                }
              }}
              className="flex items-center space-x-2"
            >
              <span>
                {currentStep < steps.length
                  ? t('form.buttons.nextStep')
                  : t('form.buttons.submit')}
              </span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
