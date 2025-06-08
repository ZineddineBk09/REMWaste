import React from 'react';

interface Step {
  id: string;
  label: string;
  completed: boolean;
  active: boolean;
}

interface ProgressBarProps {
  steps: Step[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step.completed
                    ? 'bg-primary-300 text-black'
                    : step.active
                    ? 'bg-primary-300 text-black'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.completed ? '✓' : index + 1}
              </div>
              <span className={`mt-2 text-xs md:text-sm text-center ${
                step.active ? 'text-primary-300 font-semibold' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 transition-colors ${
                  step.completed ? 'bg-primary-300' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 