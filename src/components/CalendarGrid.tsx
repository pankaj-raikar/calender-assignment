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

    const dragError = useOrderStore((state) => state.dragError);
    const clearDragError = useOrderStore((state) => state.clearDragError);

    const searchQuery = useOrderStore((state) => state.searchQuery);
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const firstWeekStartIndex =
        firstCurrentMonthIndex - (firstCurrentMonthIndex % 7);

    const visibleDays =
        calendarView === "Weekly"
            ? days.slice(firstWeekStartIndex, firstWeekStartIndex + 7)
            : days;

    return (
        <div>
            {dragError && (
                <div className="flex items-center justify-between border-b border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                    <span>{dragError}</span>
                    <button onClick={clearDragError} className="text-red-700 underline">
                        Dismiss
                    </button>
                </div>
            )}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                {weekdays.map((day) => (
                    <div key={day} className="border-r border-slate-200 py-5 text-center text-lg text-slate-600 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {visibleDays.map((date, index) => {

                    const ordersForDay = orders.filter((order) => {
                        const matchesStatus = selectedStatuses.includes(order.status);

                        const matchesSearch =
                            normalizedSearch === "" ||
                            order.label.toLowerCase().includes(normalizedSearch) ||
                            order.colorCode.toLowerCase().includes(normalizedSearch) ||
                            order.area.toLowerCase().includes(normalizedSearch) ||
                            order.assignee.toLowerCase().includes(normalizedSearch);

                        return (
                            matchesStatus &&
                            matchesSearch &&
                            isDateInRange(date.dateString, order.startDate, order.endDate)
                        );
                    });
                    return (
                        <CalendarDayCell
                            dateString={date.dateString}
                            key={date.dateString}
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