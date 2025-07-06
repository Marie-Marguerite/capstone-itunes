// model/Todo.js

// NOTE: Mongoose model definition for a single Todo

const mongoose = require("mongoose");

//* DEFINE STRUCTURE/SCHEMA FOR EACH TODO DOCUMENT
const TodoSchema = new mongoose.Schema({
  // TEXT CONTENT
  content: {
    type: String,
    required: true, // must be provided
    maxlength: 140, // enforced (and in middleware)
  },

  // TRACK IS MARKED AS COMPLETE
  completed: {
    type: Boolean,
    default: false, // default: incomplete
  },

  // REFERENCE USER LINKED TO TODO
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to a document in "User" collection
    required: true, // ensures every todo is toed to a user
  },
});

//* EXPORT (for use in route/controller files)
module.exports = mongoose.model("Todo", TodoSchema);
