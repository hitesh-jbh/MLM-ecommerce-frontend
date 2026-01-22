import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    items: [], 
  },
  reducers: {
    // Action to load initial data from the API
    setAddresses: (state, action) => {
      state.items = action.payload; //
    },
    addAddress: (state, action) => {
      // Backend uses 1 for true, 0 for false
      if (action.payload.is_default === 1) {
        state.items.forEach(item => item.is_default = 0); //
      }
      state.items.push(action.payload); //
    },
    updateAddress: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id); //
      if (index !== -1) {
        if (action.payload.is_default === 1) {
          state.items.forEach(item => item.is_default = 0); //
        }
        state.items[index] = action.payload; //
      }
    },
    setDefault: (state, action) => {
      state.items.forEach(item => {
        item.is_default = item.id === action.payload ? 1 : 0; //
      });
    },
    removeAddress: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); //
    }
  }
});

export const { setAddresses, addAddress, updateAddress, setDefault, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const addressSlice = createSlice({
//   name: 'addresses',
//   initialState: {
//     items: [], 
//   },
//   reducers: {
//     addAddress: (state, action) => {
//       const newAddress = {
//         ...action.payload,
//         id: Date.now(),
//         isDefault: state.items.length === 0 ? true : action.payload.isDefault,
//       };
//       if (newAddress.isDefault) {
//         state.items.forEach(item => item.isDefault = false);
//       }
//       state.items.push(newAddress);
//     },
//     updateAddress: (state, action) => {
//       const index = state.items.findIndex(item => item.id === action.payload.id);
//       if (index !== -1) {
//         if (action.payload.isDefault) {
//           state.items.forEach(item => item.isDefault = false);
//         }
//         state.items[index] = action.payload;
//       }
//     },
//     setDefault: (state, action) => {
//       state.items.forEach(item => {
//         item.isDefault = item.id === action.payload;
//       });
//     },
//     removeAddress: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     }
//   }
// });

// export const { addAddress, updateAddress, setDefault, removeAddress } = addressSlice.actions;
// export default addressSlice.reducer;