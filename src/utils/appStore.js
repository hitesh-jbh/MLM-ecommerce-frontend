import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../utils/Slice/cartSlice.js';
import countReducer from "./Slice/countSlice.js";
import wishListReducer from "../utils/Slice/WishList.js";
import productReducer from "../utils/Slice/productSlice.js";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        count: countReducer,
        wishlist: wishListReducer,
        product: productReducer,
    },
});

export default appStore;