import OrderTable from "../components/OrderTable";
import DashboardLegend from "../components/DashboardLegend";

const DashboardPage = () => {
  return (
    <section className="w-full mx-2 lg:mx-24 ">
      <div className="flex flex-col lg:flex-row justify-between">
        <OrderTable />
        <DashboardLegend />
      </div>
    </section>
  );
};

export default DashboardPage;
