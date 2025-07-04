// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;
      const existing = state.items.find(item => item.id === id && item.size === size);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(item => item.id === id && item.size === size);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(item => item.id === id && item.size === size);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.size === size));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
