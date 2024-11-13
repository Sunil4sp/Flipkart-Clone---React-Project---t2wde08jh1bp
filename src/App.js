import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../src/App.css';
import { Box } from '@mui/material';
import Context from "./context/Context";
import Header from './components/header/Header';
/*import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import DetailView from './components/details/DetailView';
import Shipping from "./components/shipping/Shipping";
/* import CategoryPage from "./components/home/CategoryPage"; 
import ProfileManager from "./components/home/ProfileManager";*/

//=======================================function starts=======================================
const CategoryPage = lazy(() =>import('./components/home/CategoryPage'));
const Home = lazy(() =>import('./components/home/Home'));
const ProfileManager = lazy(() => import('./components/home/ProfileManager'));
const DetailView = lazy(() => import('./components/details/DetailView'));
const Shipping = lazy(() => import('./components/shipping/Shipping'));
const Cart = lazy(() => import('./components/cart/Cart'));

function App() {
  return (
    <Context>
      <Router>
        <Box style={{ marginTop: 54 }}>
          <Suspense fallback= {<div className="loading">Loading...</div>}>
          <Header />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/products/category/:category' element={<CategoryPage />} />
              <Route path='/profile' element={<ProfileManager />} />
              <Route path='/products/:id' element={<DetailView />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shipping' element={<Shipping />} />
          </Routes>
          </Suspense>
        </Box>
      </Router>
    </Context>
  );
}

export default App;

