import { create } from 'zustand'
import { sampleOrders, type OrderStatus, type ProductionOrder } from "../data/orders";
type OrdersStore = {
    orders: ProductionOrder[];
    selectedStatuses: OrderStatus[];
    toggleStatus: (status: OrderStatus) => void;
};

export const useOrderStore = create<OrdersStore>((set) => ({
    orders: sampleOrders,
    selectedStatuses: [
        "Pending",
        "Completed",
        "In Progress",
        "Planned",
        "Cancelled",
        "Approved",
    ],
    toggleStatus: (status) =>
        set((state) => {
            const isSelected = state.selectedStatuses.includes(status);

            return {
                selectedStatuses: isSelected
                    ? state.selectedStatuses.filter((item) => item !== status)
                    : [...state.selectedStatuses, status],
            };
        }),
}));