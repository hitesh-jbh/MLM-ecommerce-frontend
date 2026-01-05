import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        // Retrieve and parse the user object if it exists
        user: JSON.parse(localStorage.getItem("user")) || null, 
        token: localStorage.getItem("token") || null,
        isLoggedIn: !!localStorage.getItem("token"),
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            // Save BOTH to localStorage
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user)); 
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // Clean up
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;