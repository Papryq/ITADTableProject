import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import Input from "./Input.jsx";
import { Mail } from "lucide-react";

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
      <button
        onClick={toggleModal}
        className="px-2 py-1 mb-2 rounded-full text-3xl text-black"
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add new order</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
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
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Wyślij
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalOrder;
