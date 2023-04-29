const formatDate = (
  date: number, // timestamp
  options: Intl.DateTimeFormatOptions = { month: "numeric", year: "numeric" },
): string => {
  if (typeof date === "number" && !isNaN(date)) {
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return "Invalid Date";
};

export { formatDate };
