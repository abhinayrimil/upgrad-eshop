
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Select, MenuItem } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import sampleProducts from './sample.js';
import './Products.css';

const Products = ({ isAdmin }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  const fetchCategories = useCallback(() => {
    const categories = [...new Set(sampleProducts.map(product => product.category))];
    setCategories(categories);
  }, []);

  const fetchProducts = useCallback(() => {
    let filteredProducts = sampleProducts;
    if (selectedCategory !== 'All') {
      filteredProducts = sampleProducts.filter(product => product.category === selectedCategory);
    }
    switch (sortOption) {
      case 'priceHighToLow':
        filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'priceLowToHigh':
        filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    setProducts(filteredProducts);
  }, [selectedCategory, sortOption]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleAddProduct = () => {
    navigate('/add-products');
  

  };
  return (
    <div className="products-container">
      <div>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
          <MenuItem value="priceLowToHigh">Price Low To High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </div>

<ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Card>
              <CardContent>
                <p>{product.name}</p>
                <p>{product.price}</p>
                {/* Display product image */}
                <img src={product.imageUrl} alt={product.name} />
                {/* Add other product details */}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div className="add-products">
          {/* Option to add products */}
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}

    </div>

    
  );
};

export default Products;
