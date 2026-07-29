import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Matches your Spring Boot port
});

// Add a request interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
