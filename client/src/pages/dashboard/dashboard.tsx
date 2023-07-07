import { useDashboardData } from "./dashboard.hooks";
import { SControlsSection } from "./dashboard.styles";
import { MemoDashboardTotals, ChartSection } from "widgets";
import { ModalAddProject } from "entities/projects";

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
