

import React, { useState } from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import './AddProducts.css';
const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddProduct = () => {
    // Add your logic to send the product data to the server (e.g., via API)
    console.log('Adding product:', { productName, category, price, description });
    // Reset form fields after submitting
    setProductName('');
    setCategory('');
    setPrice('');
    setDescription('');
  };

  return (
    <Card>
      <CardContent>
        <h1>Add New Product</h1>
        <TextField
          label="Product Name"
          value={productName}
          onChange={handleProductNameChange}
          fullWidth
        />
        <TextField
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
