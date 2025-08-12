
import React, { useState } from 'react';
export default function Login({ onLogin, onSwitch }){
  const [email,setEmail]=useState('test@example.com');
  const [password,setPassword]=useState('pass123');
  const [err,setErr]=useState('');
  const submit = async e => {
    e.preventDefault();
    try{
      const r = await fetch('http://localhost:5000/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
      const j = await r.json();
      if(j.token) onLogin(j.token); else setErr(j.error||'Login failed');
    }catch(e){ setErr('Network'); }
  };
  return (<div style={{padding:20}}>
    <h2>Login</h2>
    <form onSubmit={submit}>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" /></div>
      <button type="submit">Login</button>
    </form>
    <p style={{color:'red'}}>{err}</p>
    <p>Don't have an account? <button onClick={onSwitch}>Register</button></p>
  </div>);
}
