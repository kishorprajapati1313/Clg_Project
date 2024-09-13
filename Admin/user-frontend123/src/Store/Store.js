// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import productReducer from './Productslic'
import cartReducer from './cartslice';
import Orderslice from './Orderslice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: Orderslice
  },
});

export default store;
