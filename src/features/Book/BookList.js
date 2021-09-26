import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBooks } from './BookSlice'
import Book from './Book'
import Selector from '../../utilities/Selector'

const BookList = () => {

  const [filterKey, setFilterKey] = useState('')

  const dispatch = useDispatch()
  const state = useSelector(state => state.books)

  useEffect(() => {
    dispatch(FetchBooks())
  }, [dispatch])



  if (state.loading) {
    return (
      <div className="container pt-4">

        {
          state.loading && (
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: "100%" }}></div>
            </div>
          )
        }
      </div>
    )
  } else {

    return (
      <div className="container pt-4">

        {
          state.genreList.length !== 0 && (
            <Selector genreList={state.genreList} setFilter={setFilterKey} />
          )
        }

        {
          filterKey !== '' &&
          <div className="row">
            {
              state.bookList.filter(book => book.genre.includes(filterKey)).map(item => (
                <Book key={item.id} book={item} />
              ))
            }
          </div>
        }

        {
          filterKey === '' &&
          <div className="row">
            {
              state.bookList.map(item => (
                <Book key={item.id} book={item} />
              ))
            }
          </div>
        }

      </div>
    )
  }
}


export default BookList
