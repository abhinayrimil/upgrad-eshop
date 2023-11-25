import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      return;
    }

    // Basic password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Clear any previous error
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          // firstName,
          // lastName,
          // email,
          // password,
          // contactNumber,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Read the error message as text
        setError(errorMessage || 'Failed to create a new user.');
        return;
      }

      const data = await response.json();
      console.log('User successfully created:', data);

      // Redirect user to the home page or login page after successful signup
      // You can use useHistory() for programmatic navigation
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred.');
    }

    // If validation passes, call handleLogin
    handleLogin(email, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
