/** @jsxImportSource @emotion/react */
import React from "react";

import { useDashboardData } from "./dashboard.hooks";
import { ChartType } from "../../utils";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  ChartSelectionButton,
  AddProjectForm,
} from "../../components";
import { Button, Modal, ModalOpenButton, ModalContents } from "../../shared/ui";
import { colors, mq } from "../../shared/const";

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
          <Modal>
            <ModalOpenButton>
              <Button>Add Project</Button>
            </ModalOpenButton>
            <ModalContents
              aria-label="Add Project Form"
              title="Add Project"
              bgColor={colors.dashboardModalBg}
            >
              <AddProjectForm clients={clients} />
            </ModalContents>
          </Modal>
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
