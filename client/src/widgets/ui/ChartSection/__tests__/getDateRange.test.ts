import { getDateRange } from "../ChartSection.helpers";

describe("getDateRange", () => {
  test("returns the correct date range", () => {
    // Call the getDateRange function with mock start and end dates
    const startDate = 1641022800000; // January 1, 2022
    const endDate = 1643571599999; // January 31, 2022
    const result = getDateRange(startDate, endDate);

    // Expect the result to match the expected date range format
    expect(result).toBe("1/2022 - 1/2022");
  });

  test("handles invalid dates", () => {
    // Call the getDateRange function with invalid start and end dates
    const startDate = NaN;
    const endDate = NaN;
    const result = getDateRange(startDate, endDate);

    // Expect the result to be an empty string
    expect(result).toBe("");
  });
});
