import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../utils/slice/cartSlice.js';
import countReducer from "./slice/countSlice.js";
import orderReducer from "./slice/orderSlice.js";
import addressReducer from "./slice/addressSlice.js"
import paymentReducer from "./slice/paymentSlice.js"
import wishlistReducer from "./slice/wishlistSlice.js"
import authReducer from "./slice/authSlice.js"
import searchReducer from "./slice/searchSlice.js"
import productReducer from "./slice/productSlice.js"

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        count: countReducer,
        order: orderReducer,
        addresses: addressReducer,
        payments: paymentReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
        search: searchReducer,
        product: productReducer,
    },
});

export default appStore;