import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
