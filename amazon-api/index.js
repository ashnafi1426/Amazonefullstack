const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { error } = require("firebase-functions/logger");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success !",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    console.log("payment received ",total)
const paymentIntent = await stripe.paymentIntents.create({
  amount: total,
  currency: "usd",
  payment_method_types: ["card"], // <- important
});
    // console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404).json({ message: "total must be geater than 0" });
  }
});
app.listen(5003, (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.log("✅ Server is running on port 5003");
  }
});
// module.exports = app;