import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

import fire from "../assets/fire.png";
import ModalOrder from "../components/ModalOrder";
import OrderTable from "../components/OrderTable";

const DashboardPage = () => {
  const { fetchOrders, orders, isLoading, error } = useAuthStore();


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
