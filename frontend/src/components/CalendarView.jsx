import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import dayjs from "dayjs";
import "dayjs/locale/pl"; // Import Polish locale for dayjs

import { useAuthStore } from "../store/authStore"; // Custom hook for fetching orders
import LoadingSpinner from "./LoadingSpinner";
import ModalAddNoteCalendar from "./modals/ModalAddNoteCalendar";

dayjs.locale("pl"); // Set the locale to Polish

const CalendarView = () => {
  // State variables
  const { fetchOrders, orders, isLoading, error } = useAuthStore(); // Fetching orders and handling loading and error states
  const [selectedDate, setSelectedDate] = useState(null); // Store the currently selected date
  const [filteredOrders, setFilteredOrders] = useState([]); // Store orders (z notatkami) for the selected date
  const [ordersForDays, setOrdersForDays] = useState([]); // Store orders for each day in the month

  // State for current displayed month in calendar
  const [calendarDate, setCalendarDate] = useState(dayjs());

  // Function to format the date to a readable string (DD/MM/YYYY)
  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

  // Function to change months
  const handlePrevMonth = () => {
    setCalendarDate((prev) => prev.subtract(1, "month"));
    setSelectedDate(null); // Clears chosen date when month being changed
  };

  const handleNextMonth = () => {
    setCalendarDate((prev) => prev.add(1, "month"));
    setSelectedDate(null); // Clears chosen date when month being changed
  };

  // Get current month and year based on calendarDate
  const currentMonth = calendarDate.format("MMMM"); // Current month in full name
  const capitalizedMonth =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1); // Capitalize the first letter of the month
  const currentYear = calendarDate.year(); // Current year
  const daysInMonth = calendarDate.daysInMonth(); // Total number of days in the current month
  const firstDayOfMonth = calendarDate.startOf("month").day(); // Day of the week the month starts on (0-6)
  const lastDayOfMonth = calendarDate.endOf("month").day(); // Day of the week the month ends on (0-6)
  const extraDays = 7; // Extra days to fill the grid (if the month does not perfectly align)

  // Determine how many days from the previous and next months need to be shown in the calendar
  const daysInPreviousMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
  const daysInNextMonth = lastDayOfMonth === 6 ? 0 : 6 - lastDayOfMonth;

  // Generate the array of days to display in the calendar

  // Previous month days
  const prevMonth = calendarDate.subtract(1, "month");
  const daysInPrevMonth = prevMonth.daysInMonth();
  const previousMonthDays = Array.from(
    { length: daysInPreviousMonth },
    (_, i) => prevMonth.date(daysInPrevMonth - daysInPreviousMonth + i + 1)
  );

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) =>
    calendarDate.startOf("month").add(i, "day")
  );

  // Next month days
  const nextMonthDays = Array.from(
    { length: daysInNextMonth + extraDays },
    (_, i) => calendarDate.endOf("month").add(i + 1, "day")
  );

  const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  // Fetch orders when the component mounts
  useEffect(() => {
    const controller = new AbortController();
    const fetchOrdersData = async () => {
      try {
        await fetchOrders({ signal: controller.signal });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrdersData();

    return () => controller.abort(); // Cleanup on component unmount
  }, [fetchOrders]);

  // Filter orders based on the selected date
  useEffect(() => {
    if (selectedDate) {
      const today = dayjs().startOf("day");
      const selected = dayjs(selectedDate, "DD/MM/YYYY").startOf("day");

      const filteredNotes = orders.filter((order) => {
        const orderDate = dayjs(order.orderDateExpiresAt);
        return (
          order.orderNote && // Only if notes exist
          (selected.isSame(orderDate, "day") || orderDate.isAfter(today))
        );
      });

      setFilteredOrders(filteredNotes);
    }
  }, [selectedDate, orders]);

  // Organize orders by date and store them in a new structure
  useEffect(() => {
    const ordersByDate = orders.reduce((acc, order) => {
      const date = dayjs(order.orderDateExpiresAt).format("DD/MM/YYYY");

      if (!acc[date]) {
        acc[date] = [];
      }

      if (order.orderPrio === true && order.orderLockStatus === false) {
        acc[date].push("red");
      } else if (order.orderLockStatus === true && order.orderPrio === false) {
        acc[date].push("gray");
      } else if (order.orderPrio === true && order.orderLockStatus === true) {
        acc[date].push("gray");
      } else {
        acc[date].push("orange");
      }

      return acc;
    }, {});

    setOrdersForDays(ordersByDate);
  }, [orders]); // Updates only if orders change

  return (
    <motion.div
      initial={{ opacity: 0, x: -120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className=" lg:max-w-xl lg:h-screen lg:mx-auto lg:mt-12 mt-24 p-4 bg-black shadow-xl bg-opacity-50"
    >
      {/* Modal adding notes */}
      <ModalAddNoteCalendar />

      <div className="flex justify-between items-center">
        <h2 className="flex text-2xl text-red-600 font-bold text-center mb-4">
          <span className="text-white pr-4">{capitalizedMonth}</span>{" "}
          {currentYear}
        </h2>
        <div className="flex gap-2 text-white">
          <button
            onClick={handlePrevMonth}
            className="hover:text-gray-400 text-3xl lg:text-xl mr-2 lg:mr-1"
          >
            {"<"}
          </button>
          <button
            onClick={handleNextMonth}
            className="hover:text-gray-400 text-3xl lg:text-xl"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* CalendarView grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"].map((day, index) => (
            <div key={index} className="text-center text-gray-500 font-bold">
              {day}
            </div>
          ))}

          {allDays.map((day, index) => {
            const isCurrentMonth = day.month() === calendarDate.month(); // Check if the day is in the current month
            const isToday = day.isSame(dayjs(), "day"); // Check if the day is today
            const dayString = formatDate(day); // Format the day
            const ordersCount = ordersForDays[dayString] || 0; // Get the orders for the day

            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={index}
                className={`p-2 text-center cursor-pointer relative
                 ${isToday ? "bg-blue-400 rounded-full" : ""} 
                 ${isCurrentMonth ? "text-white" : "text-gray-500"}`}
                onClick={() => setSelectedDate(dayString)}
              >
                {day.date()}
                {/* Dot indicator for orders */}
                {ordersForDays[dayString] && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-1 flex-wrap w-full">
                    {ordersCount.map((color, index) => {
                      let dotColor = "bg-yellow-500"; // Default color for normal orders
                      if (color === "red") dotColor = "bg-red-600"; // Priority orders
                      if (color === "gray") dotColor = "bg-gray-400"; // Locked orders

                      return (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                        ></div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Display notes (orderNote) for the selected date */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        selectedDate &&
        (() => {
          const today = dayjs().startOf("day");
          const tomorrow = today.add(1, "day");
          const selected = dayjs(selectedDate, "DD/MM/YYYY").startOf("day");

          const dayOfWeek = selected.isSame(today, "day")
            ? "Dzisiaj"
            : selected.isSame(tomorrow, "day")
            ? "Jutro"
            : selected.format("dddd");
          const formattedDate = selected.format("DD/MM/YYYY");

          return (
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-h-96 lg:overflow-y-auto lg:scrollbar-hide"
            >
              <h3 className="text-xl text-white font-semibold text-center mb-4">
                {dayOfWeek}, {formattedDate}
              </h3>
              {filteredOrders.length > 0 ? (
                <ul className="max-h-[300px] overflow-y-auto lg:scrollbar-hide">
                  {filteredOrders.map((order) => (
                    <li
                      key={order.orderNumber}
                      className={`p-4 mb-2 border-b border-gray-300 text-white`}
                    >
                      <div className="font-bold">
                        Order Number:{" "}
                        <span
                          className={`${
                            order.orderLockStatus === true
                              ? "text-gray-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {" "}
                          {order.orderNumber}{" "}
                        </span>
                      </div>
                      <div className="italic">{order.orderNote}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white border-b border-gray-300 p-4">
                  Brak notatek dla tego dnia.
                </p>
              )}
            </motion.div>
          );
        })()
      )}
    </motion.div>
  );
};

export default CalendarView;
