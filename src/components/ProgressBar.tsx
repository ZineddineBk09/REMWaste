import React from 'react';
import { 
  MapPin, 
  Trash2, 
  ShoppingCart, 
  FileCheck, 
  Calendar, 
  CreditCard,
  Check 
} from 'lucide-react';

interface Step {
  id: string;
  label: string;
  completed: boolean;
  active: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  className?: string;
}

const stepIcons = {
  'postcode': MapPin,
  'waste-type': Trash2,
  'select-skip': ShoppingCart,
  'permit-check': FileCheck,
  'choose-date': Calendar,
  'payment': CreditCard,
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, className = '' }) => {
  return (
    <>
      {/* Desktop/Tablet Horizontal Layout */}
      <div className={`hidden md:block w-full max-w-4xl mx-auto mb-8 ${className}`}>
        <div className="flex items-center justify-center space-x-4 lg:space-x-8">
          {steps.map((step, index) => {
            const IconComponent = stepIcons[step.id as keyof typeof stepIcons] || ShoppingCart;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      step.completed
                        ? 'bg-primary-300 text-black shadow-lg'
                        : step.active
                        ? 'bg-primary-300 text-black shadow-lg scale-110'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {step.completed ? (
                      <Check size={20} />
                    ) : (
                      <IconComponent size={20} />
                    )}
                  </div>
                  <span className={`mt-2 text-xs lg:text-sm text-center max-w-20 whitespace-nowrap ${
                    step.active ? 'text-primary-300 font-semibold' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 transition-colors duration-200 ${
                      step.completed ? 'bg-primary-300' : 'bg-gray-600'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Sidebar Layout */}
      <div className={`md:hidden fixed left-0 top-0 h-full w-16 bg-slate-800 border-r border-gray-700 z-40 ${className}`}>
        <div className="flex flex-col items-center py-4 space-y-4">
          {steps.map((step, index) => {
            const IconComponent = stepIcons[step.id as keyof typeof stepIcons] || ShoppingCart;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    step.completed
                      ? 'bg-primary-300 text-black shadow-lg'
                      : step.active
                      ? 'bg-primary-300 text-black shadow-lg scale-110'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step.completed ? (
                    <Check size={16} />
                  ) : (
                    <IconComponent size={16} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-6 mt-2 transition-colors duration-200 ${
                      step.completed ? 'bg-primary-300' : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Mobile step indicator tooltip */}
        <div className="absolute left-full top-4 ml-2 pointer-events-none">
          {steps.find(step => step.active) && (
            <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-75">
              {steps.find(step => step.active)?.label}
            </div>
          )}
        </div>
      </div>
    </>
  );
}; 