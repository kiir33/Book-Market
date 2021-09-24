import { configureStore } from '@reduxjs/toolkit';
import BookReducer from '../features/Book/BookSlice'

export const store = configureStore({
  reducer: {
    books: BookReducer
  },
});
