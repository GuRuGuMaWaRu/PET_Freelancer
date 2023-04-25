const formatDate = (
  date: number,
  options: Intl.DateTimeFormatOptions = { month: "numeric", year: "numeric" },
): string => {
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export { formatDate };
