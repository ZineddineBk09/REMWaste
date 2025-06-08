import React from "react";
import { Card, CardBody, CardFooter, Image, Chip, Button } from "@heroui/react";
import type { SkipCardProps } from "../types/skip";
import {
  formatCurrency,
  calculateTotalPriceWithVat,
} from "../utils/formatCurrency";
import { SKIP_IMAGES } from "../utils/constants";

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
}) => {
  const totalPrice = calculateTotalPriceWithVat(
    skip.price_before_vat,
    skip.vat
  );
  const skipImage =
    SKIP_IMAGES[skip.size as keyof typeof SKIP_IMAGES] || SKIP_IMAGES[4];

  const handleClick = () => {
    onSelect(skip);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(skip);
    }
  };

  return (
    <Card
      className={`w-full transition-all duration-200 cursor-pointer relative ${
        isSelected
          ? "ring-2 ring-primary-300 ring-offset-2 ring-offset-background shadow-xl scale-[1.02]"
          : "hover:shadow-lg hover:scale-[1.01] focus-within:ring-2 focus-within:ring-primary-300"
      }`}
      isPressable
      onPress={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      aria-label={`${skip.size} yard skip for ${formatCurrency(totalPrice)}`}
    >
      <CardBody className="p-0">
        <div className="relative">
          <Image
            src={skipImage}
            alt={`${skip.size} yard skip`}
            className="w-full h-48 object-cover z-1"
            loading="lazy"
            radius="none"
          />
          <Chip
            className="absolute top-3 right-3 bg-primary-300 text-black font-semibold z-10 shadow-lg"
            size="sm"
          >
            {skip.size} Yards
          </Chip>
          {!skip.allowed_on_road && (
            <Chip
              className="absolute top-3 left-3 bg-danger text-white font-semibold z-10 shadow-lg"
              size="sm"
              startContent={<span className="text-xs mr-1">⚠️</span>}
            >
              Not Allowed On The Road
            </Chip>
          )}

          {/* black overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-2"></div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-foreground">
              {skip.size} Yard Skip
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-300">
                {formatCurrency(totalPrice)}
              </div>
              <div className="text-xs text-gray-500">inc. VAT</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {skip.hire_period_days} day hire period
          </p>
        </div>
      </CardBody>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button
          className={`w-full transition-colors ${
            isSelected
              ? "bg-primary-300 text-black font-semibold"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          size="md"
          onPress={handleClick}
        >
          {isSelected ? "Selected ✓" : "Select This Skip"}
        </Button>
      </CardFooter>
    </Card>
  );
};
