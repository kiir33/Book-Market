import React from 'react';
import Navbar from './utilities/Navbar'
import BookList from './features/Book/BookList'
import Cart from './features/cart/Cart'
import { useState } from 'react';

function App() {
  const [cartVisible, setCartVisible] = useState(false)

  const toggleCart = () => {
    setCartVisible(!cartVisible)
  }

  return (
    <div className="app">
      {cartVisible &&
        <div>
          <div className="blackOverlay" onClick={toggleCart}></div>
          <div className="cartOverlay"><Cart toggleCart={toggleCart} /></div>
        </div>
      }
      <Navbar toggle={toggleCart} />

      <div className="mt-4 overflow-hidden">
        <div className="col-12"><BookList /></div>
      </div>

    </div>
  );
}

export default App;
