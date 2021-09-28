import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { convertDollar, formatPrice } from '../../utilities/Helper'
import { resetStock } from '../Book/BookSlice'
import CartItem from './CartItem'
import { removeFromCart } from './CartSlice'

const Cart = ({ toggleCart }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.cart)

  const calculateTotal = (cartList) => {
    let totalCost = 0
    cartList.map(item => {
      let price = item.book.price.replace('$', '')
      totalCost += price * item.count
      return item
    })
    return convertDollar('$' + totalCost)
  }

  const clearCart = () => {
    if (window.confirm('Do you want to clear cart?')) {

      let idList = []
      state.cartList.map(item => {
        idList.push(item.book.id)
        return item
      })
      dispatch(removeFromCart(idList))
      dispatch(resetStock(idList))
    }
  }

  return (
    <div>
      <div className="row text-light text-center px-4">
        <i className="fas fs-3 fw-light fa-chevron-right col-1 my-auto"
          onClick={toggleCart} />
        <p className="col-10 h4 p-2">Cart</p>
        <hr />

        <span className="fs-5 fw-bold m-auto col-sm-11 col-md-5"><span className="fw-light">Total amount:</span> Rs. {formatPrice(calculateTotal(state.cartList))}</span>

        <button onClick={clearCart}
          disabled={state.cartList.length === 0}
          className="btn btn-outline-light col-sm-11 col-md-5">
          Clear Cart<i className="fas fa-times-circle ms-2" />
        </button>
        <hr className="mt-3" />
      </div >


      {
        state.cartList.length === 0 ? (
          <div>
            <p className="h4 text-secondary text-center col-12 mt-5">
              <i className="fas fs-2 fa-shopping-cart me-2"></i>
              Cart Empty!
            </p>
          </div>) : (
          <div className="container py-2">
            {
              state.cartList.map(item => (
                <CartItem key={item.book.id} book={item.book} count={item.count} />
              ))
            }
          </div>
        )
      }

    </div>
  )

}

export default Cart
