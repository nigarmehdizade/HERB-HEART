import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      const existing = state.items.find(item => item._id === action.payload._id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    incrementCount: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) item.count += 1;
    },
    decrementCount: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  }
});

export const { addToBasket, removeFromBasket, incrementCount, decrementCount, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
