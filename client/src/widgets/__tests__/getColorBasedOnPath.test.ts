import { getColorBasedOnPath } from "../lib/helpers";

describe("getColorBasedOnPath", () => {
  it('should return "rgb(120 92 211)" for the "/" route', () => {
    expect(getColorBasedOnPath("/")).toBe("rgb(120 92 211)");
  });
  it('should return "rgb(120 92 211)" as default', () => {
    expect(getColorBasedOnPath("/abc")).toBe("rgb(120 92 211)");
  });
  it('should return "#4db575" for "/projects" route', () => {
    expect(getColorBasedOnPath("/projects")).toBe("#4db575");
  });
});
