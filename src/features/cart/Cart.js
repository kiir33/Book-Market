import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { convertDollar, formatPrice } from '../../utilities/Helper'
import { resetStock } from '../Book/BookSlice'
import CartItem from './CartItem'
import { removeFromCart } from './CartSlice'

const Cart = () => {
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

  const checkout = () => {
    if (window.confirm('Do you want to checkout now?')) {

      let idList = []
      state.cartList.map(item => {
        idList.push(item.book.id)
        return item
      })
      dispatch(removeFromCart(idList))
      dispatch(resetStock(idList))
    }
  }

  if (state.cartList.length === 0) {
    return (
      <div className="emptyCart">
        <h3 className="text-secondary">Cart Empty!</h3>
      </div>
    )
  }
  return (
    <div className="pt-4">
      <div className="row text-light text-center pt-3 px-4">
        <p className="h4 p-2">Cart</p><hr />

        <span className="fs-5 fw-bold m-auto col-sm-11 col-md-5"><span className="fw-light">Total amount:</span> Rs. {formatPrice(calculateTotal(state.cartList))}</span>

        <button onClick={checkout}
          className="btn btn-light textBlue col-sm-11 col-md-5">
          Clear Cart<i className="fas fa-times-circle ms-2" />
        </button>
        <hr className="mt-3" />
      </div >


      <div className="container py-2">
        {
          state.cartList.map(item => (
            <CartItem key={item.book.id} book={item.book} count={item.count} />
          ))
        }

      </div>
    </div>
  )

}

export default Cart
