import { getEarningsForThisYear } from "../DashboardTotals.helpers";

describe("getEarningsForThisYear", () => {
  it("should return earnings for the current year", () => {
    const year = new Date().getFullYear();

    const earnings = [
      {
        id: `${year}-01`,
        date: new Date(),
        payment: 100000,
        projects: 10,
      },
      {
        id: `${year}-02`,
        date: new Date(),
        payment: 200000,
        projects: 20,
      },
      {
        id: `1980-03`,
        date: new Date("1980"),
        payment: 300000,
        projects: 30,
      },
    ];

    expect(getEarningsForThisYear(earnings)).toEqual("300");
  });

  it("should return 0 if there are no earnings for the current year", () => {
    const earnings = [
      {
        id: `1980-01`,
        date: new Date("1980"),
        payment: 100000,
        projects: 10,
      },
      {
        id: `1980-02`,
        date: new Date("1980"),
        payment: 200000,
        projects: 20,
      },
      {
        id: `1980-03`,
        date: new Date("1980"),
        payment: 300000,
        projects: 30,
      },
    ];

    expect(getEarningsForThisYear(earnings)).toEqual("0");
  });

  it("should return 0 if earnings is empty", () => {
    expect(getEarningsForThisYear([])).toEqual("0");
  });
});
