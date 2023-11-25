
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddProducts from './components/AddProducts/AddProducts';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';

const App = () => {
  const isLoggedIn = false; // Set this based on user login status
  const isAdmin = true; // Set this based on user role

  const handleLogout = () => {
    // Implement logout functionality
    console.log('User logged out');
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={() => {}} />} />
        <Route path="/signup" element={<Signup />} />
        {isAdmin && <Route path="/add-products" element={<AddProducts />} />}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
