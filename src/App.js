import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './App.css';

import Login from "./pages/Login";
import Register from './pages/Register';
import Layout from './pages/Layout';

import Products from './Components/Products';


function App() {
  return (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
