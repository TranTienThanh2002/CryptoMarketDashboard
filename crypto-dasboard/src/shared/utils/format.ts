export const formatPrice = (value: number): string => {
  if (value >= 1000) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  if (value >= 1) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }

  return value.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};