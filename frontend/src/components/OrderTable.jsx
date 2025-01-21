import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import ModalOrder from "./ModalOrder";
import { useAuthStore } from "../store/authStore";
import fire from "../assets/fire.png";
import firered from "../assets/firered.png";
import tick from "../assets/tick.png";
import locker from "../assets/lock2.png";
import exclamation from "../assets/exclamation2.png";
import exclamationOff from "../assets/exclamationOff.png";

const OrderTable = () => {
  const { fetchOrders, deleteOrder, updateOrder, orders, isLoading, error } =
    useAuthStore();
  const [lockStatus, setLockStatus] = useState({});
  const [prioStatus, setPrioStatus] = useState({});
  const [orderNotebookStatus, setOrderNotebookStatus] = useState({});
  const [orderSystemStatus, setOrderSystemStatus] = useState({});
  const [deadlineStatus, setDeadlineStatus] = useState({});

  const handleLockStatusChange = async (orderNumber, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { orderLockStatus: newStatus });
      setLockStatus((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
      console.log("Change color to");
    } catch (error) {
      console.log("Failed to update lockStatus", error);
    }
  };

  const handlePrioStatusChange = async (orderNumber, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { orderPrio: newStatus });
      setPrioStatus((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
      console.log("Prio Status Changed");
    } catch (error) {
      console.log("Failed to update prioStatus");
    }
  };

  const handleDeadlineChange = async (orderNumber, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { orderDeadline: newStatus });
      setDeadlineStatus((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
      console.log("Deadline Status Changed");
    } catch (error) {
      console.log("Failed to update DeadlineStatus");
    }
  };

  const handleNotebookStatusChange = async (orderNumber, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { orderNotebookStatus: newStatus });
      setOrderNotebookStatus((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
    } catch (error) {
      console.log("Failed to change NotebookStatus");
    }
  };

  const handleSystemStatusChange = async (orderNumber, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { orderSystemStatus: newStatus });
      setOrderSystemStatus((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
    } catch (error) {
      console.log("Failed to change SystemStatus");
    }
  };

  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderNumber) => {
    await deleteOrder(orderNumber);
    fetchOrders();
    console.log(`Deleted order: ${orderNumber}`);
  };

  return (
    <div className="max-h-[26rem] lg:max-h-[48rem] w-full lg:w-3/4 overflow-y-auto scrollbar-hide mt-24 lg:mt-0 z-1 p-0 lg:p-4 lg:bg-teal-100 rounded-2xl shadow-2xl">
      <ModalOrder />
      <div className="border-2 border-black shadow-xl scrollbar-hide ">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : orders && orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => {

              const isIndexEven = index % 2 === 0 ? true : false

              const isItemFirst = index === 0 ? true : false

              const lockStatusChange =
                lockStatus[order.orderNumber] ?? order.orderLockStatus;

              const prioStatusChange =
                prioStatus[order.orderNumber] ?? order.orderPrio;

              const deadlineStatusChange =
                deadlineStatus[order.orderNumber] ?? order.orderDeadline;

              const notebookStatusChange =
                orderNotebookStatus[order.orderNumber] ??
                order.orderNotebookStatus;
              console.log(
                order.orderNumber,
                notebookStatusChange,
                "Notebook status"
              );

              const systemStatusChange =
                orderSystemStatus[order.orderNumber] ?? order.orderSystemStatus;

              return (
                <motion.div
                  key={order.orderNumber}
                  layout
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div
                    className={`flex flex-col 2xl:flex-row lg:flex-row md:flex-col border-black w-full mx-auto p-4 ${isItemFirst === false ? "border-t-2" : ""}
                    }  ${lockStatusChange ? "bg-slate-400" : "bg-white"} ${isIndexEven === false ? "bg-white" : "bg-teal-200"}`
                  }
                  >
                    {/* Order Deadline */}
                    <motion.div
                      className="flex lg:flex-1 mr-4 lg:mr-0 cursor-pointer mb-2 lg:mb-0"
                      whileHover={{ scale: 1.2 }}
                      onClick={() =>
                        handleDeadlineChange(
                          order.orderNumber,
                          deadlineStatusChange
                        )
                      }
                    >
                      <span className="font-bold mr-1 lg:hidden">
                        Deadline:
                      </span>
                      {deadlineStatusChange === true ? (
                        <img src={exclamation} className="flex w-7 h-7" />
                      ) : (
                        <img src={exclamationOff} className="flex w-7 h-7" />
                      )}
                    </motion.div>

                    {/* Order Number */}
                    <div className="flex-1 mb-1 md:mb-0 gap-1">
                      <span className="font-bold flex-1 lg:hidden">
                        Order number:{" "}
                      </span>{" "}
                      {order.orderNumber}
                    </div>

                    {/* Kolumna dla Status */}
                    <div className="flex mb-1 md:mb-0 gap-1  lg:mr-8">
                      <span className="font-bold flex lg:hidden">
                        Order Status:
                      </span>{" "}
                      {order.orderStatus}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex-1 mb-4 lg:mb-0 ml-16 lg:mx-auto cursor-pointer"
                        onClick={() =>
                          handleLockStatusChange(
                            order.orderNumber,
                            lockStatusChange
                          )
                        }
                      >
                        <img src={locker} className="flex-1 lg:flex" />
                      </motion.div>
                    </div>

                    {/* Kolumna dla Notebook Status */}
                    <div className="flex-1 mb-2 md:mb-0 -p-2">
                      <span className="font-bold mr-1 flex-1 lg:hidden">
                        Amounts:
                      </span>
                      <span className="p-2 bg-green-500 rounded-lg font-bold">
                        {notebookStatusChange === false
                          ? order.orderNotebookCount
                          : "Finished"}
                        /
                        {systemStatusChange === false
                          ? order.orderSystemCount
                          : "Finished"}
                      </span>
                    </div>

                    {/* Expires Date */}
                    <div className="flex-1 mb-1 md:mb-0 gap-1 mx-0 lg:mx-2">
                      <span className="font-bold flex-1 lg:hidden">
                        Expire Date:
                      </span>{" "}
                      {formatDate(order.orderDateExpiresAt)}
                    </div>

                    {/* Kolumna dla Tick Click */}
                    <div className="flex lg:flex-1 mb-1 md:mb-0 items-start justify-start lg:items-center lg:justify-center">
                      <span className="flex font-bold lg:hidden">
                        Notebook:
                      </span>
                      <div
                        onClick={() =>
                          handleNotebookStatusChange(
                            order.orderNumber,
                            notebookStatusChange
                          )
                        }
                        className={`mx-1 lg:mx-2 border-2 border-black w-6 h-6 rounded-md cursor-pointer ${
                          notebookStatusChange
                            ? "border-none"
                            : "bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {notebookStatusChange === true ? (
                          <img src={tick} alt="tick" className="w-6 h-6" />
                        ) : (
                          ""
                        )}
                      </div>
                      <span className="flex font-bold lg:hidden">System:</span>
                      <div
                        onClick={() =>
                          handleSystemStatusChange(
                            order.orderNumber,
                            systemStatusChange
                          )
                        }
                        className={`border-2 border-black w-6 h-6 rounded-md cursor-pointer ${
                          systemStatusChange ? "border-none" : "bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {systemStatusChange === true && (
                          <img src={tick} alt="tick" className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    {/* Select */}
                    <div className="flex-1 mb-2 md:mb-0 flex items-start justify-start lg:items-center lg:justify-center gap-1">
                      <span className="font-bold flex lg:hidden">
                        Operator:
                      </span>
                      <select
                        id="options"
                        className="border-2 border-black p-1 rounded-lg mb-1 lg:mb-0"
                      >
                        <option>--</option>
                        <option value="abc">ABC</option>
                        <option value="xyz">XYZ</option>
                      </select>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onClick={() =>
                        handlePrioStatusChange(
                          order.orderNumber,
                          prioStatusChange
                        )
                      }
                    >
                      {prioStatusChange === true ? (
                        <img src={fire} className="hidden lg:flex" />
                      ) : (
                        <img src={firered} className="hidden lg:flex" />
                      )}
                    </motion.div>
                    <div>
                      <span className="flex-1 lg:hidden font-bold">
                        Delete order:
                      </span>
                      <button
                        onClick={() => handleDelete(order.orderNumber)}
                        className="bg-red-500 px-2 rounded-lg mb-0 lg:mb-2 hover:scale-105 transition transform ml-4 text-white mx-auto"
                      >
                        X
                      </button>
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
