import { DeleteForeverOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { convertDollar, getYearFromDate } from '../../utilities/Helper'
import { removeFromCart } from './CartSlice'


const CartItem = ({ book, count }) => {
  const dispatch = useDispatch()

  const remove = () => {
    dispatch(removeFromCart(book.id))
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
            In Cart: {count}<br />
          </div>

          <button className="btn btn-danger ms-auto mt-4 col"
            onClick={remove}>Remove <DeleteForeverOutlined /> </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
