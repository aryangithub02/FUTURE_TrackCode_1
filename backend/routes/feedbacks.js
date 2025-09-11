import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
