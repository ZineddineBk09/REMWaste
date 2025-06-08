import React, { useState } from 'react';
import { Button, Breadcrumbs, BreadcrumbItem } from '@heroui/react';
import { Skip } from '../types/skip';
import { useSkips } from '../hooks/useSkips';
import { ProgressBar } from '../components/ProgressBar';
import { SkipGrid } from '../components/SkipGrid';

const steps = [
  { id: 'postcode', label: 'Postcode', completed: true, active: false },
  { id: 'waste-type', label: 'Waste Type', completed: true, active: false },
  { id: 'select-skip', label: 'Select Skip', completed: false, active: true },
  { id: 'permit-check', label: 'Permit Check', completed: false, active: false },
  { id: 'choose-date', label: 'Choose Date', completed: false, active: false },
  { id: 'payment', label: 'Payment', completed: false, active: false },
];

export const SelectSkipPage: React.FC = () => {
  const { skips, loading, error, refetch } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      // In a real app, this would navigate to the next step
      console.log('Continuing with skip:', selectedSkip);
      alert(`Selected ${selectedSkip.size} yard skip for £${(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}`);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            className="text-white"
            itemClasses={{
              item: "text-white/70 data-[current=true]:text-primary-300",
              separator: "text-white/50"
            }}
          >
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Book Skip</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Select Skip Size</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Progress Bar */}
        <ProgressBar steps={steps} />

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Skip Grid */}
        <div className="max-w-6xl mx-auto mb-8">
          <SkipGrid
            skips={skips}
            selectedSkip={selectedSkip}
            onSelectSkip={handleSelectSkip}
            loading={loading}
            error={error}
          />
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            className={`px-8 py-3 text-lg font-semibold transition-all ${
              selectedSkip
                ? 'bg-primary-300 text-black hover:bg-primary-400'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            size="lg"
            isDisabled={!selectedSkip}
            onPress={handleContinue}
            aria-label={
              selectedSkip
                ? `Continue with ${selectedSkip.size} yard skip`
                : 'Select a skip to continue'
            }
          >
            Continue →
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>All prices include VAT. Hire period starts from delivery date.</p>
          <p className="mt-1">
            Need help choosing? <span className="text-primary-300 cursor-pointer hover:underline">Contact our team</span>
          </p>
        </div>
      </div>
    </div>
  );
}; 