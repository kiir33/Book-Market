import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from '@mui/icons-material'
import { convertDollar, getYearFromDate, formatDate, formatPrice } from '../../utilities/Helper'
import { addToCart } from '../cart/CartSlice'
import { decreaseStock } from './BookSlice'

const Book = ({ book, count }) => {
  const dispatch = useDispatch()
  const [cart, setCart] = useState('1')

  const add = () => {
    if (isNaN(parseInt(cart))) {
      alert('Quantity must be a Number!')
      return
    }
    let cartCount = parseInt(cart)
    if (cartCount > count) {
      alert('Selected Quantity is greater than stock quantity!')
      return
    }

    const cartObj = {
      'book': book,
      'count': cartCount,
    }

    dispatch(addToCart(cartObj))
    dispatch(decreaseStock(cartObj))

    setCart(1)
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 m-auto p-2">
      <div className="card shadow-sm ">

        <img src={book.image} alt="" className="card-img-top" style={{ aspectRatio: "2/1" }} />
        <div className="card-body">

          <h5 className="card-title text-center">{book.name} ({getYearFromDate(book.published_date)})</h5>
          <p className="h6 text-success text-center mt-auto mb-auto"> Rs.{formatPrice(convertDollar(book.price))}</p>
          <div className="card-text fw-light mt-2">
            Author: {book.author}<br />
            <div className="d-flex">
              <span >Genre: </span>
              <span className="text-truncate ms-2"> {book.genre} </span><br />
            </div>
            Stock: {count}<br />
            <span className="text-truncate" >Published on: {formatDate(book.published_date)} </span><br />
          </div>
          <div className="d-flex mt-2">
            <span className="fw-light mt-auto mb-auto">Qty: </span>
            <div className="ms-1">
              <input type="number" className="form-control text-center align-middle"
                value={cart} min="1" max={count}
                onChange={e => setCart(e.target.value.trim())}
              /></div>
            <button className="btn btn-smbtn-primary ms-auto bgBlue text-light"
              onClick={add} disabled={count === 0}><ShoppingCart /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Book
