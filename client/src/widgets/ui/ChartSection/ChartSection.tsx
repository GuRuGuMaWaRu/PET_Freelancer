import React from "react";

import { ChartType } from "./ChartSection.types";
import {
  SContainer,
  SChartSelectionButton,
  SChartDataContainer,
  SChartTitle,
  SDateRange,
} from "./ChartSection.styles";
import { getDateRange } from "./ChartSection.helpers";
import type { IEarningsByClient, IEarningsByMonth } from "shared/types";
import { MemoClientsChart, MemoEarningsChart } from "features/charts";

interface IProps {
  clientChartData: IEarningsByClient[];
  monthsChartData: IEarningsByMonth[];
}

function ChartSection({ clientChartData, monthsChartData }: IProps) {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings,
  );

  const dateRange = getDateRange(
    monthsChartData[0].date,
    monthsChartData[monthsChartData.length - 1].date,
  );

  const chartTitle =
    chartType === ChartType.earnings
      ? "Earnings by month"
      : "Earnings by Clients";

  return (
    <SContainer>
      <SChartDataContainer>
        <SChartTitle>{chartTitle}</SChartTitle>
        <div>
          <SChartSelectionButton
            variant={ChartType.earnings}
            chartType={chartType}
            onClick={() => setChartType(ChartType.earnings)}
          >
            Earnings
          </SChartSelectionButton>
          <SChartSelectionButton
            variant={ChartType.clients}
            chartType={chartType}
            onClick={() => setChartType(ChartType.clients)}
          >
            Clients
          </SChartSelectionButton>
        </div>
      </SChartDataContainer>
      <SDateRange>{dateRange}</SDateRange>
      {chartType === ChartType.earnings ? (
        <MemoEarningsChart data={monthsChartData} />
      ) : (
        <MemoClientsChart data={clientChartData} />
      )}
    </SContainer>
  );
}

export { ChartSection };
