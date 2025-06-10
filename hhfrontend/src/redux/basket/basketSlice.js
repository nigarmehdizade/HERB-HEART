import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: [],
  reducers: {
    addToBasket: (state, action) => {
      const item = state.find(i => i._id === action.payload._id);
      if (item) item.count += 1;
      else state.push({ ...action.payload, count: 1 });
    },
    removeFromBasket: (state, action) => {
      return state.filter(i => i._id !== action.payload);
    },
    increaseCount: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item) item.count += 1;
    },
    decreaseCount: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },
  },
});

export const { addToBasket, removeFromBasket, increaseCount, decreaseCount } = basketSlice.actions;
export default basketSlice.reducer;