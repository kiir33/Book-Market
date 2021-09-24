import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className="sticky-top">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} >
            Kiran Book Store
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="show cart items count" >
            <Badge badgeContent={4} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
