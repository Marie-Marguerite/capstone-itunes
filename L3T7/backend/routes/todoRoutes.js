// routes/todoRoutes.js

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

const authenticateToken = require("../middleware/authenticateToken");
const {
  requireJson,
  rejectLongTodos,
  gmailOnly,
} = require("../middleware/requestCheck");

//* GLOBAL MIDDLEWARE: all below routes require:
//  - Login
router.use(authenticateToken);
//  - Gmail address
router.use(gmailOnly);

//* GET ALL TODOS
//  (Private - fetch all user's todos if user is logged in)
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos." });
  }
});

//* CREATE/POST NEW TODO
//  (Private - add new todo for logged in user)
router.post("/", requireJson, rejectLongTodos, async (req, res) => {
  const { content } = req.body;

  //  Middleware already checks for content-type and length
  if (!content) {
    return res.status(400).json({ message: "Content is required." });
  }

  try {
    const newTodo = await Todo.create({
      content,
      completed: false,
      user: req.user.id,
    });
    res.status(201).json({ todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo." });
  }
});

//* EDIT/PUT TODO CONTENT
//  (Private - update content of a specific todo)
router.put("/:id", requireJson, rejectLongTodos, async (req, res) => {
  const { content } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { content },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Failed to update todo." });
    }

    res.json({ todo });
  } catch (error) {
    res.status(500).json({ message: "failed to update todo." });
  }
});

//* DELETE TODO
//  (Private - delete a specific todo)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.json({ message: "Todo deleted." });
  } catch (error) {
    res.status(500).json({ message: "Delete failed." });
  }
});

//* TOGGLE/PATCH TODO COMPLETE/INCOMPLETE
//  (Private - toggle the completion status (checkbox))
router.patch("/:id/toggle", requireJson, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({ todo });
  } catch (error) {
    res.status(500).json({ message: "Toggle failed." });
  }
});

//* EXPORT
module.exports = router;
