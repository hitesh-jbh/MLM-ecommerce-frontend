import { data } from "react-router-dom";
import { api } from "../Api/axiosInstance";

// User Api
export const registerUser = (userData) => {
  return api.post('/user/register', userData); 
};

export const getProfile = (token) => {
    return api.get('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const editProfile = async (userData) => {
  const token = localStorage.getItem('token'); 
  return await api.patch(`/user/edit`, userData, {
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
    return api.post('/admin/staff', staffData);
};

export const getUsers = (token) => {
    return api.get('/admin/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}





// Product Api
export const viewAllProducts = () => {
    return api.get('/product/');
};

export const viewProduct = (id) => {
    return api.get(`/product/${id}`);
};

export const addProduct = (prodData) => {
    return api.post('/product/', prodData);
    // return api.post('/product/', prodData, getAuthHeaders());
};

export const editProduct = (id, prodData) => {
    return api.put(`/product/${id}`, prodData);
};

export const deleteProduct = (id) => {
    return api.delete(`/product/${id}`);
};



// Auth
export const login = (data) => {
    return api.post('/auth/login', data);
}

export const forgotPassword = (data) => {
    return api.post('/auth/forgot-password', data);
}

export const resetPassword = (data) => {
    return api.post('/auth/reset-password', data);
}