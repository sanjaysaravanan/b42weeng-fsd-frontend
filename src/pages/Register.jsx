import React, { useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';
import { Navigate } from 'react-router-dom';

const Register = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    gst: ''
  });

  const [isSeller, setSeller] = useState(false);

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      console.log(formData)
      alert('Passwords does not match');
      return;
    } else {
      delete formData.confirmpassword;
    }
    const { data } = await backendInstance.post('/auth/register', { ...formData, isSeller });
    console.log(data);
    e.target.reset();
  }


  if (user.accessToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <form
      style={{
        padding: '16px'
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name'  >Name</label>
      <br />
      <input
        type='text'
        id="name"
        name="name"
        onChange={handleChange}
        required
      />
      <br />
      <br />
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
      <label htmlFor='confirmpassword'  >Confirm Password</label>
      <br />
      <input
        type='password'
        id="confirmpassword"
        name="confirmpassword"
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <input
        type="checkbox"
        id="seller"
        name="seller"
        checked={isSeller}
        onChange={(e) => {
          setSeller(e.target.checked);
        }} />
      <label htmlFor='seller'  >Seller Registration</label>
      <br />
      <br />
      {isSeller && <>
        <label htmlFor='gst'>Gst</label>
        <br />
        <input
          type='text'
          id="gst"
          name="gst"
          onChange={handleChange}
          required
        />
        <br />
        <br />
      </>}
      <input type='submit' />
    </form>
  )
}


export default Register;