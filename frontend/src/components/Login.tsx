import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/login', formData);
    const { token } = response.data; // Assuming server sends back a JWT token
    localStorage.setItem('token', token); // Store the token in local storage
    console.log('Login successful');
    // Redirect the user to the home page or any other authenticated route
  } catch (error) {
    console.error('Error logging in: ', error);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
