// import { createSlice } from "@reduxjs/toolkit";

// const countSlice = createSlice({
//   name: "count",
//   // Initial state is an empty object to store multiple product counts
//   // Format: { [productId]: quantity }
//   initialState: {}, 
  
//   reducers: {
//     // Increments count for a specific product ID
//     incrementCount: (state, action) => {
//       const productId = action.payload;
//       // If product doesn't exist yet, it defaults to 1 and adds 1 (Total 2)
//       state[productId] = (state[productId] || 1) + 1;
//     },

//     // Decrements count for a specific product ID, ensuring it never goes below 1
//     decrementCount: (state, action) => {
//       const productId = action.payload;
//       if (state[productId] > 1) {
//         state[productId] -= 1;
//       }
//     },

//     // Used in useEffect when the Product Info page loads
//     initializeProduct: (state, action) => {
//       const productId = action.payload;
//       // If the product isn't in the store yet, set it to the default of 1
//       if (!state[productId]) {
//         state[productId] = 1;
//       }
//     }
//   }
// });

// export const { incrementCount, decrementCount, initializeProduct } = countSlice.actions;
// export default countSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {}, // Stores: { "productId-size": quantity }
  reducers: {
    incrementCount: (state, action) => {
      const { id, size, stock } = action.payload;
      const key = `${id}-${size}`;
      const current = state[key] || 1;
      if (current < stock) state[key] = current + 1;
    },
    decrementCount: (state, action) => {
      const { id, size } = action.payload;
      const key = `${id}-${size}`;
      if (state[key] > 1) state[key] -= 1;
    },
    initializeProduct: (state, action) => {
      const { id, size } = action.payload;
      const key = `${id}-${size}`;
      if (!state[key]) state[key] = 1;
    }
  }
});

export const { incrementCount, decrementCount, initializeProduct } = countSlice.actions;
export default countSlice.reducer;