import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { useAuthStore } from "../../store/authStore.js";

const ModalDeleteOrder = ({ orderNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteOrder, fetchOrders , isLoading, error } = useAuthStore();

  const submitDeleteOrder = async () => {
    try {
      await deleteOrder(orderNumber);
      await fetchOrders(); // 🔄 Odśwież listę po usunięciu
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={toggleModal}
        className="relative px-2 rounded-full text-md text-black hover:text-white bg-red-500"
      >
        x
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
            <div className="flex justify-center items-center mb-4  rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-slate-500">
                Are you sure you want to delete this order?
              </h2>
            </div>

            <div className="flex justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                onClick={submitDeleteOrder}
                className="px-3 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400 hover:text-red-400 hover:border-red-500"
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Delete"
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                onClick={toggleModal}
                className="px-3 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400"
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Cancel"
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ModalDeleteOrder;
