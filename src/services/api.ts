import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepta requisições para incluir o token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // ⬅️ trocado de localStorage para sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas para deslogar automaticamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      sessionStorage.removeItem("token"); // ⬅️ trocado também aqui
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;