import {useEffect, useState} from 'react';

// A bounded introduction, not a permanent scroll lock. Explicit navigation wins.
export default function useWelcome(motion) {
  const [phase,setPhase]=useState(()=>motion && window.scrollY<50 && (!window.location.hash || window.location.hash==='#top')?'knight':'ready');
  useEffect(()=>{
    if(!motion){setPhase('ready');return;}
    if(phase==='ready')return;
    const finish=()=>setPhase('ready');
    const advance=()=>setPhase(phase==='knight'?'welcome':phase==='welcome'?'revealing':'ready');
    const started=Date.now();
    let deadline=started+(phase==='revealing'?1600:2800);
    let timer=setTimeout(advance,deadline-started);
    const accelerate=distance=>{
      // Preserve each stage and its animation even during trackpad momentum.
      if(phase==='revealing')return;
      const now=Date.now();
      const next=Math.min(deadline,Math.max(started+1800,now+350,deadline-Math.min(120,Math.max(0,distance)*1.5)));
      if(next===deadline)return;
      deadline=next;clearTimeout(timer);timer=setTimeout(advance,Math.max(0,deadline-now));
    };
    const wheel=e=>{if(e.ctrlKey || Math.abs(e.deltaX)>Math.abs(e.deltaY) || e.deltaY<=0)return;if(e.cancelable)e.preventDefault();accelerate(e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?window.innerHeight:1));};
    let touchY=null;
    const touchStart=e=>{touchY=e.touches.length===1?e.touches[0].clientY:null;};
    const touchMove=e=>{if(touchY===null||e.touches.length!==1)return;const y=e.touches[0].clientY;const delta=touchY-y;touchY=y;if(delta>0){if(e.cancelable)e.preventDefault();accelerate(delta);}};
    const key=e=>{
      if(['Tab','Escape','End'].includes(e.key)){finish();return;}
      if(['ArrowDown','PageDown',' '].includes(e.key) && !e.target.closest('button,a,input,textarea,select')){e.preventDefault();accelerate(80);}
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
