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
};

export default CafeAPI;
