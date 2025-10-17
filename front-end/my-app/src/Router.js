// App/Routing.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingg from './Pages/Landing/Landingg';
import Authss from './Pages/Auth/Authss';
import Payment from './Pages/payment/Payments';
import Orders from './Pages/Orders/Orders';
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetaill";
import Results from "./Pages/Results/Result";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRout from './components/Protect/ProtectedRout';

const stripePromise = loadStripe("pk_test_51SCT4H1QdpCkIvwkeUYV0USBaVb8T8rS3FWncRoQeu6xD319UmOg96VWFcxpxma2jICNh6VZz70t284T2FEQ3O4f00xrCRbMnP");

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landingg/>} />
      <Route path="/auths" element={<Authss />} />
      <Route
        path="/payments"
        element={
          <ProtectedRout msg="You must log in to pay" redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRout>
        }
      />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

export default Routing;
