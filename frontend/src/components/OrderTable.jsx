import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import ModalOrder from "./ModalOrder";
import useHandleTickClick from "../hooks/useHandleTickClick";
import { useAuthStore } from "../store/authStore";
import fire from "../assets/fire.png";
import firered from "../assets/firered.png"
import tick from "../assets/tick.png";
import locker from "../assets/lock2.png";
import exclamation from "../assets/exclamation2.png";
import exclamationOff from "../assets/exclamationOff.png"

const OrderTable = () => {
  const { fetchOrders, deleteOrder, updateOrder, orders, isLoading, error } =
    useAuthStore();
  const [lockStatus, setLockStatus] = useState({});
  const [prioStatus, setPrioStatus] = useState({});
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

  const {
    updatedOrders: notebookOrders,
    handleTickClick: handleNotebookTickClick,
  } = useHandleTickClick("notebookStatus", "orderNotebookCount");

  const {
    updatedOrders: systemOrders,
    handleTickClick: handleSystemTickClick,
  } = useHandleTickClick("systemStatus", "orderSystemCount");
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
    <div className="max-h-[26rem] lg:max-h-[48rem] w-full lg:w-1/2 overflow-y-auto scrollbar-hide mt-24 lg:mt-0">
      <ModalOrder />
      <div className="border-2 border-white shadow-md scrollbar-hide">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : orders && orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => {
              const isLocked =
                lockStatus[order.orderNumber] ?? order.orderLockStatus;
              console.log(order.orderNumber, isLocked);

              const isPrio = prioStatus[order.orderNumber] ?? order.orderPrio;
              console.log(order.orderNumber, isPrio, "Prio");

              const isDeadline =
                deadlineStatus[order.orderNumber] ?? order.orderDeadline;
              console.log(order.orderNumber, isDeadline, "Deadline");

              const notebookTickVisible =
                notebookOrders[order.orderNumber]?.notebookStatusTickVisible ||
                false;
              const notebookStatus =
                notebookOrders[order.orderNumber]?.notebookStatus ||
                order.orderNotebookCount;

              const systemTickVisible =
                systemOrders[order.orderNumber]?.systemStatusTickVisible ||
                false;
              const systemStatus =
                systemOrders[order.orderNumber]?.systemStatus ||
                order.orderSystemCount;

              return (

                <motion.div
                  key={order.orderNumber}
                  layout
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div
                    className={`flex flex-col 2xl:flex-row lg:flex-row md:flex-col w-full mx-auto border-2 p-4 ${isDeadline ? "border-red-500 border-4" : "border-white"}  ${
                      isLocked ? "bg-slate-400" : "bg-white"
                    }`}
                  >
                    {/* Order Deadline */}
                    <span className="font-bold mr-1 lg:hidden">Deadline:</span>
                    <motion.div
                      className="flex-1 mr-4 lg:mr-0 cursor-pointer mb-2 lg:mb-0"
                      whileHover={{ scale: 1.2 }}
                      onClick={() =>
                        handleDeadlineChange(order.orderNumber, isDeadline)
                      }
                    >
                      {isDeadline === true ? <img src={exclamation} className="flex" /> : <img src={exclamationOff} className="flex" />}
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
                      <span className="font-bold flex-1 lg:hidden">
                        Order Status:
                      </span>{" "}
                      {order.orderStatus}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex-1 mb-4 lg:mb-0 ml-16 lg:mx-auto cursor-pointer"
                        onClick={() =>
                          handleLockStatusChange(order.orderNumber, isLocked)
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
                        {notebookStatus}/{systemStatus}
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
                      <span className="flex font-bold lg:hidden">Notebook:</span>
                      <div
                        onClick={() =>
                          handleNotebookTickClick(
                            order.orderNumber,
                            order.orderNotebookCount
                          )
                        }
                        className={`mx-1 lg:mx-2 border-2 border-black w-8 h-8 rounded-lg cursor-pointer ${
                          notebookTickVisible ? "bg-white" : "bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {notebookTickVisible && (
                          <img src={tick} alt="tick" className="w-6 h-6" />
                        )}
                      </div>
                      <span className="flex font-bold lg:hidden">System:</span>
                      <div
                        onClick={() =>
                          handleSystemTickClick(
                            order.orderNumber,
                            order.orderSystemCount
                          )
                        }
                        className={`border-2 border-black w-8 h-8 rounded-lg cursor-pointer ${
                          systemTickVisible ? "bg-white" : "bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {systemTickVisible && (
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
                        handlePrioStatusChange(order.orderNumber, isPrio)
                      }
                    >
                      {isPrio === true ? <img src={fire} className="hidden lg:flex" /> : <img src={firered} className="hidden lg:flex" />}
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
