export const convertCurrency = ({
  currencyCode,
  total,
}: {
  currencyCode: string;
  total: number;
}) => {
  switch (currencyCode.toUpperCase()) {
    case "USD":
      const dollars = total / 100;
      return `$${dollars.toFixed(2)}`;
    default:
      throw new Error(`Unsupported currency: ${currencyCode}`);
  }
};
