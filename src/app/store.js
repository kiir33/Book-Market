import { configureStore } from '@reduxjs/toolkit';
import BookReducer from '../features/Book/BookSlice'
import CartReducer from '../features/cart/CartSlice';

export const store = configureStore({
  reducer: {
    books: BookReducer,
    cart: CartReducer,
  },
});
