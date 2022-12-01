const formatterUSD = new Intl.NumberFormat("en-US");

const formatUSD = (amount: number): string => {
  return formatterUSD.format(amount);
};

export { formatUSD };
