import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const state = useSelector(state => state.cart)
  return (
    <nav className="fixed-top navbar navbar-dark bg-primary ps-4 pe-4">
      <Link className="navbar-brand" to="/">Book Market</Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-item nav-link active" to="/cart">
          Cart&nbsp;&nbsp;<ShoppingCart />

          {state.cartList.length !== 0 && (
            <span className="position-absolute top-2 start-2 translate-middle badge rounded-pill bg-danger">
              {state.cartList.length}
            </span>
          )}


        </Link>
      </div>
    </nav>
  )
}

export default Navbar
