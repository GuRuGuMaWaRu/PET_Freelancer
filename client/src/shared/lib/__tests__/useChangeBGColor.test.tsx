import { render } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useChangeBGColor } from "../hooks/useChangeBGColor";
import { colors } from "../../const";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("useChangeBGColor", () => {
  const mockUseLocation = useLocation as jest.Mock;
  const testPathname = "/projects";

  beforeEach(() => {
    document.body.style.backgroundColor = "";
    mockUseLocation.mockReturnValue({ pathname: testPathname });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update the body background color when the pathname changes", () => {
    render(<TestComponent />);

    expect(document.body.style.backgroundColor).toBe(colors.projectsPageBg);
  });
});

function TestComponent() {
  useChangeBGColor();
  return null;
}
