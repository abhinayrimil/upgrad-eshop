

import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock'; // Import Lock icon
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();


    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
      setError('Please fill in all fields.');
      return;
    }

    // Additional validation (e.g., password match)
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear any previous error
    setError('');

    // If validation passes, call your signup logic
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          contactNumber,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Read the error message as text
        setError(errorMessage || 'Failed to create a new user.');
        return;
      }

      const data = await response.json();
      console.log('User successfully created:', data);

      navigate('/products');

    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <Card className="card-container">
      <LockIcon fontSize="large" color="primary" className="lock-icon" />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
            className="form-element"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
            className="form-element"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            className="form-element"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            className="form-element"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            className="form-element"
          />
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            fullWidth
            className="form-element"
          />
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" className="signup-button">
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Signup;
