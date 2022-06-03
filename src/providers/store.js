import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set, get) => ({
  orders: [],
  customerID: 0,
  done: false,
  customerName: "",
  price: 0,
  username: "",
  password: "",
  setPassword: () =>
    set((state) => ({ username: "admin", password: "admin1234" })),
  addPrice: (value) => set((state) => ({ price: state.price + value })),
  decreasePrice: (value) => set((state) => ({ price: state.price - value })),
  removePrice: (value) => set((state) => ({ price: 0 })),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  addCustomerID: (id) => set((state) => ({ customerID: id })),
  removeCustomerID: (id) =>
    set((state) => ({ customerID: 0, customerName: "", price: 0 })),
  setDone: (status) => set((state) => ({ done: status })),
  addCustomerName: (name) => set((state) => ({ customerName: name })),

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
