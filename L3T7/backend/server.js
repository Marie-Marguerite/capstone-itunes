// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Route files
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

// Load environment variables
dotenv.config();

// Initialise Express app
const app = express();

//* MIDDLEWARE
app.use(cors()); // enable CORS for all routes (allows front-ed requests)
app.use(express.json()); // automatically parse incoming JSON requests

//* AUTH ROUTES - handle login & registration
app.use("/api", authRoutes);

//* TODO ROUTES - handles protected CRUD routes to todos
app.use("/todos", todoRoutes);

//* CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error: ", error));

//* START SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
