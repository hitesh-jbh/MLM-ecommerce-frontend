import { api } from "../Api/axiosInstance.js";

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

export const editProfileImage = async (token, formData) => {
    return api.put('/api/user/profile/image', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Essential for file uploads
        }
    });
};

export const editProfile = (token, userData) => {
  return api.patch("/api/user/edit", userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const refferalTree = (token) => {
    return api.get("/api/referral", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}



// Admin Api
export const createStaff = (staffData) => {
    return api.post('/api/admin/staff', staffData);
};

export const getUsers = (token, type) => {
    return api.get(`/api/admin/all?userType=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const setCommission = (token, level, commissionData) => {
    // commissionData should be like { percentage: 15 }
    return api.put(`/api/admin/commission-level/${level}`, commissionData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

// apiService.js
export const updateStaff = async (token, staffData) => {
    try {
        console.log("Making API call to /api/admin/staff with data:", staffData);
        const response = await api.put('/api/admin/staff', staffData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("API call successful:", response.data);
        return response;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

export const viewCommission = (token) => {
    return api.get("/api/admin/commission-level/", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}



// Rank Api
export const createRank = (token, rankData) => {
    return api.post("api/rank", rankData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const viewRank = (token) => {
    return api.get("/api/rank", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

// export const updateRank = (token, rankData) => {
//     return api.get("/api/admin/commission-level/", {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     })
// }



// Product Api
export const viewAllProducts = () => {
    return api.get('/api/product/');
};

export const viewProduct = (id) => {
    return api.get(`/api/product/${id}`);
};

// Add Product - uses FormData (Multipart)
export const addProduct = (token, formData) => {
    return api.post('/api/product/', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    });
};

// Edit Product - uses JSON payload (as your service doesn't handle files here)
export const editProduct = (id, token, prodData) => {
    return api.put(`/api/product/${id}`, prodData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
        }
    });
};

// Delete Product
export const deleteProduct = (id, token) => {
    return api.delete(`/api/product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};



// Cart
export const addToCart = (token, productId, quantity) => {
    return api.post('/api/cart/add', 
        { productId, quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const viewCartItem = (token) => {
    return api.get('/api/cart/', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Update Quantity
export const updateCartQuantity = (token, productId, quantity) => {
    return api.put('/api/cart/', 
        { productId, quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

// Remove Item
export const removeCartIem = (token, productId) => {
    return api.delete(`/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};



// order management
// create order
export const createOrder = (token, orderData) => {
    return api.post('/api/order/', orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// my order
export const getMyAllOrders = (token) => {
    return api.get('/api/order/', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// order info
export const getOrderDetails = (token, orderId) => {
    return api.get(`/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Admin order management
export const statusUpdate = (token, orderId, statusBody) => {
    return api.patch(`/api/order/${orderId}/status`, statusBody, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// order list
export const orderList = (token) => {
    return api.get("/api/order/all", {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// dashboard stats
export const dashboardStats = (token) => {
    return api.get("/api/order/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
    });
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

// wallet
export const getWallet = (token) => {
    return api.get('/api/wallet/', {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// wishlist
// utils/service/apiService.js

export const getWishlist = (token) => {
    return api.get('/api/wishlist/', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addToWishlist = (token, prodId) => {
    return api.post('/api/wishlist/', { productId: prodId }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const removeToWishlist = (token, prodId) => {
    // Matches your Postman screenshot: DELETE /api/wishlist/6
    return api.delete(`/api/wishlist/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


// review
export const addReview = (token, reviewData) => {
    return api.post('/api/review/', reviewData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}
export const getReview = (token, prodId) => {
    return api.get(`api/review/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const deleteReview = (token, prodId) => {
    return api.delete(`api/review/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const productReview = (token, prodId) => {
    return api.get(`/api/review/product/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}


// Address
export const saveAddress = (token, addressData) => {
    return api.post("/api/address/", addressData, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const getAddress = (token,) => {
    return api.get("/api/address/", {
        headers: { Authorization: `Bearer ${token}` }
    });
}