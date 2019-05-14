const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// User model class
const User = mongoose.model("users");

// Serialize user function definition
passport.serializeUser((user, done) => {
  // Done callback with no error and the id in the user collection that will be added to the cookie
  done(null, user.id);
});

// Deserialize user function with the id from the cookie and done function
passport.deserializeUser((id, done) => {
  // Find user in database
  User.findById(id).then(user => {
    // Find by id returns the user from database
    // Call done function
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Callback function when signed in
      // Find if user is already in database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // If user exist call done function with no error and return
        return done(null, existingUser);
      }
      // Create a user instance if existingUser doesn't exist
      const user = await new User({ googleId: profile.id }).save();
      // When new user is saved call done function with no error
      done(null, user);
    }
  )
);
