import dayjs from "dayjs";

const NotesForDay = ({ selectedDate, filteredOrders }) => {
  const today = dayjs().startOf("day");
  const tomorrow = today.add(1, "day");
  const selected = dayjs(selectedDate, "DD/MM/YYYY").startOf("day");

  const dayOfWeek = selected.isSame(today, "day")
    ? "Dzisiaj"
    : selected.isSame(tomorrow, "day")
    ? "Jutro"
    : selected.format("dddd");

  return (
    <motion.div
      initial={{ opacity: 0, x: -120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 max-h-96 lg:overflow-y-auto lg:scrollbar-hide"
    >
      <h3 className="text-xl text-white font-semibold text-center mb-4">
        {dayOfWeek}, {selected.format("DD/MM/YYYY")}
      </h3>
      {filteredOrders.length > 0 ? (
        <ul className="max-h-[300px] overflow-y-auto lg:scrollbar-hide">
          {filteredOrders.map((order) => (
            <li key={order.orderNumber} className={`p-4 mb-2 border-b border-gray-300 text-white`}>
              <div className="font-bold">
                Order Number:{" "}
                <span
                  className={`${
                    order.orderLockStatus === true ? "text-gray-500" : "text-yellow-500"
                  }`}
                >
                  {order.orderNumber}
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
};

export default NotesForDay;