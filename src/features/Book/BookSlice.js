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

const addGenre = (state, action) => {
  let bookList = action.payload

  bookList.map(book => {
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
    setGenre: (state, action) => {
      state.genreList.push(action.payload)
    }
  },
  extraReducers: {
    [FetchBooks.pending]: (state) => {
      state.loading = true;
    },
    [FetchBooks.fulfilled]: (state, action) => {
      state.bookList = action.payload;
      addGenre(state, action)
      state.loading = false;
    },
    [FetchBooks.rejected]: (state) => {
      state.loading = false;
    },
  }
})

export const { setGenre } = BookSlice.actions

export default BookSlice.reducer;
