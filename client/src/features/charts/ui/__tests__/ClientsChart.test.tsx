import { render } from "@testing-library/react";
import { MemoClientsChart } from "features/charts";
import { getMaxLabelLength } from "features/charts/lib";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("features/charts/lib");

describe("Clients chart", () => {
  const mockGetMaxLabelLength = getMaxLabelLength as jest.Mock;

  const fakeData = [
    { client: "Client 1", payment: 10000, projects: 10 },
    { client: "Client 2", payment: 12000, projects: 12 },
    { client: "Client 3", payment: 13000, projects: 13 },
  ];

  beforeEach(() => {
    mockGetMaxLabelLength.mockReturnValue(100);
  });

  it("should render", async () => {
    render(<MemoClientsChart data={fakeData} />);
  });
});
