// controllers/authController.js

const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken"); // for creating JWTs
const User = require("../models/User");

//* 1. REGISTER USER
async function registerUser(req, res) {
  const { email, password } = req.body;

  // CHECK: EMAIL & PASSWORD REQUIRED
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // CHECK: DUPLICATE USER (ALREADY EXISTS)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  // HASH PASSWORD (using bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // CREATE USER AND SAVE TO MONGODB
  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during user registration." });
  }
}

//* 2. LOGIN USER
async function loginUser(req, res) {
  const { email, password } = req.body;

  // CHECK REQUIRED FIELDS (VALIDATE INPUT)
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // FIND USER IN DATABASE BY EMAIL
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "No user registered with that email." });
  }

  // COMPARE PASSWORDS (PROVIDED VS DATABASE)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // GENERATE JWT TOKEN (EXPIRES: 1H)
  const payload = { email: user.email, id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    message: "Login successful.",
    token,
  });
}

//* EXPORT CONTROLLER FUNCTIONS
module.exports = {
  registerUser,
  loginUser,
};
