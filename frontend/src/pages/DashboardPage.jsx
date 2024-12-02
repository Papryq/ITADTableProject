import OrderTable from "../components/OrderTable";
import minion from "../assets/auraminon.png";

const DashboardPage = () => {
  return (
    <section className="w-full mx-24">
      <div className="flex flex-col lg:flex-row justify-between">
        <OrderTable />
        <div className="flex items-center mt-8 2xl:mt-32 2xl:mx-16 xl:mx-12 mx-8 px-8 mb-8 lg:w-1/2 bg-slate-50 rounded-2xl border-2 border-slate-400 shadow-2xl shadow-teal-400 max-h-[32rem] z-10">
          <div className="text-lg lg:text-2xl">
            <div className="p-4">Order status</div>
            <div className="p-4">Order priorority</div>
            <div className="p-4">Amount of notebooks/systems</div>
            <div className="p-4">Date when order has to be gone</div>
            <div className="p-4">Status of Notebooks/PCs</div>
            <div className="p-4">Operator</div>
            <div className="p-4">Level of prio</div>
          </div>
        <img src={minion} className="hidden z-1" />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
