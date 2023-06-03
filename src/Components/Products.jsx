import React, { useEffect, useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';



const Products = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await backendInstance.get('/products');
    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      {products.map((product) => (
        <div
          style={{
            border: '1px solid',
            margin: '16px'
          }}
        >
          {product.name}
        </div>
      ))}
    </div>
  )
};

export default Products;