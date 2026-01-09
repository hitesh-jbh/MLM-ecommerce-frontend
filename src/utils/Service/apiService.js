import { data } from "react-router-dom";
import { api } from "./axiosInstance.js";

// User Api
export const registerUser = (userData) => {
  return api.post('/api/user/register', userData); 
};

export const getProfile = (token) => {
    return api.get('/api/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const editProfile = async (userData) => {
  const token = localStorage.getItem('token'); 
  return await api.patch(`/api/user/edit`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};



// Admin Api

// const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             // 'Content-Type': 'application/json'
//         }
//     };
// export const adminLogin = (adminData) => {
//   return api.post('/admin/login', adminData);
// };

export const createStaff = (staffData) => {
    return api.post('/api/admin/staff', staffData);
};
// export const getUsers = (token) => {
//     return api.get('/api/admin/all', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     });
// }

export const getUsers = (token, type) => {
    return api.get(`/api/admin/all?userType=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}





// Product Api
export const viewAllProducts = () => {
    return api.get('/api/product/');
};

export const viewProduct = (id) => {
    return api.get(`/api/product/${id}`);
};

export const addProduct = (prodData) => {
    return api.post('/api/product/', prodData);
    // return api.post('/product/', prodData, getAuthHeaders());
};

export const editProduct = (id, prodData) => {
    return api.put(`/api/product/${id}`, prodData);
};

export const deleteProduct = (id) => {
    return api.delete(`/api/product/${id}`);
};



// Auth
export const login = (data) => {
    return api.post('/api/auth/login', data);
}

export const forgotPassword = (data) => {
    return api.post('/api/auth/forgot-password', data);
}

export const resetPassword = (data) => {
    return api.post('/api/auth/reset-password', data);
}