import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
// import productReducer from '../productSlice';
// import basketReducer from '../basketSlice';
// import wishlistReducer from '../wishlistSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // products: productReducer,
    // basket: basketReducer,
    // wishlist: wishlistReducer,
  },
});

export default store;
