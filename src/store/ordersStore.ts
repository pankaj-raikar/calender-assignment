import { create } from 'zustand'
import { sampleOrders, type ProductionOrder } from "../data/orders";

type OrdersStore = {
    orders: ProductionOrder[];
};

export const useOrderStore = create<OrdersStore>(() => ({
    orders: sampleOrders
}))