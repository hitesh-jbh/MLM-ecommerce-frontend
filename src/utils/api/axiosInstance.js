import axios from "axios";

const BASE_URL = "https://mlm-ecommerce-backend-mme1.onrender.com";
// const BASE_URL = "http://13.50.55.165:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem("refreshToken");
        
        // Note: Using standard axios to avoid interceptor loops
        axios.post(`${BASE_URL}/api/auth/refresh-token`, { refreshToken })
          .then(({ data }) => {
            // Adjust these keys based on your backend response structure
            const newAccessToken = data.accessToken || data.token; 
            const newRefreshToken = data.refreshToken;

            localStorage.setItem("token", newAccessToken);
            if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
            
            api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            processQueue(null, newAccessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.clear();
            window.location.href = "/login"; 
            reject(err);
          })
          .finally(() => { isRefreshing = false; });
      });
    }
    return Promise.reject(error);
  }
);

// --- ADD THESE EXPORTS ---

// 1. Export the fetcher for SWR / React Query
export const fetcher = (url) => api.get(url).then((res) => res.data);

// 2. Export the api instance as default
export default api;