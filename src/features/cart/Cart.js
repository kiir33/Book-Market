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
      <div
        style={{
          fontSize: '2rem',
          paddingTop: '15rem',
          textAlign: 'center',
        }}>
        <p className="text-secondary p-4">Cart Empty!</p>
      </div>
    )
  }
  return (
    <div className="pt-2">
      <div className="d-flex bg-body shadow-sm text-center py-2 px-4">
        <span className="h4 ms-auto my-auto me-4"><span className="fw-light">Total amount:</span> Rs. {formatPrice(calculateTotal(state.cartList))}</span>

        <button onClick={checkout}
          className="btn btn-lg btn-success px-4">
          Check Out<i className="fas fa-arrow-circle-right ms-2" />
        </button>
      </div >

      <div className="container py-2">
        <div className="row">
          {
            state.cartList.map(item => (
              <CartItem key={item.book.id} book={item.book} count={item.count} />
            ))
          }
        </div>
      </div>
    </div>
  )

}

export default Cart
