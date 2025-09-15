const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const userRoutes = require("./routes/user.route");
const noteRoutes = require("./routes/note.route");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",                  // local frontend
  "https://my-note-app-henna.vercel.app"    // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman ya same-origin requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));



// Other middlewares
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

// Error handler
app.use(errorHandler);

module.exports = app;
