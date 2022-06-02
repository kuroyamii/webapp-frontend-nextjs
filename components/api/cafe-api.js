import axios from "axios";
import BaseAPI from "./base-api";

const CafeAPI = {
  getAllFoods: async (type) => {
    try {
      // const res = await axios({
      //   method: "post",
      //   baseURL: "http://localhost:8080/masterapi",
      //   url: "/food",
      //   data: {
      //     foodType: type,
      //   },
      // });

      const res = await BaseAPI.post("/food", { foodType: type });
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  getFoodByID: async (id) => {
    try {
      // const res = await axios({
      //   method: "get",
      //   baseURL: "http://localhost:8080/masterapi",
      //   url: "/food/id/" + id,
      // });
      const res = await BaseAPI.get("/food/id/" + id);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  getTypes: async () => {
    try {
      const res = await BaseAPI.get("/types");
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  getFoodByTypeAndName: async (type, name) => {
    try {
      console.log(name, type);
      const res = await BaseAPI.post("/food", {
        foodType: type,
        foodName: name,
      });
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  getTableData: async () => {
    try {
      const res = await BaseAPI.get("/seats");
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  getWaiters: async () => {
    try {
      const res = await BaseAPI.get("/waiters");
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  getSumPeople: async () => {
    try {
      const res = await BaseAPI.get("/sum");
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  placeOrder: async (name, table, foods, waiter, amount, price) => {
    try {
      const data = BaseAPI.post("/order/post", {
        customerName: name,
        tableID: table,
        foodID: foods,
        waiterID: waiter,
        amount: amount,
        price: price,
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  payBill: async (customerID) => {
    try {
      const data = BaseAPI.post("/pay", {
        customerID: customerID,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getOrderDetailByID: async (customerID) => {
    try {
      const data = BaseAPI.get("/order?customerID=" + customerID);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getOrderDetails: async () => {
    try {
      const data = BaseAPI.get("/details");
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getCustomerData: async (id) => {
    try {
      const data = BaseAPI.get("/customer/" + id);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

export default CafeAPI;
