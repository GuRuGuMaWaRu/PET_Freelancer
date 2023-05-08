import { render, screen } from "@testing-library/react";
import { EarningsByDate } from "../EarningsByDate";

describe("EarningsByDate", () => {
  it("should render and display date and sum", () => {
    render(<EarningsByDate date="march" amount="100" />);

    expect(screen.getByText("march")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
