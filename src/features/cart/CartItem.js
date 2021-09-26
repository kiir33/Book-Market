import { DeleteForeverOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { convertDollar, formatPrice, getYearFromDate } from '../../utilities/Helper'
import { removeFromCart, addToCart } from './CartSlice'
import { resetStock, decreaseStock } from '../Book/BookSlice'


const CartItem = ({ book, count }) => {
  const dispatch = useDispatch()

  const remove = () => {
    dispatch(removeFromCart([book.id]))
    dispatch(resetStock([book.id]))
  }

  const changeStock = (val) => {
    if ((count + val) === 0) {
      remove()
      return
    }
    if (count + val > book.stock) {
      alert('Book out of stock!')
      return
    }
    const cartObj = {
      'book': book,
      'count': val,
    }

    dispatch(addToCart(cartObj))
    dispatch(decreaseStock(cartObj))
  }

  return (
    <div className="col-sm-5 col-md-4 col-lg-3 p-2">
      <div className="card shadow-sm ">

        <img src={book.image} alt="" className="card-img-top" style={{ aspectRatio: "2/1" }} />
        <div className="card-body">

          <h5 className="card-title text-center">{book.name} ({getYearFromDate(book.published_date)})</h5>
          <p className="text-success text-center my-auto"> Rs.{formatPrice(convertDollar(book.price))}</p>
          <div className="card-text fw-light mt-2">
            Author: {book.author}<br />
            <div className="d-flex">
              <span >Genre: </span>
              <span className="text-truncate ms-2"> {book.genre} </span><br />
            </div>
            <div className="d-flex align-middle my-2s">
              <span className="my-auto me-auto">In Cart: <span className="mx-2 text-primary blockquote">{count}</span></span>
              <button className="btn btn-danger me-2 rounded-circle"
                style={{ width: '2.5rem', height: '2.5rem' }}
                onClick={() => changeStock(-1)}>-</button>
              <button className="btn btn-success rounded-circle"
                style={{ width: '2.5rem', height: '2.5rem' }}
                disabled={count + 1 > book.stock}
                onClick={() => changeStock(1)}>+</button>
            </div>
            Subtotal: <span className="text-success"> Rs.{formatPrice(convertDollar(book.price) * count)}</span>
          </div>
          <button className="btn btn-danger col-12 mt-2"
            onClick={remove}>Remove <DeleteForeverOutlined /> </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
