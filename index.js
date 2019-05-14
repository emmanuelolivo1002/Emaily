const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// Mongoose Models
require("./models/User");

// Run what's in passport.js file
require("./services/passport");

// Mongo connection
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// ****** MIDDLEWARE START *******

// Configuration for cookies with express
app.use(
  cookieSession({
    // maxAge: 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// Setup Passport with express
app.use(passport.initialize());
app.use(passport.session());

// ****** MIDDLEWARE END *******

//Import auth routes and Call auth routes with our app object
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
