const convertToThousands = (value: string) => {
  return `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+value)}`;
};

export { convertToThousands };
