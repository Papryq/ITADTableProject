import ModalOrder from "../components/ModalOrder";
import OrderTable from "../components/OrderTable";
import minion from "../assets/auraminon.png"

const DashboardPage = () => {
  return (
    <div className="w-full mx-32">
      <ModalOrder />
      <div className="flex justify-between">
        <OrderTable />
        <div className=" bg-slate-50 rounded-2xl border-2 border-slate-400 shadow-2xl shadow-teal-400 mt-32 max-h-[32rem] z-10">
          <div className="w-[48rem] h-[16rem]"></div>
        </div>
          <img src={minion} className="fixed bottom-[44rem] left-[80rem] z-1"/>
      </div>
    </div>
  );
};

export default DashboardPage;
