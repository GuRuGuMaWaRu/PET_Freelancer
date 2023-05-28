import styled from "@emotion/styled";

import { colors } from "shared/const";
import { ChartType } from "./ChartSection.types";

const SContainer = styled.div({
  marginTop: "2rem",
});

interface ChartSelectionButtonProps {
  variant: ChartType;
  chartType: ChartType;
}

const SChartSelectionButton = styled.button<ChartSelectionButtonProps>(
  ({ variant, chartType }) => ({
    border: 0,
    padding: "5px 10px",
    color: colors.white,
    backgroundColor:
      variant === ChartType.earnings && chartType === ChartType.earnings
        ? colors.text2
        : variant === ChartType.clients && chartType === ChartType.clients
        ? colors.text2
        : "transparent",
    clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
  }),
);

const SChartDataContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SChartTitle = styled.h2({
  marginBlock: 0,
  alignSelf: "center",
});

const SDateRange = styled.p({
  marginBlockStart: 0,
  opacity: 0.7,
  fontSize: "0.9rem",
});

export {
  SContainer,
  SChartSelectionButton,
  SChartDataContainer,
  SChartTitle,
  SDateRange,
};
