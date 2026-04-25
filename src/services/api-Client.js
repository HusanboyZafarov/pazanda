import axios from "axios";
import { getToken, removeToken } from "./Token";

const baseURL = "https://api.taomchi-app.uz/api";

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeToken();
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
