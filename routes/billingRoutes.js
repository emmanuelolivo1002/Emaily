const keys = require("../config/keys");

const stripe = require("stripe")(
  // Secret Key
  keys.stripeSecretKey
);

// Middleware to check if user is logged in
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // Create charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      // id from token object that was included in the req.body
      source: req.body.id
    });

    // After successfully charging user, add credits to user model assigned by passport
    req.user.credits += 5;

    // Save user in database
    const user = await req.user.save();

    // Respond post request with updated user
    res.send(user);
  });
};
