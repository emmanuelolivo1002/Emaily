module.exports = (req, res, next) => {
  // Check if user is logged in
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  // Call next middleware
  next();
};
