import type { IEarningsByClient } from "shared/types";

const getMaxLabelLength = (data: IEarningsByClient[]): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = "16px outfit";

  const clientNamesWidth = data.map((item) =>
    Math.ceil(context.measureText(item.client).width),
  );

  return Math.max(...clientNamesWidth);
};

export { getMaxLabelLength };
