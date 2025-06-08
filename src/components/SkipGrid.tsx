import React from "react";
import { Skeleton, Card, CardBody, Button, Alert } from "@heroui/react";
import type { SkipGridProps } from "../types/skip";
import { SkipCard } from "./SkipCard";

const SkipCardSkeleton: React.FC = () => (
  <Card className="w-full">
    <CardBody className="p-0">
      <Skeleton className="rounded w-full h-48" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="rounded-full h-6 w-24" />
          <Skeleton className="rounded-full h-8 w-16" />
        </div>
        <Skeleton className="rounded-full h-4 w-32" />
        <Skeleton className="rounded-full h-10 w-full" />
      </div>
    </CardBody>
  </Card>
);

export const SkipGrid: React.FC<SkipGridProps> = ({
  skips,
  selectedSkip,
  onSelectSkip,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="grid"
        aria-label="Loading skip options"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SkipCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto" role="alert">
        <Alert
          color="danger"
          title="Unable to load skip sizes"
          description={error}
          endContent={
            <Button
              color="danger"
              variant="ghost"
              size="sm"
              onPress={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (skips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          No skip sizes available for this location
        </div>
        <Button
          color="primary"
          variant="ghost"
          onPress={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="grid"
      aria-label="Skip size options"
    >
      {skips.map((skip) => (
        <div key={skip.id} role="gridcell">
          <SkipCard
            skip={skip}
            isSelected={selectedSkip?.id === skip.id}
            onSelect={onSelectSkip}
          />
        </div>
      ))}
    </div>
  );
};
