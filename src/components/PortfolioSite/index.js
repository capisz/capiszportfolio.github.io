import { useEffect, useRef, useState } from 'react';
import './index.scss';
import usePortfolioEffects from './effects';
import { useMotionPreferences } from './motion';
import ProjectMatcher from './ProjectMatcher';
import PixelKnight from './PixelKnight';
import ProjectMedia, { PlaybackProvider } from './ProjectMedia';
import UnderTheHood from './UnderTheHood';
import { presentation } from './projectPresentation';
import { stack, codeColumns, links } from '../../data/portfolioContent';

const Arrow = () => <span className="pf-link-arrow" aria-hidden="true">↗</span>;
function ProjectLinks({project}) {
  return <div className="pf-project-links">
    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>Open project <Arrow /></a>}
    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source`}>View source <Arrow /></a>}
  </div>;
}
function SectionHeading({label,title,children}) {
  return <div className="pf-section-heading" data-reveal><div><span className="pf-eyebrow">{label}</span><h2 data-heading>{title}</h2></div>{children}</div>;
}
const groups = {
  Frontend: ['React','React Native','Next.js','TypeScript','JavaScript','Tailwind','Swift','Electron','Webpack','Framer','LottieLab'],
  Backend: ['Node.js','Python','MongoDB','Firebase','Azure SQL Database','Redis','Mongoose.js','PostgreSQL','Supabase','C++'],
  'Tools & infrastructure': ['GitHub Actions','GitHub','Xcode','Visual Studio','Figma','Canva','Vite.js','Ubuntu','Linux','Kubernetes','Docker','Vercel','Cloudflare','kind','Git','Claude AI','Google Gemini','Cursor AI','Codex','Postman'],
};
function AlignmentIntro({result,motion,entire=false}) {
  const skills=[...new Set([result?.best,...(result?.alternatives||[])].filter(Boolean).flatMap(p=>p.matched))];
  const first=skills.length?`These projects connect to ${skills.join(', ')} in your brief.`:'Explore the projects and the problems they solve.';
  const second=skills.length?(entire?'The closest matches come first, followed by the rest of my work.':'Each card shows the technologies we have in common. Take a closer look.'):'Take a look at the technologies behind them.';
  return <p className="pf-alignment-intro pf-fade-intro"><span className="pf-typed-line">{first}</span><span className="pf-typed-line">{second}</span></p>;
}
function EmptyDiscovery({onBrowse}) {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{threshold:.2});
    if(ref.current)observer.observe(ref.current);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`pf-empty-discovery ${visible?'is-visible':''}`}>
    <p id="tailored-hint">Enter the role or technologies you’re looking for above to get tailored project results.</p>
    <a href="#top">Add what you’re looking for ↑</a>
    <div className="pf-discovery-actions">
      <button type="button" disabled aria-describedby="tailored-hint">Show me more related projects</button>
      <button type="button" onClick={onBrowse}>Show me your entire portfolio</button>
    </div>
  </div>;
}
function RelatedProjects({result,motion,choice,onChoice}) {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    setVisible(false);
    if(!motion){setVisible(true);return;}
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect();}
    },{threshold:.15});
    if(ref.current)observer.observe(ref.current);
    return()=>observer.disconnect();
  },[result,motion]);
  if(!result?.best)return null;
  return <section ref={ref} className={`pf-related pf-section ${visible?'is-visible':''}`} aria-labelledby="related-title">
    <span className="pf-eyebrow">Keep exploring</span>
    <h2 id="related-title">Want to see more projects that align with your tech stack?</h2>
    {!result.alternatives.length&&<p id="related-empty" className="pf-related-empty">This is my only project with evidence for those technologies. You can still explore the entire portfolio.</p>}
    <div className="pf-discovery-actions">
      <button type="button" disabled={!result.alternatives.length} aria-describedby={!result.alternatives.length?'related-empty':undefined} aria-pressed={choice==='related'} onClick={()=>onChoice('related')}>Show me more related projects</button>
      <button type="button" onClick={()=>onChoice('all')}>Show me your entire portfolio</button>
    </div>
    {choice==='related'&&<div className="pf-related-results"><AlignmentIntro result={result} motion={motion}/><div className="pf-related-grid">{result.alternatives.map((project,i)=>{
      const display=presentation.find(p=>p.title===project.title);
      return <article key={project.title} className="pf-related-card" style={{'--related-delay':`${2400+i*420}ms`}}>
        <ProjectMedia mediaId={`related:${project.title}`} project={display} motion={motion} compact />
        <h3><a href={project.openUrl} target="_blank" rel="noreferrer">{project.title} <Arrow /></a></h3><p>{display.shortDescription}</p>
        <span className="pf-related-tech">{project.matched.join(' · ')}</span><a className="pf-related-action" href={project.openUrl} target="_blank" rel="noreferrer">Explore project ↗</a>
        <UnderTheHood project={display} motion={motion} />
      </article>;
    })}</div></div>}
  </section>;
}
export default function PortfolioSite() {
  const rootRef=useRef(null);
  const [match,setMatch]=useState(null);
  const [choice,setChoice]=useState(null);
  useEffect(()=>setChoice(null),[match]);
  const showAll=()=>setChoice('all');
  const choose=value=>setChoice(value);
  const highlighted=match?.best?[match.best,...match.alternatives].map(p=>p.title):[];
  const ordered=[...presentation].sort((a,b)=>{
    const rank=p=>highlighted.includes(p.title)?highlighted.indexOf(p.title):presentation.length;
    return rank(a)-rank(b);
  });
  const motion=useMotionPreferences();
  useEffect(()=>{
    if(choice!=='all'&&choice!=='related')return;
    let frame;
    const timer=setTimeout(()=>{
      const target=choice==='related'?rootRef.current?.querySelector('.pf-related-results'):document.getElementById('work');
      if(!target)return;
      const start=window.scrollY;
      const end=start+target.getBoundingClientRect().top-(rootRef.current?.querySelector('header')?.offsetHeight||100)-20;
      if(!motion.enabled){window.scrollTo(0,end);return;}
      const began=performance.now();
      const step=now=>{const t=Math.min(1,(now-began)/1200);const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;window.scrollTo({top:start+(end-start)*eased,behavior:'instant'});if(t<1)frame=requestAnimationFrame(step);};
      frame=requestAnimationFrame(step);
    },100);
    const cancel=()=>{clearTimeout(timer);cancelAnimationFrame(frame);};
    window.addEventListener('wheel',cancel,{passive:true});window.addEventListener('touchstart',cancel,{passive:true});window.addEventListener('keydown',cancel);
    return()=>{cancel();window.removeEventListener('wheel',cancel);window.removeEventListener('touchstart',cancel);window.removeEventListener('keydown',cancel);};
  },[choice,motion.enabled]);

  usePortfolioEffects(rootRef,motion.enabled);
  return <PlaybackProvider motion={motion.enabled}><div ref={rootRef} className={`pf-root ${motion.enabled ? 'motion-on' : 'motion-off'}`}>
    <a className="pf-skip" href="#top">Skip to main content</a>
    <div className="pf-progress" aria-hidden="true"><span data-progress /></div>
    <div className="pf-atmosphere" aria-hidden="true">
      {[0,1,2].map(layer=><div className={`pf-code-depth depth-${layer}`} data-depth={layer+1} key={layer}>
        {[0,1].map(i=><pre key={i} className="pf-code-column" style={{'--code-color':codeColumns[layer*2+i].color,'--phase':`${-(layer*3+i*4)}s`}}>{codeColumns[layer*2+i].text.split('\n').slice(0,52).join('\n')}</pre>)}
      </div>)}
      <div className="pf-aura aura-teal" /><div className="pf-aura aura-violet" /><div className="pf-aura aura-gold" />
    </div>
    <header className="pf-nav"><div className="pf-nav-inner">
      <a className="pf-brand" href="#top"><PixelKnight /><span>Chris Capizzuto</span></a>
      <nav aria-label="Main navigation"><a className="pf-navlink" href="#work" onClick={showAll}>Work</a><a className="pf-navlink" href="#about">About</a><a className="pf-navlink" href="#stack">Stack</a><a className="pf-navlink" href="#contact">Contact</a></nav>
      <div className="pf-nav-actions"><button className="pf-motion-toggle" type="button" onClick={motion.toggle} aria-pressed={motion.paused} disabled={motion.reduced} title={motion.reduced ? 'System reduced motion is enabled' : 'Pause or resume decorative motion'}>{motion.reduced ? 'Motion reduced' : motion.paused ? '▶ Resume motion' : 'Ⅱ Pause motion'}</button><a href={links.resume} download className="pf-resume" aria-label="Download résumé">Résumé <span aria-hidden="true">↓</span></a></div>
    </div></header>
    <main>
      <ProjectMatcher motion={motion.enabled} onResult={setMatch} onBrowse={showAll} />
      <RelatedProjects result={match} motion={motion.enabled} choice={choice} onChoice={choose} />
      <div className="pf-ticker" tabIndex="0" aria-label="Technology ticker. Focus or hover to pause."><div className="pf-ticker-track">{[0,1].map(copy=><div className="pf-ticker-set" key={copy} aria-hidden={copy===1}>{stack.slice(0,10).map(s=><span key={s.name}><img src={s.icon} alt="" />{s.name}</span>)}</div>)}</div></div>
      <section id="work" className="pf-section">
        {choice!=='all'&&!match?.best&&<EmptyDiscovery onBrowse={showAll}/>}
        {choice==='all'&&<>
        <SectionHeading label="Selected work" title="A project built to solve a problem."><a className="pf-text-link" href={links.github} target="_blank" rel="noreferrer">All repositories <Arrow /></a></SectionHeading>
        {highlighted.length>0&&<p className="pf-match-prompt">You may also be interested in these</p>}
        <AlignmentIntro result={match} motion={motion.enabled} entire/>
        <div className="pf-grid pf-cascade">{ordered.map((p,i)=><article className={`pf-card ${highlighted.includes(p.title)?'is-match':''}`} key={p.title} style={{'--cascade-delay':`${2400+Math.min(i,6)*350}ms`}}>
          <div className="pf-card-visual"><ProjectMedia mediaId={`gallery:${p.title}`} project={p} motion={motion.enabled} compact /></div>
          <div className="pf-card-body"><div className="pf-card-title-row"><h3>{p.title}</h3><span className={`pf-project-status ${p.liveUrl ? 'pf-live' : ''}`}>{p.statusLabel === 'In progress' ? 'In progress' : p.liveUrl ? 'Live' : 'Source available'}</span></div><p>{p.shortDescription}</p><div className="pf-tags">{p.tech.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><ProjectLinks project={p} /><UnderTheHood project={p} motion={motion.enabled} /></div>
        </article>)}</div></>}
      </section>
      <section id="about" className="pf-section pf-about">
        <div className="pf-about-surface"><SectionHeading label="About me" title="Good questions. Useful software." />
        <div className="pf-about-grid"><div className="pf-about-copy">
          <p data-reveal>I’m Chris, a software engineer in New York. I turn questions from everyday life into software I want to use.</p>
          <p data-reveal>That might mean making a card-game routine easier to practice, comparing parking options, or explaining a baseball statistic. I build across <strong>React and Next.js</strong> interfaces and <strong>Node, FastAPI, and PostgreSQL</strong> backends, with attention to how the whole experience works.</p>
          <p data-reveal>Outside of code, I teach chess to elementary-school kids, play Pokémon and Magic, and lift. Teaching keeps me focused on clear explanations; games keep me curious about how systems work.</p>
        </div><aside className="pf-about-aside"><h3>Currently exploring</h3><ul>{['AI features grounded in real data','Public APIs with practical applications','Local infrastructure, recovery, and rollback'].map((text,i)=><li data-reveal data-delay={i*80} key={text}><span aria-hidden="true">↗</span>{text}</li>)}</ul><span className="pf-aside-note">Learning by building, testing, and revisiting.</span></aside></div></div>
      </section>
      <section id="stack" className="pf-section pf-stack"><SectionHeading label="The toolkit" title="What I build with." />{match?.requested.length>0&&<p className="pf-stack-note">What you’re looking for is highlighted</p>}<div className="pf-stack-groups">{Object.entries(groups).map(([name,names])=><div className="pf-stack-group" key={name}><h3>{name}</h3><div className="pf-stack-pills">{names.map((name,i)=>{const s=stack.find(t=>t.name===name);return <div className={`pf-stack-pill ${match?.requested.includes(name==='Vite.js'?'Vite':name==='Azure SQL Database'?'Azure':name)?'is-requested':''}`} data-reveal data-delay={(i%4)*60} key={name}><img className="pf-stack-icon" src={s.icon} alt="" /><span>{name}</span></div>;})}</div></div>)}</div></section>
      <section id="contact" className="pf-section pf-contact"><div className="pf-contact-surface" data-reveal data-contact-reveal><span className="pf-eyebrow">Get in touch</span><div className="pf-contact-grid"><div><h2 aria-label="Have something in mind?">{['Have','something','in','mind?'].map(word=><span aria-hidden="true" className={`pf-contact-word ${word==='mind?'?'is-accent':''}`} key={word}>{word} </span>)}</h2><p>I’m open to software engineering roles and thoughtful collaborations. Send me the problem you’re working on and what you need from your next engineer.</p><a className="pf-magnetic" data-magnetic href={links.email}><span>Email Chris <Arrow /></span></a><a className="pf-contact-resume" href={links.resume} download>Download résumé ↓</a></div><div className="pf-contact-links">{[['Email',links.email,links.emailLabel],['GitHub',links.github,links.githubLabel],['LinkedIn',links.linkedin,links.linkedinLabel]].map(([label,url,detail])=><a className="pf-contact-row" key={label} href={url} {...(label!=='Email'?{target:'_blank',rel:'noreferrer'}:{})}><span><small>{label}</small><span>{detail}</span></span><Arrow /></a>)}</div></div></div></section>
    </main>
    <footer className="pf-footer"><a className="pf-brand" href="#top" aria-label="Chris Capizzuto — back to top"><PixelKnight /><span>Chris Capizzuto</span></a><span>© {new Date().getFullYear()} Chris Capizzuto · New York</span></footer>
  </div></PlaybackProvider>;
}
