const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});
app.get("/greet", async (req, res) => {
    res.send("Hello world");
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));