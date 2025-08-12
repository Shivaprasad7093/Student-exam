
import React, { useEffect, useState } from 'react';
export default function Timer({ minutes, onTimeUp }){
  const [time, setTime] = useState(minutes * 60);
  useEffect(()=>{
    if(time <= 0){ onTimeUp(); return; }
    const id = setInterval(()=> setTime(t => t-1), 1000);
    return ()=> clearInterval(id);
  }, [time]);
  const mm = Math.floor(time/60).toString().padStart(2,'0');
  const ss = (time%60).toString().padStart(2,'0');
  return <div>Time Left: {mm}:{ss}</div>;
}
