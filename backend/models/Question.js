
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctIndex: Number
});

export default mongoose.model('Question', QuestionSchema);
