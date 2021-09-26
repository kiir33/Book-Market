import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = () => {
  const state = useSelector(state => state.cart)

  const calculateTotal = (cartList) => {

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
    <div className="row">
      <div className="container">
        Total amount : {calculateTotal(state.cartList)}
        <button className="btn btn-success ms-auto">Check Out &nbsp;<i className="fas fa-arrow-circle-right" /> </button>
      </div>
      {
        state.cartList.map(item => (
          <CartItem key={item.book.id} book={item.book} count={item.count} />
        ))
      }
    </div>
  )

}

export default Cart
