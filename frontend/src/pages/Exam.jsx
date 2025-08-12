
import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';

export default function Exam({ token, onLogout, onFinish }){
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState(30);

  useEffect(()=> {
    fetch('http://localhost:5000/api/exam/start', { headers: { Authorization: 'Bearer '+token }})
      .then(r=>r.json()).then(j=>{ setQuestions(j.questions || []); setDuration(j.durationMinutes || 30); });
  }, []);

  const choose = (i) => {
    setAnswers(a => ({...a, [questions[idx].id]: i}));
  };

  const submit = async () => {
    const payload = { answers: Object.keys(answers).map(k => ({ questionId: k, answerIndex: answers[k] })) };
    const r = await fetch('http://localhost:5000/api/exam/submit',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(payload)});
    const j = await r.json();
    onFinish(j);
  };

  if(!questions.length) return <div>Loading...</div>;
  const q = questions[idx];
  return (<div style={{padding:20}}>
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <h3>Exam</h3>
      <div>
        <Timer minutes={duration} onTimeUp={submit} />
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
    <div style={{marginTop:20}}>
      <div><strong>Q{idx+1}:</strong> {q.text}</div>
      <div style={{marginTop:10}}>
        {q.options.map((opt, i) => (
          <div key={i}>
            <label>
              <input type="radio" checked={answers[q.id]===i} onChange={()=>choose(i)} />
              {opt}
            </label>
          </div>
        ))}
      </div>
      <div style={{marginTop:20}}>
        <button onClick={()=>setIdx(i=>Math.max(0,i-1))}>Previous</button>
        <button onClick={()=>setIdx(i=>Math.min(questions.length-1,i+1))}>Next</button>
        <button onClick={submit}>Submit Exam</button>
      </div>
    </div>
  </div>);
}
