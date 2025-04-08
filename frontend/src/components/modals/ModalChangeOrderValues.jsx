import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Skull, PcCase, Hash } from "lucide-react";

import { useAuthStore } from "../../store/authStore.js";

import Input from "../Input.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import notes from "../../../public/notes.png";

const ChangeOrderModal = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(order?.orderNumber || "");
  const [orderNotebookCount, setOrderNotebookCount] = useState(
    order?.orderNotebookCount || ""
  );
  const [orderSystemCount, setOrderSystemCount] = useState(
    order?.orderSystemCount || ""
  );
  const [orderDateExpiresAt, setOrderDateExpiresAt] = useState(
    order?.orderDateExpiresAt || null
  );

  const { updateOrder, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (order) {
      setOrderNumber(order.orderNumber);
      setOrderNotebookCount(order.orderNotebookCount);
      setOrderSystemCount(order.orderSystemCount);
      setOrderDateExpiresAt(
        order.orderDateExpiresAt ? dayjs(order.orderDateExpiresAt) : null
      );
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedDate = orderDateExpiresAt
        ? dayjs(orderDateExpiresAt).format("YYYY-MM-DD").toString() // Changes to "YYYY-MM-DD"
        : "";

      console.log("Order Date Expires At:", formattedDate);

      await updateOrder(
        orderNumber,
        orderNotebookCount,
        orderSystemCount,
        formattedDate
      );

      console.log("Updated Order", {
        orderNumber,
        orderNotebookCount,
        orderSystemCount,
        formattedDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.2 }}
        onClick={toggleModal}
        className="lg:mr-8"
      >
        <img src={notes} alt="Image for changing values in selected order" />
      </motion.button>

      {/* Modal */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-r from-slate-50 from-40% via-slame-400 to-teal-400 rounded-lg max-w-md w-full p-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Add new order
                </h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                  ×
                </motion.button>
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  icon={Hash}
                  type="text"
                  placeholder="Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />

                <div className="flex">
                  <Input
                    icon={Skull}
                    type="text"
                    placeholder="Notebook count"
                    value={orderNotebookCount}
                    onChange={(e) => setOrderNotebookCount(e.target.value)}
                  />

                  <div className="w-8 max-md:invisible"></div>

                  <Input
                    icon={PcCase}
                    type="text"
                    placeholder="System count"
                    value={orderSystemCount}
                    onChange={(e) => setOrderSystemCount(e.target.value)}
                  />
                </div>

                <div className="mb-8">
                  <DesktopDatePicker
                    label="Controlled picker"
                    value={orderDateExpiresAt}
                    onChange={(value) => setOrderDateExpiresAt(value)}
                    inputFormat="DD/MM/YYYY"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="px-3 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400"
                  >
                    {isLoading ? <LoadingSpinner /> : "Change Order"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )
      )}
    </div>
  );
};

export default ChangeOrderModal;
