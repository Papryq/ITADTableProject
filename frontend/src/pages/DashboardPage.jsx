import CalendarView from "../components/CalendarView";
import OrderTable from "../components/OrderTable";
import DashboardLegend from "../components/DashboardLegend";

const DashboardPage = () => {
  return (
<section className="flex flex-col w-full lg:flex-row z-10 mt-4">
  {/* Kalendarz maksymalnie po lewej */}
  <div className="hidden lg:w-1/5 lg:h-screen lg:block lg:mr-16 2xl:mr-24">
    <CalendarView />
  </div>

  {/* Reszta elementów */}
  <div className="flex-1 flex flex-col lg:flex-row">
    <OrderTable />
    <DashboardLegend />
  </div>

  <div className="w-full mt-4 lg:hidden">
    <CalendarView />
  </div>
</section>


  );
};

export default DashboardPage;
