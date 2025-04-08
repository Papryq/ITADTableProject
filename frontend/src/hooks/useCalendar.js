import dayjs from "dayjs";
import "dayjs/locale/pl"; // Import Polish locale for dayjs
dayjs.locale("pl"); // Set the locale to Polish

const useCalendar = () => {
  const [calendarDate, setCalendarDate] = useState(dayjs());

  // Function to change months
  const handlePrevMonth = () => {
    setCalendarDate((prev) => prev.subtract(1, "month"));
    setSelectedDate(null); // Clears chosen date when month being changed
  };

  const handleNextMonth = () => {
    setCalendarDate((prev) => prev.add(1, "month"));
    setSelectedDate(null); // Clears chosen date when month being changed
  };


  return {
    handlePrevMonth,
    handleNextMonth,
  };
};
export default useCalendar;
