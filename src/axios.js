import axios from "axios";
import { BASE_API_URL } from "./constants";

const API = axios.create({
  baseURL: BASE_API_URL,
});

API.interceptors.request.use((req) => {
  if (JSON.parse(window.localStorage.getItem("user"))) {
    req.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem("user"))["access"]}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/user/token/" && err.response) {
      // Access Token was expired
      if (err.response.data.code === "token_not_valid") {
        window.localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await API.post("/user/token/refresh/", {
            refresh: JSON.parse(window.localStorage.getItem("user"))["refresh"],
          });

          const { access } = rs.data;
          window.localStorage.setItem(
            "user",
            JSON.stringify({ access: access, refresh: JSON.parse(localStorage.getItem("user"))["refresh"] })
          );

          return API(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default API;
