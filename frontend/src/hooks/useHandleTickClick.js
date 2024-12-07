import { useState } from "react";

const useHandleTickClick = (statusKey, countKey) => {
  const [updatedOrders, setUpdatedOrders] = useState({});

  const handleTickClick = (orderNumber, defaultCount) => {
    setUpdatedOrders((prev) => {
      const isTickCurrentlyVisible = prev[orderNumber]?.[`${statusKey}TickVisible`] || false;

      return {
        ...prev,
        [orderNumber]: {
          ...prev[orderNumber],
          [`${statusKey}TickVisible`]: !isTickCurrentlyVisible,
          [statusKey]: isTickCurrentlyVisible ? defaultCount : "Finished",
        },
      };
    });
  };

  return { updatedOrders, handleTickClick };
};

export default useHandleTickClick;
