import ModalOrder from "../components/ModalOrder";
import OrderTable from "../components/OrderTable";

const DashboardPage = () => {
  return (
    <div>
      <ModalOrder />
      <div className="flex justify-between">
        <OrderTable />
        <div>123</div>
      </div>
    </div>
  );
};

export default DashboardPage;
