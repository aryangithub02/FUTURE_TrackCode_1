const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Show that server.js file is running
console.log("📂 server.js started...");

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "portfolio", // your DB name
})
.then(() => {
  console.log("✅ MongoDB Connected successfully!");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", db: mongoose.connection.readyState });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
