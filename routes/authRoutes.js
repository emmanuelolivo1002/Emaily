const passport = require("passport");

module.exports = app => {
  // Google log in
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Logout
  app.get("/api/logout", (req, res) => {
    // Logout function attached to req by passport
    req.logout();
    res.send(req.user);
  });

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
