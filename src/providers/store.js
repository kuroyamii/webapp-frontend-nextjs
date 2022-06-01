import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set, get) => ({
  orders: [],
  customerID: 0,
  done: false,
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  addCustomerID: (id) => set((state) => ({ customerID: id })),
  removeCustomerID: (id) => set((state) => ({ customerID: 0 })),
  setDone: (status) => set((state) => ({ done: status })),

  removeOrder: (order) =>
    set((state) => ({
      orders: state.orders.filter(function (value, index, arr) {
        return index != order;
      }),
    })),
  decreaseOrder: (order) => set((state) => (state.orders[order].amount -= 1)),
  increaseOrder: (order) => set((state) => (state.orders[order].amount += 1)),
  getAmount: (order) => (get().orders[order] ? get().orders[order].amount : 0),
  deleteOrder: () => set((state) => ({ orders: [] })),
});

store = devtools(store);
store = persist(store, { name: "customer_storage" });
const useStore = create(store);
export default useStore;
