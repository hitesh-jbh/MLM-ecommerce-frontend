import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [],
};

const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    addBankAccount: (state, action) => {
      const newAccount = {
        ...action.payload,
        id: Date.now().toString(),
        // Automatic primary status if it's the first account
        isPrimary: state.accounts.length === 0,
        // Ensure data is stored clean
        ifsc: action.payload.ifsc.toUpperCase(),
        bankName: action.payload.bankName.toUpperCase(),
        createdAt: new Date().toISOString()
      };
      state.accounts.push(newAccount);
    },
    removeBankAccount: (state, action) => {
      state.accounts = state.accounts.filter(acc => acc.id !== action.payload);
      // If we deleted the primary account, make the next available one primary
      if (state.accounts.length > 0 && !state.accounts.find(a => a.isPrimary)) {
        state.accounts[0].isPrimary = true;
      }
    },
    setPrimaryAccount: (state, action) => {
      state.accounts = state.accounts.map(acc => ({
        ...acc,
        isPrimary: acc.id === action.payload
      }));
    }
  }
});

export const { addBankAccount, removeBankAccount, setPrimaryAccount } = bankSlice.actions;
export default bankSlice.reducer;