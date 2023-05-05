import { getEarningsForThisMonth } from "../DashboardTotals.helpers";

describe("getEarningsForThisMonth", () => {
  it("should return earnings for the current month", () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const earnings = [
      {
        id: `${year}-${month}`,
        date: new Date(),
        payment: 100000,
        projects: 10,
      },
      {
        id: "2020-02",
        date: new Date(),
        payment: 200000,
        projects: 20,
      },
      {
        id: "2020-03",
        date: new Date(),
        payment: 300000,
        projects: 30,
      },
    ];

    expect(getEarningsForThisMonth(earnings)).toEqual("100");
  });

  it("should return 0 if earnings is empty", () => {
    expect(getEarningsForThisMonth([])).toEqual("0");
  });

  it("should return 0 if earnings is no data for the current month", () => {
    const earnings = [
      {
        id: "2023-05",
        date: new Date(),
        payment: 100000,
        projects: 10,
      },
      {
        id: "2023-02",
        date: new Date(),
        payment: 200000,
        projects: 20,
      },
      {
        id: "2023-03",
        date: new Date(),
        payment: 300000,
        projects: 30,
      },
    ];

    expect(getEarningsForThisMonth(earnings)).toEqual("0");
  });
});
