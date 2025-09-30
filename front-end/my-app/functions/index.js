// Use modular, 2nd gen imports for better performance and features
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger"); // For structured logging

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Apply CORS and JSON parsing middleware
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success !",
  });
});

app.post("/payment/create", async (req, res) => {
  // 1. Get amount from the secure body instead of query string
  const { amount } = req.body;

  // 2. Validate input more rigorously
  if (amount === undefined || amount === null) {
    return res.status(400).json({ error: "Payment amount is required." });
  }

  const total = parseInt(amount);
  if (isNaN(total) || total <= 0) {
    return res.status(400).json({ error: "Total must be a positive number." });
  }

  // 3. Add comprehensive error handling
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      // Good practice: Add metadata for tracking
      metadata: { integration_check: 'accept_a_payment' },
    });

    // 4. Use structured logging instead of console.log
    logger.info("PaymentIntent created successfully", { paymentIntentId: paymentIntent.id });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    // Log the full error for debugging
    logger.error("Error creating PaymentIntent", error);
    
    // Send a generic error message to the client
    res.status(500).json({ error: "Internal server error. Could not process payment." });
  }
});

// Set global options for all functions (2nd gen syntax)
setGlobalOptions({
  maxInstances: 10,
  // You can also set region here, e.g., region: 'us-central1'
});

// Export the API using the v2 onRequest handler
exports.api = onRequest(app);