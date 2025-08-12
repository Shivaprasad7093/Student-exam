
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import examRoutes from './routes/exam.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/examapp';
mongoose.connect(MONGO)
  .then(()=> console.log('Mongo connected'))
  .catch(e => console.error('Mongo error', e));

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
