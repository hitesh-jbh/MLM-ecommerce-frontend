import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderHistory: [],
    },
    reducers: {
        placeOrder: (state, action) => {
            state.orderHistory.unshift(action.payload);
        }
    },
})

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;