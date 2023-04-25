import { formatDate } from "shared/lib";

describe("formatDate", () => {
  test("formats date correctly with default options", () => {
    // Call the formatDate function with a specific date and default options
    const date = 1661938800000; // August 31, 2022
    const result = formatDate(date);

    // Expect the result to match the expected formatted date
    expect(result).toBe("8/2022");
  });

  test("formats date correctly with custom options", () => {
    // Call the formatDate function with a specific date and custom options
    const date = 1661938800000; // August 31, 2022
    const options = {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };
    const result = formatDate(date, options);

    // Expect the result to match the expected formatted date
    expect(result).toBe("August 31, 2022");
  });

  test("handles invalid dates", () => {
    // Call the formatDate function with an invalid date
    const date = NaN;
    const result = formatDate(date);

    // Expect the result to be an empty string
    expect(result).toBe("Invalid Date");
  });
});
