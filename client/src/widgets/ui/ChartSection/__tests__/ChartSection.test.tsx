import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChartSection } from "../ChartSection";
import { getMaxLabelLength } from "features/charts/lib";

global.ResizeObserver = require("resize-observer-polyfill");
jest.mock("features/charts/lib");

describe("ChartSection", () => {
  const mockGetMaxLabelLength = getMaxLabelLength as jest.Mock;

  const clientChartData = [
    {
      client: "Client 1",
      payment: 1000,
      projects: 2,
    },
    {
      client: "Client 2",
      payment: 2000,
      projects: 3,
    },
  ];

  const monthsChartData = [
    {
      date: 1,
      payment: 1000,
      projects: 2,
    },
    {
      date: 2,
      payment: 2000,
      projects: 3,
    },
  ];

  beforeEach(() => {
    mockGetMaxLabelLength.mockReturnValue(100);
  });

  it("should render", () => {
    render(
      <ChartSection
        clientChartData={clientChartData}
        monthsChartData={monthsChartData}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by month/i,
    );
  });

  it("should render client chart", async () => {
    render(
      <ChartSection
        clientChartData={clientChartData}
        monthsChartData={monthsChartData}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by month/i,
    );
    await userEvent.click(screen.getByRole("button", { name: /clients/i }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by client/i,
    );
  });

  it("should switch to months chart after switching to clients chart", async () => {
    render(
      <ChartSection
        clientChartData={clientChartData}
        monthsChartData={monthsChartData}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by month/i,
    );

    await userEvent.click(screen.getByRole("button", { name: /clients/i }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by client/i,
    );

    await userEvent.click(screen.getByRole("button", { name: /earnings/i }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /earnings by month/i,
    );
  });
});
