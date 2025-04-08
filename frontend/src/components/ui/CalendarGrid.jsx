import dayjs from "dayjs";

const CalendarGrid = ({
  allDays,
  ordersForDays,
  setSelectedDate,
  selectedDate,
  formatDate,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"].map((day, index) => (
        <div key={index} className="text-center text-gray-500 font-bold">
          {day}
        </div>
      ))}
      
      {allDays.map((day, index) => {
          if (!day || !day.isValid()) return null; // Sprawdzenie, czy 'day' jest prawidłowy


        const isCurrentMonth = day.month() === selectedDate.month();
        const isToday = day.isSame(dayjs(), "day");
        const dayString = formatDate(day);
        const ordersCount = ordersForDays[dayString] || 0;

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
            {ordersForDays[dayString] && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-1 flex-wrap w-full">
                {ordersCount.map((color, index) => {
                  let dotColor = "bg-yellow-500";
                  if (color === "red") dotColor = "bg-red-600";
                  if (color === "gray") dotColor = "bg-gray-400";

                  return (
                    <div key={index} className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;