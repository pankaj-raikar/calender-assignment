import { create } from "zustand";
import {
  sampleOrders,
  type OrderStatus,
  type ProductionOrder,
} from "../data/orders";

const storageKey = "production-calendar-orders";

function getInitialOrders() {
  if (typeof localStorage === "undefined") {
    return sampleOrders;
  }

  const savedOrders = localStorage.getItem(storageKey);

  if (!savedOrders) {
    return sampleOrders;
  }

  return JSON.parse(savedOrders) as ProductionOrder[];
}

type CalendarView = "Monthly" | "Weekly";
function formatMonthDate(date: Date) {
  return date.toISOString().slice(0, 7);
}

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
  addOrder: (order: ProductionOrder) => void;
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToThisMonth: () => void;
};

export const useOrderStore = create<OrdersStore>((set) => ({
  orders: getInitialOrders(),
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
  addOrder: (order) =>
    set((state) => {
      const nextOrders = [...state.orders, order];

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(nextOrders));
      }

      return {
        orders: nextOrders,
      };
    }),
  currentMonth: "2025-08",

  setCurrentMonth: (month) => set({ currentMonth: month }),

  goToPreviousMonth: () =>
    set((state) => {
      const date = new Date(`${state.currentMonth}-01`);
      date.setMonth(date.getMonth() - 1);

      return { currentMonth: formatMonthDate(date) };
    }),

  goToNextMonth: () =>
    set((state) => {
      const date = new Date(`${state.currentMonth}-01`);
      date.setMonth(date.getMonth() + 1);

      return { currentMonth: formatMonthDate(date) };
    }),

  goToThisMonth: () => set({ currentMonth: formatMonthDate(new Date()) }),
}));
