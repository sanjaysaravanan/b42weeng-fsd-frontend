import React, { useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';
import { Navigate } from 'react-router-dom';

const AddProduct = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [addedStatus, setStatus] = useState(false);

  const [formData, setData] = useState({
    name: '',
    qty: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const openMsg = () => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 4000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await backendInstance.post('/products', formData);
    console.log(data);
    openMsg();
    e.target.reset();
  }


  if (!user.isSeller) {
    return <Navigate to="/" replace />
  }

  return (
    <>
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
        <label htmlFor='qty'  >Quantity</label>
        <br />
        <input
          type='number'
          id="qty"
          name="qty"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor='imageUrl'  >Product Image</label>
        <br />
        <input
          type='url'
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor='price'  >Price</label>
        <br />
        <input
          type='number'
          id="price"
          name="price"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input type='submit' />
      </form>
      {addedStatus && <div
        style={{
          height: '50px',
          width: '200px',
          backgroundColor: 'green',
          color: 'white',
          position: 'absolute',
          textAlign: 'center',
          bottom: '50px',
          right: '20px'
        }}
      >
        <h4>Added Successfully</h4>
      </div>}
    </>
  )
}


export default AddProduct;