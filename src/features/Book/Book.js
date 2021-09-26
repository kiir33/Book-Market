import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from '@mui/icons-material'
import { convertDollar, getYearFromDate, formatDate } from '../../utilities/Helper'
import { addToCart } from '../cart/CartSlice'

const Book = ({ book }) => {
  const dispatch = useDispatch()
  const [stock, setStock] = useState(book.stock)
  const [cart, setCart] = useState(1)

  const add = () => {
    if (cart > stock) {
      alert('Selected Quantity is greater than stock quantity!')
      return
    }

    const cartObj = {
      'book': book,
      'count': cart,
    }
    dispatch(addToCart(cartObj))

    setStock(stock - cart)
    setCart(1)
  }

  const changeQty = (val, max) => {
    let x = cart + val
    if (x > max || x < 0)
      return
    setCart(x)
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
            Stock: {stock}<br />
            <span className="text-truncate" style={{ fontSize: "0.8rem" }} >Published on: {formatDate(book.published_date)} </span><br />
          </div>
          <div className="row mt-2">
            <div className="col">
              <input type="number" className="form-control text-center"
                value={cart} min="1" max={stock} onChange={e => setCart(e.target.value)}
              /></div>
            <button className="btn btn-primary ms-auto col"
              onClick={add}>Add &nbsp; <ShoppingCart /></button>
          </div>

          <div className="d-flex">
            <button className="btn btn-outline-danger col-2 ms-auto" onClick={() => changeQty(-1, stock)}>-</button>

            <button className="btn btn-outline-success col-2 me-auto" onClick={() => changeQty(1, stock)}>+</button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Book
