import React, { useEffect, useState } from 'react';
import backendInstance from '../axiosInstances/backendInstance';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Products = () => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    if (user.isSeller) {
      const response = await backendInstance.get(`/products?seller=${user.email}`);
      setProducts(response.data);
    } else {
      const response = await backendInstance.get('/products');
      setProducts(response.data);
    }
  }

  const deleteProduct = async (productId) => {
    await backendInstance.delete(`/products/${productId}`);
    setProducts(products.filter(({ id }) => id !== productId));
  }

  const addToCart = async (productId) => {
    const { data } = await backendInstance.post(`/cart/add?productId=${productId}`);
    dispatch({ type: 'ADD_TO_CART', items: data.items, totalAmount: data.totalAmount })
    // console.log(response);
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Available Units: {qty}
              <br />
              {user.isSeller && (
                <>
                  <button>Edit</button>&nbsp;&nbsp;
                  <button
                    onClick={() => deleteProduct(id)}
                  >Delete</button>
                </>
              )}
              <br />
              {!user.isSeller && <><p><b>Seller: </b>{seller}</p>
                <br />
                <button
                  onClick={() => addToCart(id)}
                >Add To Cart</button>
              </>}
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <h3>
          No Products found,
          Click <Link to="/addProduct" >Here</Link> to Add
        </h3>
      )}
      {!user.isSeller && (
        <Link
          to="/cart"
        >
          Go To Cart
        </Link>
      )}
      {user.isSeller && (
        <Link
          to="/orders"
        >
          Go To Orders
        </Link>
      )}
    </div>
  )
};

export default Products;