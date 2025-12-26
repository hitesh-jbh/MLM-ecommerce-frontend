import { configureStore } from "@reduxjs/toolkit"
import cartReducer from '../utils/Slice/cartSlice.js'
import countReducer from "./Slice/countSlice.js";
import orderReducer from "./Slice/orderSlice.js";
import authReducer from "./Slice/authSlice.js"
import searchReducer from "./Slice/searchSlice.js"
import productReducer from "./Slice/productSlice.js"

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        count: countReducer,
        order: orderReducer,
        auth: authReducer,
        search: searchReducer,
        product: productReducer,
    },
});

export default appStore;