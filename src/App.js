import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './utilities/Navbar'
import BookList from './features/Book/BookList'
import Cart from './features/cart/Cart'

function App() {
  return (
    <div>
      <Router>
        <div className="bg-light" style={{ height: "100vh" }}>
          <Navbar />
          <Switch>
            <Route exact path="/" >
              <BookList />
            </Route>

            <Route path="/cart" >
              <Cart />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
