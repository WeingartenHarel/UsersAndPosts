// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';

const store = configureStore({
  reducer: {
    user:userReducer,
    post:postReducer,
  },
});

export default store;