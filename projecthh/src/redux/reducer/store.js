import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
import productReducer from '../productSlice';
import basketReducer from '../basketSlice';
import wishlistReducer from '../wishlistSlice';
import cartReducer from '../cartSlice';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const store = configureStore({
  reducer: {
        user: userReducer,
    products: productReducer,
    basket: basketReducer,
    wishlist: wishlistReducer,
     cart: cartReducer
  }, preloadedState: {
    user: {
      userInfo: userInfoFromStorage,
      loading: false,
      error: null,
      userList: [],
    },
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
