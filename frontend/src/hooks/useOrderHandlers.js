import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const useOrderHandlers = () => {
  const { updateOrder, deleteOrder, fetchOrders } = useAuthStore();

  // Lokalny stan dla statusów
  const [lockStatus, setLockStatus] = useState({});
  const [prioStatus, setPrioStatus] = useState({});
  const [orderNotebookStatus, setOrderNotebookStatus] = useState({});
  const [orderSystemStatus, setOrderSystemStatus] = useState({});
  const [operator, setOperator] = useState({});
  const [deadlineStatus, setDeadlineStatus] = useState({});

  const handleStatusChange = async (
    orderNumber,
    currentStatus,
    field,
    setter
  ) => {
    try {
      const newStatus = !currentStatus;
      await updateOrder(orderNumber, { [field]: newStatus });
      setter((prev) => ({
        ...prev,
        [orderNumber]: newStatus,
      }));
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleLockStatusChange = (orderNumber, currentStatus) =>
    handleStatusChange(
      orderNumber,
      currentStatus,
      "orderLockStatus",
      setLockStatus
    );

  const handlePrioStatusChange = (orderNumber, currentStatus) =>
    handleStatusChange(orderNumber, currentStatus, "orderPrio", setPrioStatus);

  const handleDeadlineChange = (orderNumber, currentStatus) =>
    handleStatusChange(
      orderNumber,
      currentStatus,
      "orderDeadline",
      setDeadlineStatus
    );

  const handleNotebookStatusChange = (orderNumber, currentStatus) =>
    handleStatusChange(
      orderNumber,
      currentStatus,
      "orderNotebookStatus",
      setOrderNotebookStatus
    );

  const handleSystemStatusChange = (orderNumber, currentStatus) =>
    handleStatusChange(
      orderNumber,
      currentStatus,
      "orderSystemStatus",
      setOrderSystemStatus
    );

  const handleOperatorChange = async (orderNumber, currentOperator) => {
    try {
      await updateOrder(orderNumber, { orderOperator: currentOperator });
      setOperator((prev) => ({
        ...prev,
        [orderNumber]: currentOperator,
      }));
    } catch (error) {
      console.error("Failed to change operator:", error);
    }
  };

  const handleDeleteOrder = async (orderNumber) => {
    try {
      await deleteOrder(orderNumber);
      await fetchOrders();
      console.log(`Order ${orderNumber} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return {
    lockStatus,
    prioStatus,
    orderNotebookStatus,
    orderSystemStatus,
    operator,
    deadlineStatus,
    handleLockStatusChange,
    handlePrioStatusChange,
    handleDeadlineChange,
    handleNotebookStatusChange,
    handleSystemStatusChange,
    handleOperatorChange,
    handleDeleteOrder,
  };
};

export default useOrderHandlers;