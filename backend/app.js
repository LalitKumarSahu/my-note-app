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

const allowedOrigins = [
  "http://localhost:3000",              // local dev
  "https://your-frontend.vercel.app"    // replace with your actual Vercel frontend URL
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman ya same-origin requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy: Origin not allowed";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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
