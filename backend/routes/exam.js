
import express from 'express';
import auth from '../middleware/auth.js';
import Question from '../models/Question.js';
const router = express.Router();

// return randomized questions (limit 10)
router.get('/start', auth, async (req, res) => {
  const q = await Question.aggregate([{ $sample: { size: 10 } }]);
  // send without correctIndex
  const safe = q.map(({ _id, text, options }) => ({ id: _id, text, options }));
  res.json({ questions: safe, durationMinutes: 30 });
});

// submit answers: { answers: [{ questionId, answerIndex }] }
router.post('/submit', auth, async (req, res) => {
  const { answers } = req.body;
  if(!answers) return res.status(400).json({ error: 'Missing answers' });
  const ids = answers.map(a => a.questionId);
  const qs = await Question.find({ _id: { $in: ids }});
  const byId = {};
  qs.forEach(q=> byId[q._id] = q);
  let correct = 0;
  answers.forEach(a => {
    const q = byId[a.questionId];
    if(!q) return;
    if(q.correctIndex === a.answerIndex) correct++;
  });
  const score = correct;
  res.json({ score, total: answers.length });
});

export default router;
