import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPlaybackCoordinator } from './playback';

const PlaybackContext=createContext(null);
export function PlaybackProvider({motion,children}) {
  const [coordinator]=useState(createPlaybackCoordinator);
  useEffect(()=>{coordinator.configure({automatic:motion});},[coordinator,motion]);
  useEffect(()=>{
    const visibility=()=>coordinator.configure({hidden:document.hidden});
    visibility();document.addEventListener('visibilitychange',visibility);
    let frame=0;
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;coordinator.refreshPositions(window.innerHeight);});};
    window.addEventListener('scroll',scroll,{passive:true});
    window.addEventListener('resize',scroll,{passive:true});
    return()=>{document.removeEventListener('visibilitychange',visibility);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
  },[coordinator]);
  return <PlaybackContext.Provider value={coordinator}>{children}</PlaybackContext.Provider>;
}
export default function ProjectMedia({project, motion, autoPlay=true, compact=false, mediaId}) {
  const shared=useContext(PlaybackContext);
  const [local]=useState(createPlaybackCoordinator);
  const coordinator=shared||local;
  const id=mediaId||project.title;
  const ref=useRef(null);
  const [playing,setPlaying]=useState(false);
  const [failed,setFailed]=useState(false);
  const [blocked,setBlocked]=useState(false);
  const [controls,setControls]=useState(false);
  useEffect(()=>{if(!shared)coordinator.configure({automatic:motion});},[shared,coordinator,motion]);
  useEffect(()=>{
    const video=ref.current;if(!video||failed)return;
    const unregister=coordinator.register(id,video,()=>setBlocked(true));
    const observer=new IntersectionObserver(([entry])=>{
      coordinator.update(id,{ratio:entry.isIntersecting?entry.intersectionRatio:0,distance:Math.abs(entry.boundingClientRect.top+entry.boundingClientRect.height/2-window.innerHeight/2)});
    },{threshold:[0,.1,.25,.5,.6,.75,.9,1]});
    const preload=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){video.preload='metadata';preload.disconnect();}},{rootMargin:'350px'});
    observer.observe(video);preload.observe(video);
    return()=>{observer.disconnect();preload.disconnect();unregister();};
  },[coordinator,id,project.demo,failed]);
  useEffect(()=>coordinator.update(id,{auto:autoPlay}),[coordinator,id,autoPlay]);
  return <div className={`pf-project-media ${compact?'is-compact':''} ${project.mediaSize?'is-portrait':''}`} style={project.mediaSize?{'--media-ratio':`${project.mediaSize.width} / ${project.mediaSize.height}`,'--portrait-width':`${480*project.mediaSize.width/project.mediaSize.height}px`,'--portrait-mobile-width':`${420*project.mediaSize.width/project.mediaSize.height}px`}:undefined}>
    {project.demo&&!failed?<video ref={ref} src={project.demo} poster={project.poster} muted playsInline loop preload="none" controls={controls}
      onPlay={()=>{setPlaying(true);setBlocked(false);coordinator.nativePlay(id,controls);}}
      onPause={()=>{setPlaying(false);coordinator.nativePause(id);}}
      onError={()=>{coordinator.update(id,{failed:true});setFailed(true);}}
      aria-label={`${project.title} demo`} />:<img src={project.poster||project.media} alt={`${project.title} preview`} loading="lazy" />}
    {project.demo&&!failed&&<div className={`pf-media-controls ${controls?'native-open':''}`}>
      <button type="button" className="pf-play" aria-label={`${playing?'Pause':'Play'} ${project.title} demo`} onClick={()=>playing?coordinator.pause(id):coordinator.play(id)}><span aria-hidden="true">{playing?'Ⅱ':'▶'}</span><span>{playing?'Pause':'Play'}</span></button>
      <button type="button" aria-label={`${controls?'Hide':'Show'} ${project.title} video controls`} aria-pressed={controls} onClick={()=>setControls(!controls)}>Controls</button>
    </div>}
    {blocked&&!playing&&!failed&&<span className="pf-media-notice" role="status">Autoplay paused by your browser. Press Play to start.</span>}
    {failed&&<span className="pf-media-error" role="status">Demo unavailable. Open the project below.</span>}
  </div>;
}
