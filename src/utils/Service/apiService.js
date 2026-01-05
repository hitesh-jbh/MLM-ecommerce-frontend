import { api } from "../Api/axiosInstance";

// User Api
export const registerUser = (userData) => {
  return api.post('/user/register', userData); 
};

// export const loginUser = (userData) => {
//     return api.post('/user/login', userData);
// };

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
// export const adminLogin = (adminData) => {
//   return api.post('/admin/login', adminData);
// };

export const createStaff = (staffData) => {
    return api.post('/admin/staff', staffData);
};

export const getUsers = () => {
    return api.get('/admin/all');
}


// Product Api
export const viewAllProducts = () => {
    return api.get('/product/');
};

export const viewProduct = (id) => {
    return api.get(`/product/${id}`);
};

// Function to generate the header object
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        }
    };
};

export const addProduct = (prodData) => {
    return api.post('/product/', prodData, getAuthHeaders());
};

export const editProduct = (id, prodData) => {
    return api.put(`/product/${id}`, prodData, getAuthHeaders());
};

export const deleteProduct = (id) => {
    return api.delete(`/product/${id}`, getAuthHeaders());
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







// export const addProduct = (prodData) => {
//     return api.post('/product/', prodData);
// };

// export const editProduct = (id, prodData) => {
//     return api.put(`/product/${id}`, prodData);
// };

// export const deleteProduct = (id) => {
//     return api.delete(`/product/${id}`);
// };

// export const = () => {};










// const delay = (ms) => new Promise(res => setTimeout(res, ms));

// // Helper to simulate a database in the browser
// const getMockDB = () => JSON.parse(localStorage.getItem('gentlehaus_db') || '[]');
// const saveToMockDB = (users) => localStorage.setItem('gentlehaus_db', JSON.stringify(users));

// export const registerUser = async (userData) => {
//   const users = getMockDB();
  
//   if (users.find(u => u.email === userData.email)) {
//     throw { response: { data: { message: "This email is already registered." } } };
//   }

//   const newUser = { 
//     ...userData, 
//     id: Math.floor(Math.random() * 10000),
//     referralCode: `GH-${Math.random().toString(36).toUpperCase().substring(2, 7)}`,
//     createdAt: new Date().toISOString()
//   };

//   users.push(newUser);
//   saveToMockDB(users);

//   return { data: { message: "Account created successfully", referralCode: newUser.referralCode } };
// };

// export const loginUser = async ({ email, password }) => {
//   await delay(1000);
//   const users = getMockDB();
//   const user = users.find(u => u.email === email && u.password === password);

//   if (!user) {
//     throw { response: { data: { message: "Invalid email or password." } } };
//   }

//   // Simulate a JWT token
//   const mockToken = btoa(JSON.stringify({ id: user.id, email: user.email }));
  
//   return { data: { success: true, token: mockToken } };
// };

// export const getProfile = async (token) => {
//   await delay(500);
//   const users = getMockDB();
//   // Decode "token" to find user
//   const decoded = JSON.parse(atob(token));
//   const user = users.find(u => u.id === decoded.id);

//   return { data: user };
// };
