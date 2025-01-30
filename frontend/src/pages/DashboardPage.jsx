import CalendarView from "../components/CalendarView";
import OrderTable from "../components/OrderTable";
import DashboardLegend from "../components/DashboardLegend";

const DashboardPage = () => {
  return (
<section className="flex flex-col w-full lg:flex-row z-10 lg:mt-4">
  {/* Kalendarz maksymalnie po lewej */}
  <div className="lg:w-1/5 lg:h-screen w-3/4 lg:block lg:mr-16 2xl:mr-24">
    <CalendarView />
  </div>

  {/* Reszta elementów */}
  <div className="flex-1 flex flex-col lg:flex-row">
    <OrderTable />
    <DashboardLegend />
  </div>
</section>


  );
};

export default DashboardPage;
