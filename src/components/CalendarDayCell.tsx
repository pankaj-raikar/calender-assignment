import OrderTag from "./OrderTag";
import type { ProductionOrder } from "../data/orders";
import { useOrderStore } from "../store/ordersStore";

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
    const hoveredOrderId = useOrderStore((state) => state.hoveredOrderId);
    const setHoveredOrderId = useOrderStore((state) => state.setHoveredOrderId);
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
                {orders.map((order) => {
                    const isFaded = hoveredOrderId !== null && hoveredOrderId !== order.id;
                    return (
                        <OrderTag
                            key={order.id}
                            orderNumber={order.label}
                            colorCode={order.colorCode}
                            variant={getOrderTagVariant(order.status)}
                            tooltip={`${order.label} • ${order.status}`}
                            isFaded={isFaded}
                            onMouseEnter={() => setHoveredOrderId(order.id)}
                            onMouseLeave={() => setHoveredOrderId(null)}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default CalendarDayCell