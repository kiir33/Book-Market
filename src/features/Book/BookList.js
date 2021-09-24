import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBooks } from './BookSlice'
import Book from './Book'
import { CircularProgress } from '@mui/material'
import Selector from '../../utilities/Selector'

const BookList = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.books)

  useEffect(() => {
    dispatch(FetchBooks())
  }, [])

  return (
    <div className="container pt-4">

      <Selector />

      {
        state.loading && (
          <p className="text-center mt-5 bg-light"><CircularProgress /></p>)

      }

      <div className="row">
        {
          !state.loading && (
            state.bookList.map(item => (
              <Book key={item.id} book={item} />
            ))
          )
        }
      </div>

    </div>
  )
}

export default BookList
