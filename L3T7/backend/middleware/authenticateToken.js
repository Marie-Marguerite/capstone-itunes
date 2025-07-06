// middleware/authenticateToken.js

/*
  NOTE: ensures that only an authenticated/logged in user can 
  access/see/add/edit todos. 
*/

const jwt = require("jsonwebtoken");

function authenticateToken(request, response, next) {
  //* GET THE TOKEN
  //  Read the authorisation header ("Bearer <token>")
  const authHeader = request.headers["authorization"];

  //  Extract only token (not "Bearer")
  const token = authHeader && authHeader.split(" ")[1];

  //* REJECT: IF NO TOKEN
  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied - no token provided." });
  }

  try {
    //* VERIFY TOKEN (using secret used to sign in)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Attach decoded user data to request (like email)
    request.user = decoded;

    //  Continue to next middleware or route handler
    next();
  } catch (error) {
    // IF: DENY ACCESS IF TOKEN VERIFICATION FAILS (eg. expired)
    response.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
