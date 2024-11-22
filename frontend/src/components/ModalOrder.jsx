import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { motion } from "framer-motion";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useAuthStore } from "../store/authStore.js";
import { Mail } from "lucide-react";
import Input from "./Input.jsx";

const ModalOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNotebookCount, setOrderNotebookCount] = useState("");
  const [orderSystemCount, setOrderSystemCount] = useState("");
  const [orderDateExpiresAt, setOrderDateExpiresAt] = useState(null);
  const [orderPrio, setOrderPrio] = useState(false);
  const [orderOperator, setOrderOperator] = useState("");

  const { addOrder, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    try {
      await addOrder(
        orderNumber,
        orderNotebookCount,
        orderSystemCount,
        orderDateExpiresAt,
        orderPrio,
        orderOperator
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      {/* Przycisk otwierający modal */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        onClick={toggleModal}
        className="px-2 rounded-full text-2xl text-black hover:text-white"
      >
        +
      </motion.button>
    

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-slate-50 from-40% via-slame-400 to-teal-400 rounded-lg max-w-md w-full p-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Add new order</h2>
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
                icon={Mail}
                type="text"
                placeholder="Order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />

              <div className="flex">
                <Input
                  icon={Mail}
                  type="text"
                  placeholder="Notebook count"
                  value={orderNotebookCount}
                  onChange={(e) => setOrderNotebookCount(e.target.value)}
                />

                <div className="w-8 max-md:invisible"></div>

                <Input
                  icon={Mail}
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

              {/* Przyciski */}
              <div className="flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="px-3 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400"
                >
                  Dodaj
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ModalOrder;
