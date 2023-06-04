import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.js'

import './App.css';

import Login from "./pages/Login";
import Register from './pages/Register';
import Layout from './pages/Layout';

import Products from './Components/Products';
import AddProduct from './Components/AddProduct';
import Cart from './Components/Cart';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="/:productId" element={<h1>Product Page Coming Soon</h1>} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<h1>Orders Page</h1>} />
            <Route path="/profile" element={<h1>Profile Page</h1>} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
