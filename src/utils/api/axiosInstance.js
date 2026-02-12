// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://13.50.55.165:3000",
//   timeout: 5000, // 10 second timeout
// });

// // export const api = axios.create({
// //   baseURL: 'https://mlm-ecommerce-backend.onrender.com',
// //   timeout: 5000, // 10 second timeout
// // });

// export const fetcher = (url) => api.get(url).then(res => res.data);

// // Add a request interceptor to attach the token automatically
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Or get from Redux state
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to handle errors globally
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       // Server responded with error status
//       console.error("API Error:", error.response.status, error.response.data);
//       if (error.response.status === 401 || error.response.status === 403) {
//         localStorage.removeItem("token");
//       }
//     } else if (error.request) {
//       // Request made but no response
//       console.error("Network Error:", error.request);
//     } else {
//       // Something else happened
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );


import axios from "axios";

export const api = axios.create({
  baseURL: "http://13.50.55.165:3000",
  timeout: 5000, 
});

export const fetcher = (url) => api.get(url).then(res => res.data);

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  }
);
