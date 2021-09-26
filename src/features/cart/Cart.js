import React from 'react'
import { useSelector } from 'react-redux'
import { convertDollar } from '../../utilities/Helper'
import CartItem from './CartItem'

const Cart = () => {
  const state = useSelector(state => state.cart)

  const calculateTotal = (cartList) => {
    let totalCost = 0
    cartList.map(item => {
      let price = item.book.price.replace('$', '')
      totalCost += price * item.count
    })
    return convertDollar('$' + totalCost)
  }

  if (state.cartList.length === 0) {
    return (
      <div className="p-5 text-center">
        <i className="fas fa-shopping-basket h1 text-secondary mt-5"></i>
        <p className="h3 text-secondary mt-4">No Items!</p>
      </div>
    )
  }
  return (
    <div >
      <div className="bg-body shadow-sm p-4 d-flex">
        <span className="h4 m-auto"><span className="fw-light">Total amount:</span> NRs. {calculateTotal(state.cartList)}</span>
        <button className="btn btn-lg btn-success col-3">Check Out &nbsp;<i className="fas fa-arrow-circle-right" /> </button>
      </div >
      <div className="row mt-4">
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
