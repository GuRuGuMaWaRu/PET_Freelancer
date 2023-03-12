/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import { colors } from "../shared/const";
import { ChartType } from "../utils";

interface ChartSelectionButtonProps {
  variant: "earnings" | "clients";
  chartType: ChartType;
}

const ChartSelectionButton = styled.button<ChartSelectionButtonProps>(
  ({ variant, chartType }) => ({
    border: 0,
    padding: "5px 10px",
    color: colors.white,
    backgroundColor:
      variant === "earnings" && chartType === ChartType.earnings
        ? colors.text2
        : variant === "clients" && chartType === ChartType.clients
        ? colors.text2
        : "transparent",
    clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
  }),
);

export { ChartSelectionButton };
