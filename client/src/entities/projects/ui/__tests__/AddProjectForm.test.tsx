import { useFetcher } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddProjectForm } from "../AddProjectForm/AddProjectForm";

jest.mock("react-router-dom", () => ({
  useFetcher: jest.fn(),
  Form: ({ children }: any) => children,
}));

describe("AddProjectForm", () => {
  const mockUseFetcher = useFetcher as jest.Mock;

  const clients = [
    { _id: "1", name: "test client 1" },
    { _id: "2", name: "test client 2" },
    { _id: "3", name: "test client 3" },
  ];

  beforeEach(() => {
    mockUseFetcher.mockReturnValue({ state: "idle" });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", () => {
    render(<AddProjectForm clients={clients} />);

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /^client$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^project nr$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /^currency$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^payment$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^comments$/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^add$/i })).toBeInTheDocument();
  });

  it("should show 'Add' button as disabled when form is loading", () => {
    mockUseFetcher.mockReturnValueOnce({ state: "loading" });

    render(<AddProjectForm clients={clients} />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^add/i })).toBeDisabled();
  });
});
