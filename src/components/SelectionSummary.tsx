import React from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Skip } from '../types/skip';
import { formatCurrency, calculateTotalPriceWithVat } from '../utils/formatCurrency';

interface SelectionSummaryProps {
  selectedSkip: Skip | null;
  onBack?: () => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selectedSkip,
  onBack,
  onContinue,
  isLoading = false,
}) => {
  if (!selectedSkip) return null;

  const totalPrice = calculateTotalPriceWithVat(selectedSkip.price_before_vat, selectedSkip.vat);

  return (
    <>
      {/* Overlay to add padding at bottom of page */}
      <div className="h-32 md:h-24" />
      
      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-gray-700 animate-in slide-in-from-bottom-full duration-300">
        <Card className="rounded-none shadow-xl bg-slate-900 border-t border-gray-600">
          <CardBody className="p-4">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedSkip.size} Yard Skip
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedSkip.hire_period_days} day hire period
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary-300">
                    {formatCurrency(totalPrice)}
                  </div>
                  <div className="text-xs text-gray-400">
                    inc. VAT
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                {onBack && (
                  <Button
                    className="flex-1 bg-gray-700 text-white hover:bg-gray-600"
                    size="lg"
                    startContent={<ArrowLeft size={16} />}
                    onPress={onBack}
                  >
                    Back
                  </Button>
                )}
                <Button
                  className="flex-1 bg-primary-300 text-black hover:bg-primary-400 font-semibold"
                  size="lg"
                  endContent={<ArrowRight size={16} />}
                  onPress={onContinue}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedSkip.size} Yard Skip
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedSkip.hire_period_days} day hire
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary-300">
                    {formatCurrency(totalPrice)}
                  </div>
                  <div className="text-xs text-gray-400">inc. VAT</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {onBack && (
                  <Button
                    className="bg-gray-700 text-white hover:bg-gray-600"
                    size="lg"
                    startContent={<ArrowLeft size={16} />}
                    onPress={onBack}
                  >
                    Back
                  </Button>
                )}
                <Button
                  className="bg-primary-300 text-black hover:bg-primary-400 font-semibold px-8"
                  size="lg"
                  endContent={<ArrowRight size={16} />}
                  onPress={onContinue}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                </Button>
              </div>
            </div>

            {/* Disclaimer Text */}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Imagery and information shown throughout this website may not reflect the exact shape or size specification, 
                colours may vary, options and/or accessories may be featured at additional cost.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}; 