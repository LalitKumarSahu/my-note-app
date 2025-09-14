const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // logger
require("dotenv").config();

// Routes
const userRoutes = require("./routes/user.route");
const noteRoutes = require("./routes/note.route");

// Error middleware
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend ka URL
  credentials: true,              // cookies allow karne ke liye
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Error handler (last middleware)
app.use(errorHandler);

module.exports = app;
