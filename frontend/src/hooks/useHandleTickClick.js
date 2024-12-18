import { useState } from "react";

const useHandleTickClick = (statusKey, countKey) => {
  const [updatedOrders, setUpdatedOrders] = useState({});

  const handleTickClick = (orderNumber, defaultValue) => {
    setUpdatedOrders((prev) => {
      const isTickCurrentlyVisible = prev[orderNumber]?.[`${statusKey}TickVisible`] || false;

      return {
        ...prev,
        [orderNumber]: {
          ...prev[orderNumber],
          [`${statusKey}TickVisible`]: !isTickCurrentlyVisible,
          [statusKey]: isTickCurrentlyVisible ? defaultValue : "Finished",
        },
      };
    });
  };

  return { updatedOrders, handleTickClick };
};

export default useHandleTickClick;
