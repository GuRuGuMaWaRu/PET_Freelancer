import { formatDate } from "shared/lib";

const getDateRange = (startDate: number, endDate: number): string => {
  const begin = formatDate(startDate);
  const end = formatDate(endDate);

  if (begin === "Invalid Date" || end === "Invalid Date") {
    return "";
  }

  return `${begin} - ${end}`;
};

export { getDateRange };
