
import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Exam from './pages/Exam';
import Result from './pages/Result';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('login');
  const [result, setResult] = useState(null);

  if(!token && page === 'login') return <Login onLogin={t=>{setToken(t); localStorage.setItem('token', t); setPage('exam')}} onSwitch={()=>setPage('register')} />
  if(!token && page === 'register') return <Register onSwitch={()=>setPage('login')} />
  if(page === 'exam') return <Exam token={token} onLogout={()=>{setToken(null); localStorage.removeItem('token'); setPage('login')}} onFinish={r=>{setResult(r); setPage('result')}} />
  if(page === 'result') return <Result result={result} onBack={()=>setPage('exam')} />
  return null;
}
