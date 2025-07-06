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
router.get("/", async (request, response) => {
  try {
    const todos = await Todo.find({ user: request.user.id });
    response.json({ todos });
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch todos." });
  }
});

//* CREATE/POST NEW TODO
//  (Private - add new todo for logged in user)
router.post("/", requireJson, rejectLongTodos, async (request, response) => {
  const { content } = request.body;

  //  Middleware already checks for content-type and length
  if (!content) {
    return response.status(400).json({ message: "Content is required." });
  }

  try {
    const newTodo = await Todo.create({
      content,
      completed: false,
      user: request.user.id,
    });
    response.status(201).json({ todo: newTodo });
  } catch (error) {
    response.status(500).json({ message: "Failed to add todo." });
  }
});

//* EDIT/PUT TODO CONTENT
//  (Private - update content of a specific todo)
router.put("/:id", requireJson, rejectLongTodos, async (request, response) => {
  const { content } = request.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: request.params.id, user: request.user.id },
      { content },
      { new: true }
    );

    if (!todo) {
      return response.status(404).json({ message: "Failed to update todo." });
    }

    response.json({ todo });
  } catch (error) {
    response.status(500).json({ message: "failed to update todo." });
  }
});

//* DELETE TODO
//  (Private - delete a specific todo)
router.delete("/:id", async (request, response) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: request.params.id,
      user: request.user.id,
    });

    if (!deleted) {
      return response.status(404).json({ message: "Todo not found." });
    }

    response.json({ message: "Todo deleted." });
  } catch (error) {
    response.status(500).json({ message: "Delete failed." });
  }
});

//* TOGGLE/PATCH TODO COMPLETE/INCOMPLETE
//  (Private - toggle the completion status (checkbox))
router.patch("/:id/toggle", requireJson, async (request, response) => {
  try {
    const todo = await Todo.findOne({
      _id: request.params.id,
      user: request.user.id,
    });

    if (!todo) {
      return response.status(404).json({ message: "Todo not found." });
    }

    todo.completed = !todo.completed;
    await todo.save();

    response.json({ todo });
  } catch (error) {
    response.status(500).json({ message: "Toggle failed." });
  }
});

//* EXPORT
module.exports = router;
