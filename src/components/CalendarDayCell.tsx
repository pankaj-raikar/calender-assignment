import OrderTag from "./OrderTag";
import type { ProductionOrder } from "../data/orders";
import { useOrderStore } from "../store/ordersStore";

type CalendarDayCellProps = {
    day: number;
    isCurrentMonth?: boolean;
    orders?: ProductionOrder[];
    dateString: string;
};

function getOrderTagVariant(status: ProductionOrder["status"]) {
    if (status === "Completed") return "completed";
    if (status === "Planned") return "planned";
    if (status === "Pending") return "pending";
    if (status === "Cancelled") return "cancelled";
    if (status === "Approved") return "approved";

    return "inProgress";
}

const CalendarDayCell = ({
    day,
    isCurrentMonth = true,
    orders = [],
    dateString
}: CalendarDayCellProps) => {
    const hoveredOrderId = useOrderStore((state) => state.hoveredOrderId);
    const setHoveredOrderId = useOrderStore((state) => state.setHoveredOrderId);
    const selectedOrderId = useOrderStore((state) => state.selectedOrderId);
    const setDraggedOrderId = useOrderStore((state) => state.setDraggedOrderId);
    const draggedOrderId = useOrderStore((state) => state.draggedOrderId);
    const moveOrder = useOrderStore((state) => state.moveOrder);

    return (
        <div data-date={dateString} onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
                if (!draggedOrderId) {
                    return;
                }

                moveOrder(draggedOrderId, dateString);
            }} className="min-h-[92px] min-w-0 border-r border-b border-slate-200 p-1.5 md:min-h-[168px] md:p-3">
            <span
                className={
                    isCurrentMonth
                        ? "text-sm font-medium text-slate-950 md:text-lg"
                        : "text-sm font-medium text-slate-400 md:text-lg"
                }
            >
                {day}
            </span>

            <div className="mt-2 min-w-0 space-y-1">
                {orders.map((order) => {
                    const isFaded =
                        hoveredOrderId !== null && hoveredOrderId !== order.id;
                    return (
                        <OrderTag
                            key={order.id}
                            orderId={order.id}
                            draggable
                            onDragStart={(orderId) => setDraggedOrderId(orderId)}
                            orderNumber={order.label}
                            colorCode={order.colorCode}
                            variant={getOrderTagVariant(order.status)}
                            tooltip={`${order.label} • ${order.status}`}
                            isFaded={isFaded}
                            onMouseEnter={() => setHoveredOrderId(order.id)}
                            onMouseLeave={() => setHoveredOrderId(null)}
                            isSelected={selectedOrderId === order.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarDayCell;
