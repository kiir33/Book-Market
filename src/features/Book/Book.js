import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from '@mui/icons-material'
import { convertDollar, getYearFromDate, formatDate } from '../../utilities/Helper'
import { addToCart } from '../cart/CartSlice'
import { decreaseStock } from './BookSlice'

const Book = ({ book, count }) => {
  const dispatch = useDispatch()
  const [cart, setCart] = useState(1)

  const add = () => {
    if (cart > count) {
      alert('Selected Quantity is greater than stock quantity!')
      return
    }

    const cartObj = {
      'book': book,
      'count': cart,
    }

    dispatch(addToCart(cartObj))
    dispatch(decreaseStock(cartObj))

    setCart(1)
  }

  return (
    <div className="col-sm-5 col-md-4 col-lg-3 m-auto p-2">
      <div className="card shadow-sm ">

        <img src={book.image} alt="" className="card-img-top" style={{ aspectRatio: "2/1" }} />
        <div className="card-body">

          <h5 className="card-title text-center">{book.name} ({getYearFromDate(book.published_date)})</h5>
          <p className="h6 text-success text-center mt-auto mb-auto"> Rs.{convertDollar(book.price)}</p>
          <div className="card-text fw-light mt-2">
            Author: {book.author}<br />
            <div className="d-flex">
              <span >Genre: </span>
              <span className="text-truncate ms-2"> {book.genre} </span><br />
            </div>
            Stock: {count}<br />
            <span className="text-truncate" style={{ fontSize: "0.8rem" }} >Published on: {formatDate(book.published_date)} </span><br />
          </div>
          <div className="row mt-2">
            <div className="col">
              <input type="number" className="form-control text-center"
                value={cart} min="1" max={count} onChange={e => setCart(parseInt(e.target.value))}
              /></div>
            <button className="btn btn-primary ms-auto col"
              onClick={add}>Add &nbsp; <ShoppingCart /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Book
