
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Missing' });
  try{
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: 'User exists' });
    const hashed = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
  }catch(e){
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error: 'Invalid' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ error: 'Invalid' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
  }catch(e){
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
