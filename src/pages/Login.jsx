import React, { useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [formData, setData] = useState({
    email: '',
    password: '',
  });

  const [isLoggedIn, setLoggedIn] = useState(user.accessToken !== undefined)

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await backendInstance.post('/auth/login', formData);
    localStorage.setItem('user', JSON.stringify(data));
    e.target.reset();
    setLoggedIn(true);
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <form
      style={{
        padding: '16px'
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor='email'  >Email</label>
      <br />
      <input
        type='email'
        id="email"
        name="email"
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <label htmlFor='password'  >Password</label>
      <br />
      <input
        type='password'
        id="password"
        name="password"
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <input type='submit' />
    </form>
  )
}


export default Login;