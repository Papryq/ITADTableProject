import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Mail } from "lucide-react";
import { useAuthStore } from "../store/authStore";

import Input from "./Input";
import useOrderHandlers from "../hooks/useOrderHandlers";

const ModalAddNoteCalendar = ({ orderNumber }) => {
  const [orderNote, setOrderNote] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, orders, fetchOrders } = useAuthStore();
  const { handleOrderNoteChange } = useOrderHandlers({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony
  
    if (!selectedOrder || !orderNote.trim()) {
      console.log("Order or note is missing");
      return;
    }
  
    try {
      await handleOrderNoteChange(selectedOrder, orderNote);
      setOrderNote(""); 
      setSelectedOrder("");
      toggleModal();
      fetchOrders();
    } catch (error) {
      console.log("Couldn't add order note", error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-end mb-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={toggleModal}
        className="relative px-2 bg-gray-400 bg-opacity-30 shadow-2xl rounded-md text-md text-white hover:text-white"
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
              <h2 className="text-lg font-semibold text-slate-500"></h2>
            </div>

            <form onSubmit={handleSubmit}>
              <select
                defaultValue="defaultValue"
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="p-2 mb-8 rounded-lg border-2 b-gray-500 text-gray-600"
              >
                <option value="defaultValue" disabled>
                  Choose order...
                </option>
                {orders.map((order, index) => (
                  <option
                    className="hover:bg-teal-400"
                    key={index}
                    value={order.orderNumber}
                  >
                    {order.orderNumber}
                  </option>
                ))}
              </select>
              <Input
                icon={Mail}
                type="text"
                placeholder="Add note..."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
              />
              <div className="flex justify-between px-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="px-6 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400 hover:text-green-400 hover:border-green-500 hover:shadow-green-500/50"
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin mx-auto" />
                  ) : (
                    "Add"
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={toggleModal}
                  className="px-3 py-2 bg-white text-teal-500 rounded-lg shadow-xl border-2 border-teal-400 hover:text-red-400 hover:border-red-500 hover:shadow-red-500/50"
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin mx-auto" />
                  ) : (
                    "Cancel"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ModalAddNoteCalendar;
