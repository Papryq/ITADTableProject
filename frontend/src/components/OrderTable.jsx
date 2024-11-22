import { useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { useAuthStore } from "../store/authStore";
import fire from "../assets/fire.png";
import tick from "../assets/tick.png";

const OrderTable = () => {
  const { fetchOrders, orders, isLoading, error } = useAuthStore();

  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : orders && orders.length > 0 ? ( // Upewnij się, że orders nie jest pustą tablicą
        <ul>
          {orders.map((order, index) => (
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
                      <button className="border-2 border-black w-8 h-8 rounded-lg" />{" "}
                    </td>
                    <td>
                      <img src={fire} className="w-8 h-8 " />
                    </td>
                    <td className="py-4 pr-4">{order.orderNumber}</td>
                    <td className="py-4 px-16">{order.orderStatus}</td>
                    <td className="py-4 px-8">
                      <span className="bg-green-500 p-2 rounded-lg text-white shadow-xl">
                        {order.orderNotebookCount}/{order.orderSystemCount}
                      </span>
                    </td>
                    <td className="py-4 px-8">
                      {formatDate(order.orderDateExpiresAt)}
                    </td>
                    <td className="pl-6 pr-2">
                      <img
                        src={tick}
                        className="border-2 border-black w-8 h-8 rounded-lg"
                      />
                    </td>
                    <td className="">
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
          ))}
        </ul>
      ) : (
        <p>No orders available.</p> // Jeśli orders jest pustą tablicą
      )}
    </div>
  );
};

export default OrderTable;
