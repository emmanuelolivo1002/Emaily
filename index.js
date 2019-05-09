const express = require("express");

// Run what's in passport.js file
require("./services/passport");

const app = express();

//Import auth routes and Call auth routes with our app object
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
