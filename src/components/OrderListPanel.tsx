import { Info } from "lucide-react"
import OrderRow from "./OrderRow"
import { formatDuration } from "../utils/date";
import { useOrderStore } from "../store/ordersStore";

const OrderListPanel = () => {

    const orders = useOrderStore((state) => state.orders);
    const selectedStatuses = useOrderStore((state) => state.selectedStatuses);
    const visibleOrders = orders.filter((order) =>
        selectedStatuses.includes(order.status)
    );
    return (
        <div className="h-full">
            <div className="grid h-16 grid-cols-4 items-center border-b border-slate-200 px-8 text-lg font-semibold text-slate-950">
                <div className="flex items-center gap-2">
                    <span>Plan/Order</span>
                    <Info size={18} className="text-slate-500" />
                </div>

                <div className="justify-self-center">Status</div>
                <div className="justify-self-center">Duration</div>
                <div className="justify-self-center">Progress</div>
            </div>

            <div>
                {visibleOrders.map((order, index) => (
                    <OrderRow
                        key={order.id}
                        index={index + 1}
                        code={order.colorCode}
                        status={order.status}
                        duration={formatDuration(order.startDate, order.endDate)}
                        progress={order.progress}
                    />
                ))}
            </div>
        </div>
    )
}

export default OrderListPanel
