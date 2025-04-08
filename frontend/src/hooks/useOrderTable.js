import { useState, useMemo } from "react";
import dayjs from "dayjs";

// STORE
import { useAuthStore } from "../store/authStore";

// HOOKS
import useOrderHandlers from "./useOrderHandlers";

const useOrderTable = () => {
  const { orders, isLoading, error } = useAuthStore();
  const { 
    lockStatus,
    prioStatus,
    orderNotebookStatus,
    orderSystemStatus,
    deadlineStatus,
    handleLockStatusChange,
    handlePrioStatusChange,
    handleDeadlineChange,
    handleNotebookStatusChange,
    handleSystemStatusChange,
    handleOperatorChange,
  } = useOrderHandlers({});

  // States for sorting
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("orderNumber");
  const [searchTerm, setSearchTerm] = useState("");

  // Sort orders by specific field and direction
  const sortOrders = (orders, sortBy, sortOrder) => {
    const sortedOrders = [...orders];
    return sortedOrders.sort((a, b) => {
      if (sortBy === "orderNumber") {
        return sortOrder === "asc" ? a.orderNumber - b.orderNumber : b.orderNumber - a.orderNumber;
      } else if (sortBy === "orderDateExpiresAt") {
        return sortOrder === "asc"
          ? dayjs(a.orderDateExpiresAt).isBefore(dayjs(b.orderDateExpiresAt))
            ? -1
            : 1
          : dayjs(a.orderDateExpiresAt).isAfter(dayjs(b.orderDateExpiresAt))
          ? -1
          : 1;
      }
      return 0;
    });
  };

  // Filter orders based on search term
  const filterOrders = (orders, searchTerm) => {
    if (!searchTerm) return orders;
    return orders.filter((order) => order.orderNumber.toString().includes(searchTerm));
  };

  // Memoize lock and priority image fetch
  const getLockImage = useMemo(
    () => (lockStatusChange) => lockStatusChange ? "/lock2.png" : "/unlocked.png",
    []
  );

  const getPrioImage = useMemo(
    () => (prioStatusChange) => prioStatusChange ? "/firered.png" : "/fire.png",
    []
  );

  const handleSortByOrderNumber = () => {
    setSortBy("orderNumber");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByDate = () => {
    setSortBy("orderDateExpiresAt");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredOrders = orders ? filterOrders(orders, searchTerm) : [];
  const sortedOrders = orders ? sortOrders(filteredOrders, sortBy, sortOrder) : [];

  return {
    isLoading,
    error,
    sortedOrders,
    sortOrder,
    sortBy,
    searchTerm,
    setSearchTerm,
    handleSortByOrderNumber,
    handleSortByDate,
    getLockImage,
    getPrioImage,
    lockStatus,
    prioStatus,
    deadlineStatus,
    orderNotebookStatus,
    orderSystemStatus,
    handleLockStatusChange,
    handlePrioStatusChange,
    handleDeadlineChange,
    handleNotebookStatusChange,
    handleSystemStatusChange,
    handleOperatorChange,
  };
};

export default useOrderTable;
