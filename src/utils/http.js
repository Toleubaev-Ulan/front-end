import axios from "axios";
import config from "@/config/index.js";

const baseURL = config.baseURL
function request(options) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseURL,
      methods: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {},
      ...options,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default request;
