import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:1001/";

const instance = axios.create({});

instance.defaults.baseURL = baseURL;
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

instance.interceptors.request.use(
  (config) => {
    config.headers.set("Authorization", window.localStorage.getItem("token"));
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
