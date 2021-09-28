import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const Navbar = ({ toggle }) => {
  const state = useSelector(state => state.cart)
  return (
    <nav className="fixed-top navbar bg-white ps-4 pe-4 border">
      <span className="textBlue h3 fw-bolder" to="/">Book Market</span>

      <div className="navbar-nav ms-auto">
        <a className="nav-item nav-link active" to="/cart" onClick={toggle}>
          <ShoppingCart className="textBlue" />

          {state.cartList.length !== 0 && (
            <span className="position-absolute top-2 start-2 translate-middle badge rounded-pill bg-danger">
              {state.cartList.length}
            </span>
          )}
        </a>
      </div>

    </nav>
  )
}

export default Navbar
