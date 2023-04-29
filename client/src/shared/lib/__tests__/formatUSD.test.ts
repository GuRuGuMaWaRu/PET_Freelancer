import { formatUSD } from "shared/lib";

describe("formatUSD", () => {
  it("should format number with comas between thousand markers", () => {
    const value = 10000;

    expect(formatUSD(value)).toBe("10,000");
  });

  it("should format number with dots for decimals", () => {
    const value = 5000.5;

    expect(formatUSD(value)).toBe("5,000.5");
  });
});
