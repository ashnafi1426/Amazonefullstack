import React, { useState, useContext } from 'react';
import classes from "./payment.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Layoutt from '../../components/Layout/Layoutt';
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.Type";
import {db} from "../../Utility/firebase"

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [Processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  const handleChange = (e) => {
    setCardError(e.error?.message || "");
  };

  const handlePayment = async (e) => {
  e.preventDefault();
  setProcessing(true);

  if (!stripe || !elements) {
    setCardError("Stripe has not loaded.");
    setProcessing(false);
    return;
  }

  try {
    const amount = Math.round(total * 100);
    const response = await axiosInstance.post(`/payment/create?total=${amount}`);
    const clientSecret = response.data?.clientSecret;

    console.log("🔐 Client secret:", clientSecret);

    if (!clientSecret) throw new Error("Client secret not received.");

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: user?.email,
          address: { postal_code: "12345" }, // optional
        },
      },
    });

    console.log("💰 PaymentIntent:", paymentIntent);
    console.log("⚠️ Error:", error);

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      setCardError("Payment failed. Please try again.");
      setProcessing(false);
      return;
    } 

    await setDoc(
      doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
      {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }
    );

    dispatch({ type: Type.EMPTY_BASKET });
    setProcessing(false);
    navigate("/orders", { state: { msg: "You have placed a new order." } });

  } catch (err) {
    console.error("❌ Payment error:", err);
    setCardError(err.message || "Something went wrong.");
    setProcessing(false);
  }
};


  return (
    <Layoutt>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement 
                  onChange={handleChange}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: "#424770",
                        '::placeholder': { color: "#aab7c4" },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                    hidePostalCode: false,
                  }}
                />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={Processing || !stripe || !elements}>
                    {Processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layoutt>
  );
};

export default Payment;
