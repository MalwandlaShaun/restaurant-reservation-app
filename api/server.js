const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000; //add your port here
//const PUBLISHABLE_KEY = "ADD_PUBLISHABLE KEY HERE";
const SECRET_KEY =
  "sk_test_51NXguhJXXMypkLV2uXeyZY6X3JGvQnLTfHuHbtY5oWgIk1lrfbQIHy2JJP9U9BK4ELbvZUkGnEk9cPNyGZDNrzLg00ZdeFTehZ";
const Stripe = require("stripe");

//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log("it reaches the server at least");
    console.log(e.message);
    res.json({ error: e.message });
  }
});
