import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import walletReducer from './walletSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: walletReducer,
    },
});

export default store;
