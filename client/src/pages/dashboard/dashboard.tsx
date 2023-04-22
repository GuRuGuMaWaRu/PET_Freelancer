/** @jsxImportSource @emotion/react */
import React from "react";

import { useDashboardData } from "./dashboard.hooks";
import { ChartType } from "../../utils";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  ChartSelectionButton,
} from "../../components";
import { mq } from "../../shared/const";
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
      <div
        css={{
          position: "relative",
          margin: "4rem 10px",
          maxWidth: "1000px",
          height: "400px",
          [mq.medium]: {
            maxWidth: "100%",
          },
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
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
        </div>
        {chartType === ChartType.earnings ? (
          <MemoEarningsChart data={dataByMonth} />
        ) : (
          <MemoClientsChart data={dataByClient} />
        )}
      </div>
    </>
  );
}

export { Dashboard };
