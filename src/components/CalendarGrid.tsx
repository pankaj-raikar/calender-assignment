import CalendarDayCell from "./CalendarDayCell";
import { useOrderStore } from "../store/ordersStore";
import { getCalendarDays, isDateInRange } from "../utils/date";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



const CalendarGrid = () => {

    const orders = useOrderStore((state) => state.orders);
    const selectedStatuses = useOrderStore((state) => state.selectedStatuses);

    const currentMonth = useOrderStore((state) => state.currentMonth);
    const days = getCalendarDays(currentMonth);
    const calendarView = useOrderStore((state) => state.calendarView);

    const firstCurrentMonthIndex = days.findIndex((day) => day.isCurrentMonth);

    const firstWeekStartIndex =
        firstCurrentMonthIndex - (firstCurrentMonthIndex % 7);

    const visibleDays =
        calendarView === "Weekly"
            ? days.slice(firstWeekStartIndex, firstWeekStartIndex + 7)
            : days;
    return (
        <div>
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                {weekdays.map((day) => (
                    <div key={day} className="border-r border-slate-200 py-5 text-center text-lg text-slate-600 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {visibleDays.map((date, index) => {

                    const ordersForDay = orders.filter(
                        (order) =>
                            selectedStatuses.includes(order.status) &&
                            isDateInRange(date.dateString, order.startDate, order.endDate)
                    );
                    return (
                        <CalendarDayCell
                            key={`${date.day}-${index}`}
                            day={date.day}
                            isCurrentMonth={date.isCurrentMonth}
                            orders={ordersForDay}
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default CalendarGrid