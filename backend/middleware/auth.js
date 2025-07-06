// middleware/auth.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorisation;
  const token = authHeader && authHeader.split(" ")[1];

  if (token !== "dummy.jwt.token.here") {
    return res.status(401).json({ message: "Unauthorised or missing token" });
  }

  next();
};

module.exports = verifyToken;
