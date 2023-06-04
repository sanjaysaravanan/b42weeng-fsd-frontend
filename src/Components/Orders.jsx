import React, { useEffect, useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';
import { Link, Navigate } from 'react-router-dom';


const Orders = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    if (user.isSeller) {
      const response = await backendInstance.get(`/order/seller`);
      setProducts(response.data.items);
    }
  }

  const approveItem = async (productId) => {
    // approve item logic
  }

  const cancelItem = async (productId) => {
    // approve item logic
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.isSeller) {
    return <Navigate to="/" replace />
  }

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {products.map(({ id, seller, name, qty, price, imageUrl }) => (
          <div
            style={{
              border: '1px solid',
              margin: '16px',
              textAlign: 'center'
            }}
          >
            <img src={imageUrl} alt={name} style={{ height: 100, width: 120 }} />
            <div
              style={{
                padding: '16px'
              }}
            >
              <h4>{name}</h4>
              Price:  ${price}
              <br />
              <button>Remove From Cart</button>
            </div>
          </div>
        ))}

      </div>

      {products.length === 0 && (
        <h3>
          No Orders yet
        </h3>
      )}
    </div>
  )
};

export default Orders;