
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';
dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/examapp';

const data = [
  { text: 'What is 2+2?', options:['1','2','3','4'], correctIndex:3 },
  { text: 'Capital of France?', options:['London','Berlin','Paris','Rome'], correctIndex:2 },
  { text: 'Which is a JS framework?', options:['Django','Flask','React','Laravel'], correctIndex:2 },
  { text: 'HTML stands for?', options:['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks Text', 'None'], correctIndex:0 },
  { text: 'CSS used for?', options:['Styling','Backend','Database','Testing'], correctIndex:0 }
];

mongoose.connect(MONGO).then(async ()=>{
  console.log('connected');
  await Question.deleteMany({});
  await Question.insertMany(data);
  console.log('seeded');
  process.exit(0);
}).catch(e => { console.error(e); process.exit(1); });
