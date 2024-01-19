import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './Routing-PR/Admin-panel/reduxThunk/Store';
import Product from './Routing-PR/Admin-panel/Product';
import Cart from './Routing-PR/Admin-panel/Cart';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Product />} ></Route>
          <Route path="/product" element={<Product />} ></Route>
          <Route path="/cart" element={<Cart />} ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
