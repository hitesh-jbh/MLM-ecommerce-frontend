import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderHistory: [],
        loading: false,
        error: null
    },
    reducers: {
        placeOrder: (state, action) => {
            // unshift adds the newest order to the top of the list
            state.orderHistory.unshift(action.payload);
        }
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const orderSlice = createSlice({
//     name: "order",
//     initialState: {
//         orderHistory: [],
//     },
//     reducers: {
//         placeOrder: (state, action) => {
//             state.orderHistory.unshift(action.payload);
//         }
//     },
// })

// export const { placeOrder } = orderSlice.actions;
// export default orderSlice.reducer;