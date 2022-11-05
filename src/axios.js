import axios from "axios";
import { BASE_API_URL } from "./constants";

export const API = axios.create({
  baseURL: BASE_API_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("access-token")}`;
  }
  return req;
});
