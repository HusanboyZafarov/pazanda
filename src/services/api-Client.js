import axios from "axios";
import { getToken } from "./Token";

const baseURL = import.meta.env.MODE === "development" ? "/api" : "https://api.taomchi-app.uz/api";

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
