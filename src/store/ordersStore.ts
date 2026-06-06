import { create } from "zustand";
import {
  sampleOrders,
  type OrderStatus,
  type ProductionOrder,
} from "../data/orders";
import { getDurationInDays, rangesOverlap } from "../utils/date";

const storageKey = "production-calendar-orders";

const DATA_VERSION = "v2"; // bump this whenever sampleOrders changes
const versionKey = "production-calendar-version";

function getInitialOrders() {
  if (typeof localStorage === "undefined") {
    return sampleOrders;
  }

  // If version mismatch, wipe stale cache and re-seed from sampleOrders
  const savedVersion = localStorage.getItem(versionKey);
  if (savedVersion !== DATA_VERSION) {
    localStorage.removeItem(storageKey);
    localStorage.setItem(versionKey, DATA_VERSION);
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

function addDays(dateString: string, days: number) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 10);
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
  draggedOrderId: string | null;
  setDraggedOrderId: (orderId: string | null) => void;
  moveOrder: (orderId: string, newStartDate: string) => void;
  deleteOrder: (orderId: string) => void;
  updateOrder: (orderId: string, patch: Partial<ProductionOrder>) => void;
  dragError: string;
  clearDragError: () => void;
  pastOrders: ProductionOrder[][];
  undo: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
  clearToastMessage: () => void;
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
        pastOrders: [...state.pastOrders, state.orders],
        toastMessage: "Order created.",
      };
    }),
  currentMonth: formatMonthDate(new Date()),

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
  draggedOrderId: null,
  setDraggedOrderId: (orderId) => set({ draggedOrderId: orderId }),
  moveOrder: (orderId, newStartDate) =>
    set((state) => {
      const draggedOrder = state.orders.find((order) => order.id === orderId);

      if (!draggedOrder) {
        return state;
      }

      const duration =
        getDurationInDays(draggedOrder.startDate, draggedOrder.endDate) - 1;

      const newEndDate = addDays(newStartDate, duration);

      const hasCollision = state.orders.some(
        (order) =>
          order.id !== orderId &&
          order.area === draggedOrder.area &&
          rangesOverlap(
            newStartDate,
            newEndDate,
            order.startDate,
            order.endDate,
          ),
      );

      if (hasCollision) {
        return {
          draggedOrderId: null,
          dragError: "Cannot move order: overlapping order in the same area.",
        };
      }

      const nextOrders = state.orders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        return {
          ...order,
          startDate: newStartDate,
          endDate: newEndDate,
        };
      });

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(nextOrders));
      }

      return {
        orders: nextOrders,
        draggedOrderId: null,
        dragError: "",
        pastOrders: [...state.pastOrders, state.orders],
        toastMessage: "Order moved.",
      };
    }),
  deleteOrder: (orderId) =>
    set((state) => {
      const nextOrders = state.orders.filter((o) => o.id !== orderId);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(nextOrders));
      }
      return {
        orders: nextOrders,
        pastOrders: [...state.pastOrders, state.orders],
        toastMessage: "Order deleted.",
      };
    }),
  updateOrder: (orderId, patch) =>
    set((state) => {
      const nextOrders = state.orders.map((o) =>
        o.id === orderId ? { ...o, ...patch } : o
      );
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(nextOrders));
      }
      return {
        orders: nextOrders,
        pastOrders: [...state.pastOrders, state.orders],
        toastMessage: "Order updated.",
      };
    }),
  dragError: "",
  clearDragError: () => set({ dragError: "" }),
  pastOrders: [],
  undo: () =>
    set((state) => {
      const previousOrders = state.pastOrders.at(-1);

      if (!previousOrders) {
        return state;
      }

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(previousOrders));
      }

      return {
        orders: previousOrders,
        pastOrders: state.pastOrders.slice(0, -1),
        toastMessage: "Last action undone.",
      };
    }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  toastMessage: "",
  setToastMessage: (message) => set({ toastMessage: message }),
  clearToastMessage: () => set({ toastMessage: "" }),
}));
