import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://mlm-ecommerce-backend.onrender.com',
  timeout: 10000, // 10 second timeout
});

export const fetcher = (url) => api.get(url).then(res => res.data);

// Add a request interceptor to attach the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or get from Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
      }
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);