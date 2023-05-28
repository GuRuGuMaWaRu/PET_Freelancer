import { render } from "@testing-library/react";
import { MemoDashboardTotals } from "../DashboardTotals";

describe("DashboardTotals", () => {
  it("should render", () => {
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

    const { container } = render(<MemoDashboardTotals data={earnings} />);
    expect(container).toMatchSnapshot();
  });
});
