import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

type Step = {
  number: number;
  title: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
};

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="mb-12">
    <div className="mb-4 flex items-center justify-between">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
            initial={false}
            animate={{
              scale: step.number === currentStep ? 1.2 : 1,
              backgroundColor:
                step.number <= currentStep ? '#FFDE21' : '#D3D3D3',
            }}
          >
            {step.number < currentStep ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              step.number
            )}
          </motion.div>
          <span className="mt-2 text-xs text-gray-600">{step.title}</span>
        </div>
      ))}
    </div>
    <div className="mt-2 h-2 rounded-full bg-gray-200">
      <motion.div
        className="h-full rounded-full bg-yellow-600"
        initial={{ width: '0%' }}
        animate={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);
