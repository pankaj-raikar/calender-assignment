import CalendarDayCell from "./CalendarDayCell";
import { isDateInRange } from "../utils/date";
import { useOrderStore } from "../store/ordersStore";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },

    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
];


const CalendarGrid = () => {

    const orders = useOrderStore((state) => state.orders);
    const selectedStatuses = useOrderStore((state) => state.selectedStatuses);
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
                {days.map((date, index) => {
                    const dateString = date.isCurrentMonth === false
                        ? `2025-07-${String(date.day).padStart(2, "0")}`
                        : `2025-08-${String(date.day).padStart(2, "0")}`;

                    const ordersForDay = orders.filter(
                        (order) =>
                            selectedStatuses.includes(order.status) &&
                            isDateInRange(dateString, order.startDate, order.endDate)
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