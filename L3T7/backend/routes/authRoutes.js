// routes/authRoutes.js

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { gmailOnly, requireJson } = require("../middleware/requestCheck");

const router = express.Router(); // initalise router

//* ROUTE: POST /register
//  (Public - register new user)
router.post("/register", requireJson, gmailOnly, registerUser);

//* ROUTE: POST /login
//  (Public - log in existing user & return JWT token)
router.post("/login", loginUser);

module.exports = router;
