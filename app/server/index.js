import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY =
  "pk_test_51NWLOgSGImYjEZiO3VpZDXMd6r7TQN1yHNdsyzoCly63ftLrtjv1ZmTjj7eroVjzEKnLhJVqA7ysgBqoPpTNronL00qoBwX6t7";
const SECRET_KEY =
  "sk_test_51NWLOgSGImYjEZiOxOGv3b5xxbeZtSL2Vto244kNnXdBEJUcL4t6w3h1UyaqgkHVugaPosIXNG7B7AY7IVhn6Tjw00oYiIX6JT";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});