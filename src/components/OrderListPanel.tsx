import { Info } from "lucide-react"
import { useState } from "react";
import OrderRow from "./OrderRow"
import EditOrderModal from "./EditOrderModal";
import { formatDuration } from "../utils/date";
import { useOrderStore } from "../store/ordersStore";

const OrderListPanel = () => {

    const orders = useOrderStore((state) => state.orders);
    const selectedStatuses = useOrderStore((state) => state.selectedStatuses);

    const searchQuery = useOrderStore((state) => state.searchQuery);
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const visibleOrders = orders.filter((order) => {
        const matchesStatus = selectedStatuses.includes(order.status);

        const matchesSearch =
            normalizedSearch === "" ||
            order.label.toLowerCase().includes(normalizedSearch) ||
            order.colorCode.toLowerCase().includes(normalizedSearch) ||
            order.area.toLowerCase().includes(normalizedSearch) ||
            order.assignee.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesSearch;
    });

    const selectedOrderId = useOrderStore((state) => state.selectedOrderId);
    const setSelectedOrderId = useOrderStore((state) => state.setSelectedOrderId);

    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const editingOrder = editingOrderId
        ? orders.find((o) => o.id === editingOrderId) ?? null
        : null;

    return (
        <div className="h-full">
            <div className="hidden h-16 grid-cols-4 items-center border-b border-slate-200 px-8 text-lg font-semibold text-slate-950 md:grid">
                <div className="flex items-center gap-2">
                    <span>Plan/Order</span>
                    <Info size={18} className="text-slate-500" />
                </div>

                <div className="justify-self-center">Status</div>
                <div className="justify-self-center">Duration</div>
                <div className="w-[112px] justify-self-center text-center">Progress</div>
            </div>

            <div className="space-y-2 px-3 py-3 md:space-y-0 md:px-0 md:py-0">
                {visibleOrders.map((order, index) => (
                    <OrderRow
                        key={order.id}
                        index={index + 1}
                        code={order.colorCode}
                        status={order.status}
                        duration={formatDuration(order.startDate, order.endDate)}
                        progress={order.progress}
                        orderId={order.id}
                        isSelected={selectedOrderId === order.id}
                        onClick={() =>
                            setSelectedOrderId(selectedOrderId === order.id ? null : order.id)
                        }
                        onEdit={() => setEditingOrderId(order.id)}
                    />
                ))}
            </div>

            {editingOrder && (
                <EditOrderModal
                    order={editingOrder}
                    onClose={() => setEditingOrderId(null)}
                />
            )}
        </div>
    )
}

export default OrderListPanel
