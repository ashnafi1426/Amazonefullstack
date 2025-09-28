import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingg from './Pages/Landing/Landingg';
import Authss from './Pages/Auth/Authss'; // ✅ Capitalized
import Payment from './Pages/payment/Payments';
import Orders from './Pages/Orders/Orders';
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetaill";
import Results from "./Pages/Results/Result";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landingg />} />
      <Route path="/auths" element={<Authss />} /> {/* ✅ Capitalized */}
      <Route path="/payments" element={<Payment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

export default Routing;

