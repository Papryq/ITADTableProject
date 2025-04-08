import React from "react";
import { motion } from "framer-motion";

import { formatDate } from "../../utils/formatDate";
import { getLockImage, getPrioImage } from "../../utils/imageUtils";

import ModalChangeOrderValues from "../modals/ModalChangeOrderValues";
import ModalDeleteOrder from "../modals/ModalDeleteOrder";

const OrderRow = () => {
  const isIndexEven = index % 2 === 0;
  const isItemFirst = index === 0;

  return (
    <motion.div
      key={order.orderNumber}
      layout
      initial={{ opacity: 0, x: -120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
    >
      <div
        className={`flex flex-col 2xl:flex-row lg:flex-row md:flex-col border-black w-full mx-auto p-4 
        ${isItemFirst ? "" : "border-t-2"}
        ${isIndexEven ? "bg-teal-200" : "bg-white"}
      `}
      >
        {/* Edit Order */}
        <div
          onClick={() => handleClick(order)}
          className="flex gap-2 font-bold"
        >
          <span className=" lg:hidden">Change order values: </span>
          <ModalChangeOrderValues
            order={selectedOrder}
            closeModal={closeModal}
          />
        </div>
        {/* Order Deadline Column */}
        <motion.div
          className="flex lg:flex-1 mr-4 lg:mr-0 cursor-pointer mb-2 lg:mb-0"
          whileHover={{ scale: 1.05 }}
          onClick={() =>
            handleDeadlineChange(order.orderNumber, deadlineStatusChange)
          }
        >
          <span className="font-bold mr-1 lg:hidden">Deadline:</span>
          {deadlineStatusChange ? (
            <img src={exclamation} className="flex w-7 h-7" />
          ) : (
            <img src={exclamationOff} className="flex w-7 h-7" />
          )}
        </motion.div>

        {/* Order Number Column */}
        <div className="flex-1 mb-1 md:mb-0 gap-1 font-bold">
          <span className="flex-1 lg:hidden">Order number: </span>
          {order.orderNumber}
        </div>

        {/* Status Column */}
        <div className="flex md:mb-0 gap-1 lg:mr-12 lg:pb-2 lg:py-0">
          <span className="font-bold flex lg:hidden">Order Status:</span>{" "}
          {order.orderStatus}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex-1 mb-4 lg:mb-0 lg:mx-auto cursor-pointer"
            onClick={() =>
              handleLockStatusChange(order.orderNumber, lockStatusChange)
            }
          >
            <img
              src={getLockImage(lockStatusChange)}
              className="flex-1 lg:flex"
            />
          </motion.div>
        </div>

        {/* Amounts Column */}
        <div className="flex-1 mb-2 md:mb-0 pb-1 lg:-p-2">
          <span className="font-bold mr-1 flex-1 lg:hidden">Amounts:</span>
          <span className="pb-1 lg:p-2 bg-green-500 rounded-lg font-semibold">
            {notebookStatusChange === false ? order.orderNotebookCount : "✓"} /
            {systemStatusChange === false ? order.orderSystemCount : "✓"}
          </span>
        </div>

        {/* Expiry Date Column */}
        <div className="flex-1 mb-1 md:mb-0 gap-1 mx-0 lg:mx-2 font-bold">
          <span className="flex-1 lg:hidden">Expire Date:</span>
          {formatDate(order.orderDateExpiresAt)}
        </div>

        {/* Notebook & System Status */}
        <div className="flex lg:flex-1 mb-1 md:mb-0 items-start justify-start lg:items-center lg:justify-center">
          <span className="flex font-bold lg:hidden">Notebook:</span>
          <div
            onClick={() =>
              handleNotebookStatusChange(
                order.orderNumber,
                notebookStatusChange
              )
            }
            className={`mx-1 border-2 border-black w-6 h-6 rounded-md cursor-pointer ${
              notebookStatusChange ? "border-none" : "bg-transparent"
            } flex items-center justify-center`}
          >
            {notebookStatusChange && (
              <img src={tick} alt="tick" className="w-6 h-6" />
            )}
          </div>
          <span className="mx-1 flex font-bold lg:hidden">System:</span>
          <div
            onClick={() =>
              handleSystemStatusChange(order.orderNumber, systemStatusChange)
            }
            className={`border-2 border-black w-6 h-6 rounded-md cursor-pointer ${
              systemStatusChange ? "border-none" : "bg-transparent"
            } flex items-center justify-center`}
          >
            {systemStatusChange && (
              <img src={tick} alt="tick" className="w-6 h-6" />
            )}
          </div>
        </div>

        {/* Operator Select Column */}
        <div className="flex-1 mb-2 md:mb-0 flex items-start justify-start lg:items-center lg:justify-center gap-1">
          <span className="font-bold flex lg:hidden">Operator:</span>
          <select
            value={operator[order.orderNumber] ?? order.orderOperator ?? ""}
            onChange={(e) =>
              handleOperatorChange(order.orderNumber, e.target.value)
            }
            id="options"
            className="border-2 border-black p-1 rounded-lg mb-1 lg:mb-0"
          >
            <option>--</option>
            <option value="Patryk">Patryk</option>
            <option value="Rafal">Rafal</option>
            <option value="Bartek">Bartek</option>
            <option value="Piotr">Piotr</option>
            <option value="Jarek">Jarek</option>
          </select>
        </div>

        {/* Priority Status */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() =>
            handlePrioStatusChange(order.orderNumber, prioStatusChange)
          }
        >
          <img
            src={getPrioImage(prioStatusChange)}
            className="hidden lg:flex lg:pr-8 pr-0 cursor-pointer"
          />
        </motion.div>

        {/* Delete Order */}
        <div className="flex">
          <span className="flex lg:hidden font-bold mr-1">Delete order:</span>
          <ModalDeleteOrder orderNumber={order.orderNumber} />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderRow;
