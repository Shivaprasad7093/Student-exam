
import React, { useState } from 'react';
export default function Register({ onSwitch }){
  const [name,setName]=useState('User');
  const [email,setEmail]=useState('test@example.com');
  const [password,setPassword]=useState('pass123');
  const [msg,setMsg]=useState('');
  const submit = async e => {
    e.preventDefault();
    const r = await fetch('http://localhost:5000/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});
    const j = await r.json();
    if(j.token){ setMsg('Registered. You can login.'); } else setMsg(j.error||'Error');
  };
  return (<div style={{padding:20}}>
    <h2>Register</h2>
    <form onSubmit={submit}>
      <div><input value={name} onChange={e=>setName(e.target.value)} placeholder="name" /></div>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" /></div>
      <button type="submit">Register</button>
    </form>
    <p>{msg}</p>
    <p>Have an account? <button onClick={onSwitch}>Login</button></p>
  </div>);
}
