import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authslice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        user: userReducer
    }
})

export default store;