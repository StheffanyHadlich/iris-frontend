import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie;
      const tokenMatch = cookies.match(/token=([^;]+)/);
      
      if (tokenMatch && tokenMatch[1]) {
        config.headers = config.headers || {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${tokenMatch[1]}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;