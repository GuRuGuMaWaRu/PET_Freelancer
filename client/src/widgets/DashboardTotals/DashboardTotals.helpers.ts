import type { IEarnings } from "shared/types";
import { formatUSD } from "shared/lib";

const getEarningsForThisMonth = (data: IEarnings[]): string => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const earnings = data.find((item) => item.id === `${year}-${month}`);

  return formatUSD(earnings?.payment ? earnings.payment / 1000 : 0);
};

const getEarningsForThisYear = (data: IEarnings[]): string => {
  const year = new Date().getFullYear();

  const total = data.reduce((acc, item) => {
    if (item.date.getFullYear() === year) {
      return acc + item.payment;
    }
    return acc;
  }, 0);

  return formatUSD(total !== 0 ? total / 1000 : 0);
};

export { getEarningsForThisMonth, getEarningsForThisYear };
