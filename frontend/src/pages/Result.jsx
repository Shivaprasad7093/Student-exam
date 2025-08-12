
import React from 'react';
export default function Result({ result, onBack }){
  if(!result) return <div>No result</div>;
  return (<div style={{padding:20}}>
    <h2>Result</h2>
    <p>Score: {result.score} / {result.total}</p>
    <button onClick={onBack}>Back to Exam</button>
  </div>);
}
