import { useDashboardData } from "./dashboard.hooks";
import { SControlsSection } from "./dashboard.styles";
import { ModalAddProject, MemoDashboardTotals, ChartSection } from "widgets";

function Dashboard() {
  const { earningsByMonth, dataByClient, dataByMonth, clients } =
    useDashboardData();

  return (
    <>
      <SControlsSection>
        <ModalAddProject clients={clients} />
      </SControlsSection>
      <MemoDashboardTotals data={earningsByMonth} />
      <ChartSection
        clientChartData={dataByClient}
        monthsChartData={dataByMonth}
      />
    </>
  );
}

export { Dashboard };
