export const formatCurrency = (amount: number, currency = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotalPriceWithVat = (priceBeforeVat: number, vatPercentage: number): number => {
  return priceBeforeVat + (priceBeforeVat * (vatPercentage / 100));
}; 