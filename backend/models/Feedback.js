import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

// Third argument specifies the exact collection name
const Feedback = mongoose.model('Feedback', feedbackSchema, 'contacts');

export default Feedback;
