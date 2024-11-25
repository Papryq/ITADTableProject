import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

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
    <div className="max-h-[52rem] overflow-y-auto border-2 border-gray-300 rounded-lg shadow-md scrollbar-hide">
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
                <table className="table-auto bg-white w-full mx-auto border-2 border-black">
                  <tbody>
                    <tr>
                      <td className="py-4 px-8">
                        <button className="border-2 border-black w-8 h-8 rounded-lg" />
                      </td>
                      <td>
                        <img src={fire} className="w-8 h-8 " />
                      </td>
                      <td className="py-4 pr-4">{order.orderNumber}</td>
                      <td className="py-4 px-16">{order.orderStatus}</td>
                      <td className="py-4 px-8">
                        <span className="bg-green-500 p-2 rounded-lg text-white shadow-xl">
                          {notebookStatus}/{order.orderSystemCount}
                        </span>
                      </td>
                      <td className="py-4 px-8">
                        {formatDate(order.orderDateExpiresAt)}
                      </td>
                      <td className="pl-6 pr-2">
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
                      </td>
                      <td>
                        <img
                          src={tick}
                          className="border-2 border-black w-8 h-8 rounded-lg"
                        />
                      </td>
                      <td className="py-4 pl-4 pr-16">
                        <select id="options">
                          <option>--</option>
                          <option value="abc">ABC</option>
                          <option value="xyz">XYZ</option>
                        </select>
                      </td>
                      <td>
                        <img src={fire} className="w-8 h-8" />
                      </td>
                      <td>
                        <img src={fire} className="w-8 h-8" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            );
          })}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default OrderTable;
