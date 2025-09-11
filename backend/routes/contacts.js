import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    console.log("✅ Contact saved to MongoDB:", newMessage);

    res.status(201).json({ success: true, message: "Contact saved successfully" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ success: false, error: "Failed to save contact" });
  }
});

export default router;
