import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import ModalOrder from "./ModalOrder";
import { useAuthStore } from "../store/authStore";
import fire from "../assets/fire.png";
import tick from "../assets/tick.png";

const OrderTable = () => {
  const { fetchOrders, orders, isLoading, error } = useAuthStore();

  const [updatedOrders, setUpdatedOrders] = useState({});

  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleTickClick = (orderNumber, originalNotebookCount) => {
    setUpdatedOrders((prev) => {
      const isTickCurrentlyVisible = prev[orderNumber]?.isTickVisible || false;

      return {
        ...prev,
        [orderNumber]: {
          isTickVisible: !isTickCurrentlyVisible,
          notebookStatus: isTickCurrentlyVisible
            ? originalNotebookCount // Powrót do dynamicznej wartości
            : "Finished", // Ustawienie na "Finished" po kliknięciu
        },
      };
    });
  };

  return (
    <div className="max-h-[26rem] lg:max-h-[48rem] w-full lg:w-1/2 overflow-y-auto scrollbar-hide mt-24 lg:mt-0">
      <ModalOrder />
      <div className="border-2 border-gray-300 rounded-lg shadow-md scrollbar-hide">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : orders && orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => {
              const isTickVisible =
                updatedOrders[order.orderNumber]?.isTickVisible || false;
              const notebookStatus =
                updatedOrders[order.orderNumber]?.notebookStatus ||
                order.orderNotebookCount;

              return (
                <motion.div
                  key={order.orderNumber}
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="flex flex-col 2xl:flex-row lg:flex-row md:flex-col bg-white w-full mx-auto border-2 border-slate-200 p-4">
                    {/* Kolumna dla Order Number */}
                    <div className="flex-1 mb-1 md:mb-0 gap-1">
                      <span className="font-bold flex lg:hidden">Order number: </span> {order.orderNumber}
                    </div>

                    <div>
                      <img src={fire} className="hidden lg:flex"/>
                    </div>

                    {/* Kolumna dla Status */}
                    <div className="flex-1 mb-1 md:mb-0 gap-1">
                      <span className="font-bold flex lg:hidden">Order Status:</span> {order.orderStatus}
                    </div>

                    {/* Kolumna dla Notebook Status */}
                    <div className="flex-1 mb-1 md:mb-0 -p-2">
                      <span className="font-bold mr-1 flex lg:hidden">Amounts:</span>
                      <span className="p-2 bg-green-500 rounded-lg font-bold">
                        {notebookStatus}/{order.orderSystemCount}
                      </span>
                    </div>

                    {/* Kolumna dla Expires */}
                    <div className="flex-1 mb-1 md:mb-0 gap-1">
                      <span className="font-bold flex lg:hidden">Expire Date:</span>{" "}
                      {formatDate(order.orderDateExpiresAt)}
                    </div>

                    {/* Kolumna dla Tick Click */}
                    <div className="flex lg:flex-1 mb-1 md:mb-0 items-start justify-start lg:items-center lg:justify-center">
                      <div
                        onClick={() =>
                          handleTickClick(
                            order.orderNumber,
                            order.orderNotebookCount
                          )
                        }
                        className={`border-2 border-black w-8 h-8 rounded-lg cursor-pointer ${
                          isTickVisible ? "bg-white" : "bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {isTickVisible && (
                          <img src={tick} alt="tick" className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    {/* Kolumna dla Select */}
                    <div className="flex-1 mb-2 md:mb-0 flex items-start justify-start lg:items-center lg:justify-center gap-1">
                      <span className="font-bold flex lg:hidden">Operator:</span>
                      <select
                        id="options"
                        className="border-2 border-black p-1 rounded-lg"
                      >
                        <option>--</option>
                        <option value="abc">ABC</option>
                        <option value="xyz">XYZ</option>
                      </select>
                    </div>
                    <div>
                      <img src={fire} className="hidden lg:flex" />
                    </div>
                    <div>
                      <img src={fire} className="hidden lg:flex" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </ul>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
