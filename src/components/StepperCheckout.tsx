import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperCheckoutProps {
  currentStep: number;
  steps?: string[];
}

const defaultSteps = ['Shipping', 'Prescription', 'Payment'];

const StepperCheckout: React.FC<StepperCheckoutProps> = ({
  currentStep,
  steps = defaultSteps,
}) => {
  console.log('StepperCheckout loaded, current step:', currentStep);

  return (
    <div className="flex items-center w-full max-w-2xl mx-auto p-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
              </div>
              <p
                className={cn(
                  'mt-2 text-sm font-medium transition-colors duration-300',
                  isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                )}
              >
                {step}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-4 transition-colors duration-300',
                  isCompleted ? 'bg-green-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepperCheckout;