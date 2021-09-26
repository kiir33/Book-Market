import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-dark bg-primary ps-4 pe-4">
        <Link className="navbar-brand" to="/">Book Market</Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-item nav-link active" to="/cart">
            <ShoppingCart />&nbsp;&nbsp;Cart
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
