import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://mlm-ecommerce-backend.onrender.com/api',
});