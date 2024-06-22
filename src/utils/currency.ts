export const convertCurrency = ({
  currencyCode,
  total,
}: {
  currencyCode: string;
  total: number;
}) => {
  switch (currencyCode.toUpperCase()) {
    case "USD":
      return `$${total / 100}`;
    default:
      throw new Error(`Unsupported currency: ${currencyCode}`);
  }
};
