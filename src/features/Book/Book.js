import { ShoppingCart } from '@mui/icons-material'
import React from 'react'

const Book = ({ book }) => {

  const getYearFromDate = (date) => {
    return date.split("/")[0]
  }

  const convertDollar = (dollar) => {
    let priceInDollar = dollar.replace('$', '').trim()
    let priceInNpr = priceInDollar * 117.63;
    return (priceInNpr.toFixed(2));
  }

  return (
    <div className="col-sm-5 col-md-4 col-lg-3 m-auto p-2">
      <div className="card shadow-sm ">

        <img src={book.image} alt="Image" className="card-img-top" style={{ aspectRatio: "2/1" }} />
        <div className="card-body">

          <h5 className="card-title text-center">{book.name} ({getYearFromDate(book.published_date)})</h5>
          <p className="card-text fw-light">
            Author: {book.author}<br />
            <div className="d-flex">
              <span >Genre: </span>
              <span className="text-truncate ms-2"> {book.genre} </span><br />
            </div>
            Stock: {book.stock}<br />
          </p>
          <div className="d-flex">
            <p className="h5 text-success mt-auto mb-auto"> Rs.{convertDollar(book.price)}</p>
            <a href="#" class="btn btn-primary ms-auto">Add &nbsp; <ShoppingCart /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book
