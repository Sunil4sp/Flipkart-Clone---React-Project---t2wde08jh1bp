import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart'
import DetailView from './components/details/DetailView';
import Shipping from "./components/shipping/Shipping";
import Context from "./context/Context";

//=======================================function starts=======================================
function App() {

  return (
    <Context>
      <Router>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<DetailView />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
          </Routes>
        </Box>
      </Router>
    </Context>
  );
}

export default App;

