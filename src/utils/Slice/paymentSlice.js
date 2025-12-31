// utils/Slice/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    items: [], // Stores card and UPI objects
  },
  reducers: {
    addPaymentMethod: (state, action) => {
      const newMethod = {
        ...action.payload,
        id: Date.now(),
        // Automatically make it default if it's the first one
        isDefault: state.items.length === 0 ? true : action.payload.isDefault,
      };
      
      if (newMethod.isDefault) {
        state.items.forEach(item => item.isDefault = false);
      }
      state.items.push(newMethod);
    },
    setDefaultPayment: (state, action) => {
      state.items.forEach(item => {
        item.isDefault = item.id === action.payload;
      });
    },
    removePaymentMethod: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addPaymentMethod, setDefaultPayment, removePaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;