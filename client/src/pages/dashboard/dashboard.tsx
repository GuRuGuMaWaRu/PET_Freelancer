/** @jsxImportSource @emotion/react */
import React from "react";

import { useDashboardData } from "./dashboard.hooks";
import { SContainer } from "./dashboard.styles";
import { ChartType } from "utils";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  ChartSelectionButton,
} from "components";
import { AddProjectModal } from "widgets";

function Dashboard() {
  const {
    earningsByMonth,
    dataByClient,
    dataByMonth,
    clients,
  } = useDashboardData();
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings,
  );

  return (
    <>
      <MemoDashboardTotals data={earningsByMonth} />
      <SContainer>
        <AddProjectModal clients={clients} />
        <div>
          <ChartSelectionButton
            variant="earnings"
            chartType={chartType}
            onClick={() => setChartType(ChartType.earnings)}
          >
            Earnings
          </ChartSelectionButton>
          <ChartSelectionButton
            variant="clients"
            chartType={chartType}
            onClick={() => setChartType(ChartType.clients)}
          >
            Clients
          </ChartSelectionButton>
        </div>
      </SContainer>
      {chartType === ChartType.earnings ? (
        <MemoEarningsChart data={dataByMonth} />
      ) : (
        <MemoClientsChart data={dataByClient} />
      )}
    </>
  );
}

export { Dashboard };
