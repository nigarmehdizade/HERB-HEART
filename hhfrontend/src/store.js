import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/auth/authSlice'
import productReducer from './redux/products/productSlice'
import basketReducer from './redux/basket/basketSlice'
// import orderReducer from './redux/orders/orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    basket: basketReducer
    // orders: orderReducer,
  },
})
