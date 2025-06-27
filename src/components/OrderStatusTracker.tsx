import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2, ClipboardCheck, Truck, PackageCheck, XCircle } from 'lucide-react';

export type OrderStatus = 'Pending Verification' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const steps: { name: OrderStatus; icon: React.ElementType }[] = [
  { name: 'Pending Verification', icon: ClipboardCheck },
  { name: 'Processing', icon: Loader2 },
  { name: 'Shipped', icon: Truck },
  { name: 'Delivered', icon: PackageCheck },
];

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStatus }) => {
  console.log('OrderStatusTracker loaded with status:', currentStatus);
  const currentStatusIndex = steps.findIndex(step => step.name === currentStatus);

  if (currentStatus === 'Cancelled') {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <XCircle className="w-8 h-8 text-red-600 mr-4" />
        <div>
          <h3 className="text-lg font-semibold text-red-800">Order Cancelled</h3>
          <p className="text-sm text-red-600">This order has been cancelled. Please contact support for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStatusIndex;
          const isCompleted = index < currentStatusIndex;
          const isProcessing = step.name === 'Processing' && isActive;

          return (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2',
                    isCompleted ? 'bg-green-600 border-green-600 text-white' : '',
                    isActive ? 'bg-blue-600 border-blue-600 text-white' : '',
                    !isCompleted && !isActive ? 'bg-gray-100 border-gray-300 text-gray-400' : ''
                  )}
                >
                  <step.icon className={cn('w-6 h-6', isProcessing && 'animate-spin')} />
                </div>
                <p
                  className={cn(
                    'text-xs sm:text-sm text-center mt-2 font-medium',
                    isCompleted ? 'text-green-700' : '',
                    isActive ? 'text-blue-700' : 'text-gray-500'
                  )}
                >
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2',
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTracker;