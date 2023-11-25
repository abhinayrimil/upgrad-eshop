import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message || 'Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>; // Consider using a spinner or loading animation
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  if (!product) {
    return null; // Or handle the case when the product is not found
  }

  const { name, imageUrl, description } = product;

  return (
    <div className="product-details">
      <h2>{name}</h2>
      <img src={imageUrl || 'alternate_text_for_accessibility'} alt={name} />
      <p>{description}</p>
      <input type="number" min="1" placeholder="Quantity" /> {/* Quantity input */}
      {/* Other product details display */}
    </div>
  );
};

export default ProductDetails;

