import { api } from "../Api/axiosInstance";

// User Api
export const registerUser = (userData) => {
  return api.post('/user/me', userData);
};

export const loginUser = (userData) => {
    return api.post('/user/login', userData);
};

export const getProfile = (token) => {
    return api.get('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const editProfile = (userData) => {
    return api.patch('/user/edit', userData);
};