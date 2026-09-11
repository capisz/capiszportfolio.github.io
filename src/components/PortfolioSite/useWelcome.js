import {useEffect, useState} from 'react';

// A bounded introduction, not a permanent scroll lock. Explicit navigation wins.
export default function useWelcome(motion) {
  const [phase,setPhase]=useState(()=>motion && window.scrollY<50 && (!window.location.hash || window.location.hash==='#top')?'welcome':'ready');
  useEffect(()=>{
    if(!motion){setPhase('ready');return;}
    if(phase==='ready')return;
    const finish=()=>setPhase('ready');
    const accelerate=()=>setPhase(current=>current==='welcome'?'revealing':current);
    const timer=setTimeout(phase==='welcome'?accelerate:finish,phase==='welcome'?2800:1600);
    const wheel=e=>{if(e.ctrlKey || Math.abs(e.deltaX)>Math.abs(e.deltaY) || e.deltaY<=0)return;if(e.cancelable)e.preventDefault();accelerate();};
    let touchY=null;
    const touchStart=e=>{touchY=e.touches.length===1?e.touches[0].clientY:null;};
    const touchMove=e=>{if(touchY===null||e.touches.length!==1)return;const delta=touchY-e.touches[0].clientY;if(delta>4){if(e.cancelable)e.preventDefault();accelerate();}};
    const key=e=>{
      if(['Tab','Escape','End'].includes(e.key)){finish();return;}
      if(['ArrowDown','PageDown',' '].includes(e.key) && !e.target.closest('button,a,input,textarea,select')){e.preventDefault();accelerate();}
    };
    // Hash links, the skip link, and résumé access must never wait for animation.
    const navigate=e=>{if(e.target.closest('a'))finish();};
    window.addEventListener('wheel',wheel,{passive:false});
    window.addEventListener('touchstart',touchStart,{passive:true});
    window.addEventListener('touchmove',touchMove,{passive:false});
    window.addEventListener('keydown',key);
    window.addEventListener('hashchange',finish);
    document.addEventListener('click',navigate);
    return()=>{clearTimeout(timer);window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchmove',touchMove);window.removeEventListener('keydown',key);window.removeEventListener('hashchange',finish);document.removeEventListener('click',navigate);};
  },[motion,phase]);
  return {phase,skip:()=>setPhase('ready')};
}
