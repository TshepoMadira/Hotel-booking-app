import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // This is where Firebase authentication code was removed
      // Add your custom login logic here
      console.log('User logged in:', form);

      // Reset form or navigate to another page upon successful login if needed
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <div style={{ marginTop: '10px' }}>
        <a href="/signup">Need an account? Sign Up</a>
      </div>
    </div>
  );
};

export default LoginPage;
