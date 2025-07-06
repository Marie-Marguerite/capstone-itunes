// models/User.js

const mongoose = require("mongoose");

// NOTE: Mongoose model definition for a single User

const userSchema = new mongoose.Schema({
  //* USER EMAIL
  email: {
    type: String,
    require: true,
    unique: true, // ensures no duplicate emails (thus no duplicate users)
    lowercase: true, // store in lowercase
  },

  //* USER PASSWORD (HASHED)
  password: {
    type: String,
    required: true,
  },
});

//* EXPORT (for use in route/controller files)
module.exports = mongoose.model("User", userSchema);
