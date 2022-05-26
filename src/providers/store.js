import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set, get) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  removeOrder: (order) =>
    set((state) => ({
      orders: state.orders.filter(function (value, index, arr) {
        return index != order;
      }),
    })),
  decreaseOrder: (order) => set((state) => (state.orders[order].amount -= 1)),
  increaseOrder: (order) => set((state) => (state.orders[order].amount += 1)),
  getAmount: (order) => (get().orders[order] ? get().orders[order].amount : 0),
});

store = devtools(store);
store = persist(store, { name: "customer_storage" });
const useStore = create(store);
export default useStore;
