/** @jsxImportSource @emotion/react */
import { useDashboardData } from "./dashboard.hooks";
import { MemoDashboardTotals } from "components";
import { AddProjectModal, ChartSection } from "widgets";

function Dashboard() {
  const {
    earningsByMonth,
    dataByClient,
    dataByMonth,
    clients,
  } = useDashboardData();

  return (
    <>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <AddProjectModal clients={clients} />
      </div>
      <MemoDashboardTotals data={earningsByMonth} />
      <ChartSection
        clientChartData={dataByClient}
        monthsChartData={dataByMonth}
      />
    </>
  );
}

export { Dashboard };
