import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://mlm-ecommerce-backend.onrender.com/api',
});

// Add a request interceptor to attach the token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or get from Redux state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});