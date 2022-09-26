const convertToMillions = (value: string) => {
  return `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(+value)}`;
};

export { convertToMillions };
