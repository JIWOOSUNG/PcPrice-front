import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5500/api/auth",
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

// 응답 에러 처리 (예: 인증 오류)
api.interceptors.response.use(
  (response) => response,  // 성공적인 응답은 그대로 반환
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");  // 토큰 삭제
    }
    return Promise.reject(error);  // 에러를 다시 전달
  }
);

export default api;
