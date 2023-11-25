import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, isAdmin, handleLogout, products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on the search query
    if(products) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(filteredProducts);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad Eshop
        </Typography>

        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search products"
            inputProps={{ 'aria-label': 'search products' }}
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>

        {isLoggedIn ? (
          <>
            {/* Display search results */}
            {searchResults.length > 0 && (
              <div>
                <Typography variant="subtitle1">Search Results:</Typography>
                <ul>
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Other navigation elements */}
            {isAdmin && (
              <Button color="inherit" component={Link} to="/add-products">
                Add Products
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Other navigation elements */}
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
