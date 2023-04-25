import { formatDate } from "shared/lib";

const getDateRange = (startDate: number, endDate: number): string => {
  const begin = formatDate(startDate);
  const end = formatDate(endDate);

  return `${begin} - ${end}`;
};

export { getDateRange };
