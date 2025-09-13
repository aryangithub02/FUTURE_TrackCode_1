// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import basicAuth from 'express-basic-auth';
import contactRoutes from "./routes/contacts.js"; 
import feedbackRoutes from './routes/feedbacks.js';  // MongoDB feedback routes

const app = express();
const PORT = 4000; // Backend port
const MONGO_URI = process.env.MONGO_URI;
// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- ROUTES --------------------
app.use('/api/feedback', feedbackRoutes);   // Feedback API (MongoDB)
app.use("/api/contact", contactRoutes);     // Contact API

// -------------------- AUTH MIDDLEWARE --------------------
const authMiddleware = basicAuth({
  users: { 'admin': 'admin@aryan' },
  challenge: true,
  unauthorizedResponse: 'Unauthorized Access! Please provide valid credentials.'
});

// -------------------- ADMIN ROUTE --------------------
app.get('/admin', authMiddleware, (req, res) => {
  res.send('Welcome to the admin panel!');
});

// -------------------- TEST ROUTE --------------------
app.get("/", (req, res) => {
  res.json({ message: "✅ API running" });
});

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update feedback status
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send reply to feedback
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// -------------------- MONGODB SETUP & START SERVER --------------------
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
