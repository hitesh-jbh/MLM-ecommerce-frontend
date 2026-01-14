import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Slice/cartSlice.js';
import countReducer from "./Slice/countSlice.js";
import orderReducer from "./Slice/orderSlice.js";
import addressReducer from "./Slice/addressSlice.js"
import paymentReducer from "./Slice/paymentSlice.js"
import wishlistReducer from "./Slice/wishlistSlice.js"
import authReducer from "./Slice/authSlice.js"
import searchReducer from "./Slice/searchSlice.js"
import productReducer from "./Slice/productSlice.js"

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