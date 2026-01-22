import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const { id, selectedSize } = action.payload;
      
      const wishListIndex = state.items.findIndex(
        (item) => item.id === id && item.selectedSize.size === selectedSize.size
      );

      if (wishListIndex >= 0) {
        // .splice(index, 1) actually removes the item from the state
        state.items.splice(wishListIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    }
  }
});

export const { toggleWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;