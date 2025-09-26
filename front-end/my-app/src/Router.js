import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingg from './Pages/Landing/Landingg';
import SignIn from './Pages/Auth/SignIn';
import Paymentt from './Pages/ProductDetail/ProductDetaill';
import Orders from './Pages/Orders/Orders';
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetaill";
import Results from "./Pages/Results/Result";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landingg />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Payment" element={<Paymentt />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

export default Routing;

