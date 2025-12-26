import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const { id, selectedSize, quantity } = action.payload;
      // Key check: match both ID and Size
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === selectedSize.size
      );

      if (existingItem) {
        const totalNewQty = existingItem.quantity + quantity;
        // Problem #2: Ensure total doesn't exceed stock
        if (totalNewQty <= selectedSize.stock) {
          existingItem.quantity = totalNewQty;
        } else {
          existingItem.quantity = selectedSize.stock;
          alert("Maximum stock reached for this size.");
        }
      } else {
        state.items.push({
          id,
          name: action.payload.name,
          image: action.payload.image,
          size: selectedSize.size,
          price: selectedSize.price,
          stock: selectedSize.stock,
          quantity: quantity,
        });
      }
    },
    updateQuantity: (state, action) => {
    const { id, size, quantity } = action.payload;
    const item = state.items.find(i => i.id === id && i.size === size);
    if (item && quantity > 0 && quantity <= item.stock) {
      item.quantity = quantity;
    }
  },

  removeItem: (state, action) => {
    const { id, size } = action.payload;
    // Filter out the item matching both ID and Size
    state.items = state.items.filter(item => !(item.id === id && item.size === size));
  },

  clearCart: (state, action) => {
    state.items.length = 0;
  }
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;