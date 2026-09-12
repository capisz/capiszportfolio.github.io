import { useEffect, useRef, useState } from 'react';
import { matchProjects } from './matchEngine';
import { findPresentation } from './projectPresentation';
import { useResultMotion } from './effects';
import useWelcome from './useWelcome';
import ProjectMedia from './ProjectMedia';
import PixelKnight from './PixelKnight';
import './matcher.scss';

export default function ProjectMatcher({motion,onResult,onBrowse}) {
  const welcome=useWelcome(motion);
  const [text,setText]=useState('');
  const [result,setResult]=useState(null);
  useEffect(()=>{onResult?.(result);},[result,onResult]);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [fileName,setFileName]=useState('');
  const [dragging,setDragging]=useState(false);
  const workerRef=useRef(null);
  const timeoutRef=useRef(null);
  const formRef=useRef(null);
  const invitationTimer=useRef(null);
  const reminderTimer=useRef(null);
  const invitationClearTimer=useRef(null);
  const invitationCancelled=useRef(false);
  const resultRef=useRef(null);
  const scoreRef=useRef(null);
  const mounted=useRef(true);
  const locked=useRef(false);
  const [inviting,setInviting]=useState(false);
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;clearTimeout(timeoutRef.current);workerRef.current?.terminate();};},[]);
  useEffect(()=>{
    if(welcome.phase!=='ready'||invitationCancelled.current)return;
    setInviting(true);
    invitationTimer.current=setTimeout(()=>setInviting(false),4000);
    return()=>clearTimeout(invitationTimer.current);
  },[welcome.phase]);
  useEffect(()=>{
    if(!result?.best||window.innerWidth>=900)return;
    document.activeElement?.blur?.();
    const timer=setTimeout(()=>resultRef.current?.previousElementSibling?.scrollIntoView?.({behavior:motion?'smooth':'auto',block:'start'}),450);
    const cancel=()=>clearTimeout(timer);
    window.addEventListener('touchstart',cancel,{passive:true});
    window.addEventListener('wheel',cancel,{passive:true});
    return()=>{cancel();window.removeEventListener('touchstart',cancel);window.removeEventListener('wheel',cancel);};
  },[result,motion]);
  const project=result?.best;
  const display=project ? findPresentation(project.title) : null;
  useResultMotion(resultRef,scoreRef,result,motion);
  const cancelInvitation=()=>{invitationCancelled.current=true;setInviting(false);clearTimeout(invitationTimer.current);clearTimeout(reminderTimer.current);clearTimeout(invitationClearTimer.current);};
  const reset=()=>{setResult(null);setError('');};
  const run=(value=text)=>{
    cancelInvitation();
    if(locked.current) return;
    if(!value.trim()){setError('Paste a job description or enter a technology first.');return;}
    locked.current=true;setError('');
    try { setResult(matchProjects(value)); } catch(e) { setResult(null);setError(e.message); }
    finally { locked.current=false; }
  };
  const readFile=async file=>{
    cancelInvitation();
    if(!file || locked.current) return;
    reset();
    if(!/\.(txt|pdf|docx)$/i.test(file.name)){setError('Choose a TXT, PDF or DOCX file. Other formats are not supported.');return;}
    if(!file.size || file.size>5*1024*1024){setError('Choose a non-empty file smaller than 5 MB.');return;}
    locked.current=true;setBusy(true);setFileName('');
    try {
      const bytes=await file.arrayBuffer();
      if(!mounted.current) return;
      const extracted=await new Promise((resolve,reject)=>{
        const worker=new Worker(`${process.env.PUBLIC_URL}/match-parser.js`,{type:'module'});workerRef.current=worker;
        const finish=(err,value)=>{clearTimeout(timeoutRef.current);worker.terminate();workerRef.current=null;err?reject(new Error(err)):resolve(value);};
        worker.onmessage=e=>{if(typeof e.data.text==='string' || e.data.error) finish(e.data.error,e.data.text);};
        worker.onerror=()=>finish('This document could not be read. Try pasting its text.');
        timeoutRef.current=setTimeout(()=>finish('This document took too long to read. Try a smaller file or paste its text.'),12000);
        worker.postMessage({bytes,name:file.name},[bytes]);
      });
      if(mounted.current){setText(extracted);setFileName(file.name);}
    } catch(e){if(mounted.current)setError(e.message);}
    finally{locked.current=false;if(mounted.current)setBusy(false);}
  };
  return <section id="top" className={`pm-hero intro-${welcome.phase} ${result?'has-submission':''} ${project?'has-project':''}`} aria-labelledby="matcher-title">
    <h1 id="matcher-title" className="pf-sr-only">Chris Capizzuto — software engineering portfolio</h1>
    <span className="pf-sr-only" role="status">{busy?'Reading document locally.':result?project?`${project.title}: ${project.alignment}% Tech Alignment`:result.status==='unrecognized'?'No recognized technologies. Try another brief.':'0% Tech Alignment. No project evidence.':fileName?'Document ready. Select Find a relevant project.':''}</span>
    {welcome.phase==='knight'&&<div className="pm-knight-intro"><PixelKnight /></div>}
    {welcome.phase!=='ready'&&welcome.phase!=='knight'&&<div className="pm-welcome">
      <p className="pm-welcome-eyebrow">Welcome to my portfolio</p>
      <h2>Hi, I’m Chris.</h2>
      <p>Let’s find the work that fits.</p>
      <span className="pm-welcome-line" aria-hidden="true" />
      <button type="button" onClick={welcome.skip}>Skip intro <span aria-hidden="true">↓</span></button>
    </div>}
    <div className="pm-workbench" inert={welcome.phase!=='ready'?'':undefined} aria-hidden={welcome.phase!=='ready'?true:undefined}>
      <div className="pm-entry">
      <form ref={formRef} className={`pm-input ${dragging?'is-dragging':''} ${inviting?'is-guided':''}`} onFocusCapture={cancelInvitation} onSubmit={e=>{e.preventDefault();run();}} onDragEnter={cancelInvitation} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false);if(e.dataTransfer.files.length!==1)setError('Please choose one document at a time.');else readFile(e.dataTransfer.files[0]);}}>
        <label className="pf-sr-only" htmlFor="job-description">Drop a job description here</label>
        <div className={`pm-guidance ${inviting?'is-visible':''}`} aria-hidden="true">Drop a job description here <span>↓</span></div>
        <div className="pm-composer"><textarea id="job-description" value={text} disabled={busy} maxLength={30000} onChange={e=>{cancelInvitation();setText(e.target.value);setFileName('');reset();}} placeholder="Paste the role, or try a technology like React, Python, or Docker…" aria-describedby="input-privacy matcher-error" /><div className="pm-composer-foot"><label className="pm-upload" onPointerDown={cancelInvitation}><span aria-hidden="true">＋</span> Attach a job description<input type="file" accept=".txt,.pdf,.docx" disabled={busy} onChange={e=>{readFile(e.target.files[0]);e.target.value='';}} /></label><span>{fileName || 'TXT · PDF · DOCX / 5 MB'}</span></div></div>
        <details className="pm-example-disclosure"><summary>Try an example</summary><div className="pm-examples">{['React Native + Expo','Python + Claude','Docker + Kubernetes'].map(value=><button type="button" disabled={busy} key={value} onClick={()=>{cancelInvitation();setText(value);setFileName('');reset();}}>{value}<span aria-hidden="true">↗</span></button>)}</div></details>
        <p id="matcher-error" className="pm-error" role="alert">{error}</p>
        <button className="pm-submit" type="submit" disabled={busy}>{busy?'Reading your document…':'Find a relevant project'}<span aria-hidden="true">↗</span></button>
        <p id="input-privacy" className="pm-privacy"><svg aria-hidden="true" width="13" height="14" viewBox="0 0 16 18" fill="none"><rect x="2" y="7" width="12" height="9" rx="2" stroke="currentColor"/><path d="M5 7V4a3 3 0 016 0v3" stroke="currentColor"/></svg> Read in your browser. Never uploaded or saved.</p>
      </form>
      {result&&!project&&<div className="pm-no-match"><h2>{result.status==='unrecognized'?'No recognized technologies':'No project evidence yet'}</h2><p>{result.explanation.replace('This is a featured suggestion, not a scored match.', 'Try a technology such as React Native, Python, or Docker.')}</p></div>}
      </div>
      {project&&<div className="pm-output has-result">
        <div className="pm-screen"><ProjectMedia mediaId={`hero:${project.title}`} key={project.title} project={display} motion={motion} /></div>
        <div className="pm-project" ref={resultRef}>
          <div className="pm-result-heading"><div><span className="pm-result-label">Project evidence for your brief</span><h2>{project.title}</h2></div>{result&&project.alignment!==null&&<div className="pm-score" aria-label={`${project.alignment}% Tech Alignment`}><strong aria-hidden="true"><span ref={scoreRef}>{project.alignment}</span><small>%</small></strong><span>Tech Alignment</span></div>}</div>
          <p>{display.shortDescription}</p>
          <div className="pm-tags">{(result?project.matched:project.tech.slice(0,3)).map(t=><span key={t}>{result?'✓ ':''}{t}</span>)}</div>
          {result&&project.missing.length>0&&<p className="pm-missing">Not evidenced here: {project.missing.join(', ')}.</p>}
          <div className="pm-project-footer"><a href={project.openUrl} target="_blank" rel="noreferrer">Explore project <span aria-hidden="true">↗</span></a></div>
          {result&&<p className="pm-explanation">{result.explanation}</p>}
          {!!result?.alternatives.length&&<details className="pm-alternatives"><summary>Other projects with evidence</summary><ul>{result.alternatives.map(p=><li key={p.title}><a href={p.openUrl} target="_blank" rel="noreferrer">{p.title}</a><span>{p.alignment}% Tech Alignment · {p.matched.join(', ')}</span></li>)}</ul></details>}
        </div>
      </div>}
    </div>
    <a className="pm-browse" tabIndex={welcome.phase!=='ready'?-1:undefined} aria-hidden={welcome.phase!=='ready'?true:undefined} href="#work" onClick={onBrowse}>Explore all projects <span aria-hidden="true">↓</span></a>
  </section>;
}
