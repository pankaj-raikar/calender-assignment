import { create } from "zustand";
import {
  sampleOrders,
  type OrderStatus,
  type ProductionOrder,
} from "../data/orders";

type CalendarView = "Monthly" | "Weekly";

type OrdersStore = {
  orders: ProductionOrder[];
  selectedStatuses: OrderStatus[];
  toggleStatus: (status: OrderStatus) => void;
  hoveredOrderId: string | null;
  setHoveredOrderId: (orderId: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (orderId: string | null) => void;
  calendarView: CalendarView;
  setCalendarView: (view: CalendarView) => void;
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
  hoveredOrderId: null,
  setHoveredOrderId: (orderId) => set({ hoveredOrderId: orderId }),
  selectedOrderId: null,
  setSelectedOrderId: (orderId) => set({ selectedOrderId: orderId }),
  calendarView: "Monthly",
  setCalendarView: (view) => set({ calendarView: view }),
}));
