const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

// Run what's in passport.js file
require("./services/passport");

// Mongo connection
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

//Import auth routes and Call auth routes with our app object
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
