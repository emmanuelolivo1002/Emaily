module.exports = (req, res, next) => {
  // Check if user has enough credits
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" });
  }

  // Call next middleware
  next();
};
