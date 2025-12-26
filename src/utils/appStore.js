import { configureStore } from "@reduxjs/toolkit"
import cartReducer from '../utils/Slice/cartSlice.js'
import countReducer from "./Slice/countSlice.js";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        count: countReducer,
    },
});

export default appStore;