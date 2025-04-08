const CalendarControls = ({ handlePrevMonth, handleNextMonth, currentMonth, currentYear }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="flex text-2xl text-red-600 font-bold text-center mb-4">
        <span className="text-white pr-4">{currentMonth}</span> {currentYear}
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
  );
};

export default CalendarControls;