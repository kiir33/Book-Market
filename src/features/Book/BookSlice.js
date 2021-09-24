import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

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
  // let newGenres = action.payload
  // newGenres.map(genre => {
  //   if (!state.genreList.includes(genre)) {
  //     state.genreList.push(genre)
  //   }
  // })
}

const initialState = {
  bookList: [],
  genreList: [],
  loading: false
}

const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
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

export default BookSlice.reducer;
