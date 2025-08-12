
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function(req, res, next){
  const auth = req.header('authorization') || req.header('Authorization');
  if(!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: 'Invalid token' });
  }
}
