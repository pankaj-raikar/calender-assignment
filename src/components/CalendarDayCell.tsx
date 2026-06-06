import OrderTag from "./OrderTag";
import type { ProductionOrder } from "../data/orders";

type CalendarDayCellProps = {
    day: number;
    isCurrentMonth?: boolean
    orders?: ProductionOrder[];
}

function getOrderTagVariant(status: ProductionOrder["status"]) {
    if (status === "Completed") return "completed";
    if (status === "Planned" || status === "Pending") return "planned";
    if (status === "Cancelled") return "cancelled";
    if (status === "Approved") return "approved";

    return "inProgress";
}

const CalendarDayCell = ({
    day,
    isCurrentMonth = true,
    orders = []
}: CalendarDayCellProps) => {
    return (
        <div className="min-h-[168px] border-r border-b border-slate-200 p-3">
            <span
                className={
                    isCurrentMonth
                        ? "text-lg font-medium text-slate-950"
                        : "text-lg font-medium text-slate-400"
                }
            >
                {day}
            </span>

            <div className="mt-2 space-y-1">
                {orders.map((order) => (
                    <OrderTag
                        key={order.id}
                        orderNumber={order.label}
                        colorCode={order.colorCode}
                        variant={getOrderTagVariant(order.status)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CalendarDayCell