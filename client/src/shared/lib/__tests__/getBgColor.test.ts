import { colors } from "../../const";
import { getBgColor } from "../hooks/useChangeBGColor";

describe("getBgColor", () => {
  it("returns greenLight1 when the pathname starts with /projects", () => {
    expect(getBgColor("/projects")).toEqual(colors.greenLight1);
    expect(getBgColor("/projects/123")).toEqual(colors.greenLight1);
  });

  it("returns clientsPageBg when the pathname starts with /clients", () => {
    expect(getBgColor("/clients")).toEqual(colors.clientsPageBg);
    expect(getBgColor("/clients/123")).toEqual(colors.clientsPageBg);
  });

  it("returns dashboardPageBg when the pathname doesn't start with /projects or /clients", () => {
    expect(getBgColor("/")).toEqual(colors.dashboardPageBg);
    expect(getBgColor("/about")).toEqual(colors.dashboardPageBg);
    expect(getBgColor("/contact")).toEqual(colors.dashboardPageBg);
  });
});
