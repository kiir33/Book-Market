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
    <div style={{ position: 'relative', }}>
      <i className="fas fs-2 fa-times-circle text-danger"
        style={{
          position: 'absolute',
          right: '0px',
          top: '-8px'
        }}
        onClick={remove} />

      <div className="row bg-white rounded-3 mx-2 my-4">
        <div className="cartImgContainer col-md-3 col-sm-12">
          <img src={book.image} className="cartImg rounded-circle" />
        </div>

        <div className="col-md-6 col-sm-12">
          <ul className="list-group list-group-flush px-2">
            <li className="list-group-item h4">{book.name}</li>
            <li className="list-group-item">Price: Rs.{formatPrice(convertDollar(book.price))}</li>
            <li className="list-group-item">
              <span>Quantity:</span>
              <div className="d-flex mt-2">
                <button className="btn btn-sm btn-outline-dark rounded-circle"
                  style={{ width: '2rem', height: '2rem' }}
                  onClick={() => changeStock(-1)}>-</button>
                <span className="h4 mx-4">{count}</span>
                <button className="btn btn-sm btn-outline-dark rounded-circle me-auto"
                  style={{ width: '2rem', height: '2rem' }}
                  disabled={count + 1 > book.stock}
                  onClick={() => changeStock(1)}>+</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-md-3 col-sm-12 d-flex bg-light rounded p-2">
          <p className="m-auto p-2 text-center text-secondary align-middle">
            <u>Subtotal</u><br />
            <span className="h5 text-success">
              Rs.{formatPrice(convertDollar(book.price) * count)}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem

/* <div className="col-sm-11 col-md-6 p-3" style={{ color: '#212121' }}>
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
            <div className="d-flex align-middle my-2">
              <span className="my-auto me-auto">In Cart: <span className="mx-2 text-primary blockquote">{count}</span></span>
              <button className="btn btn-sm btn-outline-danger me-2 rounded-circle"
                style={{ width: '2rem', height: '2rem' }}
                onClick={() => changeStock(-1)}>-</button>
              <button className="btn btn-sm btn-outline-success rounded-circle"
                style={{ width: '2rem', height: '2rem' }}
                disabled={count + 1 > book.stock}
                onClick={() => changeStock(1)}>+</button>
            </div>
            Subtotal: <span className="text-success"> Rs.{formatPrice(convertDollar(book.price) * count)}</span>
          </div>
          <button className="btn btn-outline-danger col-12 mt-2"
            onClick={remove}>Remove <DeleteForeverOutlined /> </button>
        </div>
      </div>
    </div>
    */
