import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, action) => {
      state[action.payload] = (state[action.payload] || 0) + 1;
    },
    removeDish: (state, action) => {
      state[action.payload] = state[action.payload] ? state[action.payload] - 1 : 0;
    },
    clearCart: () => {
      return {};
    }
  }
});
