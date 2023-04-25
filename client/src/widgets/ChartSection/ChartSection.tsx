import React from "react";

import { ChartType } from "./ChartSection.types";
import {
  SContainer,
  SChartSelectionButton,
  SChartDataContainer,
} from "./ChartSection.styles";
import { MemoEarningsChart, MemoClientsChart } from "components";
import { IEarningsByClient, IEarningsByMonth } from "utils";

interface IProps {
  clientChartData: IEarningsByClient[];
  monthsChartData: IEarningsByMonth[];
}

function ChartSection({ clientChartData, monthsChartData }: IProps) {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings,
  );

  const chartTitle =
    chartType === ChartType.earnings
      ? "Earnings by month"
      : "Earnings by Clients";

  return (
    <SContainer>
      <SChartDataContainer>
        <h2>{chartTitle}</h2>
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
      {chartType === ChartType.earnings ? (
        <MemoEarningsChart data={monthsChartData} />
      ) : (
        <MemoClientsChart data={clientChartData} />
      )}
    </SContainer>
  );
}

export { ChartSection };
