// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Landing from "./Pages/Landing/Landingg";
// import Auth from "./Pages/Auth/SignIn";
// // import Payment from "./Pages/";
// import Orders from "./Pages/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import ProductDetail from "./Pages/ProductDetail/Payment";
// // import { Elements } from "@stripe/react-stripe-js";
// // import { loadStripe } from "@stripe/stripe-js";
// // import ProtecteRoute from "./component/Protect/";
// const Routing = () => {
// //   const stripePromise = loadStripe(
// //     "pk_test_51S4i53JE5X0bPcJdwNufSlpqrd19GnXeskgFO17XWreqdqw56zLKdVPisy4LqObvEXzLLqZeDjNx2roshzTy66i800B9lfKxWq"
// //   );

//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/auth" element={<Auth />} />
//       {/* <Route
//         path="/payments"
//         element={
//         //   <ProtecteRoute msg={"You must log in to pay"} redirect={"/auth"}>
//         //     <Elements stripe={stripePromise}>
//         //       <Payment />
//         //     </Elements>
//         //   </ProtecteRoute>
//         } 
//       />*/}
//       {/* <Route
//         path="/orders"
//         element={
//         //   <ProtecteRoute msg={"You must log in to access your orders"} redirect={"/auth"}>
//         //     <Orders />
//         //   </ProtecteRoute>
//         }
//       /> */}
//       <Route path="/products/:productId" element={<ProductDetail />} />
//       {/* <Route path="/cart" element={<Cart />} /> */}
//     </Routes>
//   );
// };

// export default Routing;
import Results from "./Pages/Results/Result";
import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Landingg from './Pages/Landing/Landingg';
import SignIn from './Pages/Auth/SignIn';
import Paymentt from './Pages/ProductDetail/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from "./Pages/Cart/Cart"
<Route path="/category/:categoryName" element={<Results />} />
function Routing() {
  return (
<Routes>
  <Route path='/'element={<Landingg/>}/>
  <Route path='/SignIn' element={<SignIn/>}/>
  <Route path='/Payment' element={<Paymentt/>}/>
  <Route path='/orders' element={<Orders/>}/>
  <Route path='/cart' element={<Cart/>}/>
<Route path="/category/:categoryName" element={<Results/>} />
</Routes>
  )
}

export default Routing;
