import axios from "axios";

const host = process.env.REACT_APP_API_HOST || "localhost";
const port = process.env.REACT_APP_API_PORT || 6868;

const baseURL = `http://${host}:${port}`;

const instance = axios.create({});

instance.defaults.baseURL = baseURL;
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

instance.interceptors.request.use(
  (config) => {
    config.headers.set(
      "Authorization",
      "Bearer " + window.localStorage.getItem("authtoken")
    );
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
