import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const FetchBooks = createAsyncThunk(
  'get/book',
  async (payload, { rejectWith, getState, dipatch }) => {
    try {
      let url = "https://book-set-task.herokuapp.com/api/list_books"
      const books = await axios.get(url)
      const { data } = books
      return data
    } catch (error) {
      return error
    }
  }
)

const saveToRedux = (state, action) => {
  if (state.bookList.length > 0) {
    return
  }
  let bookList = action.payload

  bookList.map(book => {
    state.bookList.push({
      'book': book,
      'count': book.stock
    })
    if (book.genre.includes('|')) {
      let genres = book.genre.split('|')
      genres.map(g => {
        if (!state.genreList.includes(g)) {
          state.genreList.push(g)
        }
        return g
      })

    } else if (!state.genreList.includes(book.genre)) {
      state.genreList.push(book.genre)
    }
    return book
  })
}

const initialState = {
  bookList: [],
  genreList: [],
  loading: false
}

const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetStock: (state, action) => {
      const bookIds = action.payload
      console.log('removed ', bookIds.length, 'book(s) from cart');
      bookIds.map(bookId => {
        const bookIndex = state.bookList.findIndex(item => item.book.id === bookId)
        if (bookIndex !== -1) {
          state.bookList[bookIndex].count = state.bookList[bookIndex].book.stock
        }
        return bookId
      });

    },
    decreaseStock: (state, action) => {
      const newCartItem = action.payload
      const bookIndex = state.bookList.findIndex(item =>
        item.book.id === newCartItem.book.id)
      if (bookIndex >= 0) {
        state.bookList[bookIndex].count -= newCartItem.count
      }
    },
  },
  extraReducers: {
    [FetchBooks.pending]: (state) => {
      state.loading = true;
    },
    [FetchBooks.fulfilled]: (state, action) => {
      saveToRedux(state, action)
      state.loading = false;
    },
    [FetchBooks.rejected]: (state) => {
      state.loading = false;
    },
  }
})

export const { resetStock, decreaseStock } = BookSlice.actions

export default BookSlice.reducer;
