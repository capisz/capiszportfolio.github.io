import { useRef, useState } from 'react';
import './index.scss';
import usePortfolioEffects from './effects';
import { useMotionPreferences, useTypewriter } from './motion';
import ProjectMatcher from './ProjectMatcher';
import PixelKnight from './PixelKnight';
import ProjectMedia, { PlaybackProvider } from './ProjectMedia';
import { presentation } from './projectPresentation';
import { stack, codeColumns, links } from '../../data/portfolioContent';

const Arrow = () => <span className="pf-link-arrow" aria-hidden="true">↗</span>;
function ProjectLinks({project}) {
  return <div className="pf-project-links">
    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>Open project <Arrow /></a>}
    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source`}>View source <Arrow /></a>}
  </div>;
}
function UnderTheHood({project, motion}) {
  const [open,setOpen]=useState(false);
  const typed=useTypewriter(project.codeText, motion && open, 9);
  return <details className="pf-underhood" onToggle={e=>setOpen(e.currentTarget.open)}><summary>Under the hood <span aria-hidden="true">＋</span></summary><pre aria-hidden="true">{typed}</pre><span className="pf-sr-only">{project.codeText}</span></details>;
}
function SectionHeading({label,title,children}) {
  return <div className="pf-section-heading" data-reveal><div><span className="pf-eyebrow">{label}</span><h2 data-heading>{title}</h2></div>{children}</div>;
}
const groups = {
  Frontend: ['React','Next.js','TypeScript','JavaScript','Tailwind','Swift','Electron'],
  Backend: ['Node.js','Python','MongoDB','Firebase','Azure SQL Database'],
  'Tools & infrastructure': ['GitHub Actions','Xcode','Figma','Vite.js','Ubuntu','Linux','Kubernetes','Docker','kind'],
};
export default function PortfolioSite() {
  const rootRef=useRef(null);
  const motion=useMotionPreferences();
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
      <nav aria-label="Main navigation"><a className="pf-navlink" href="#work">Work</a><a className="pf-navlink" href="#about">About</a><a className="pf-navlink" href="#stack">Stack</a><a className="pf-navlink" href="#contact">Contact</a></nav>
      <div className="pf-nav-actions"><button className="pf-motion-toggle" type="button" onClick={motion.toggle} aria-pressed={motion.paused} disabled={motion.reduced} title={motion.reduced ? 'System reduced motion is enabled' : 'Pause or resume decorative motion'}>{motion.reduced ? 'Motion reduced' : motion.paused ? '▶ Resume motion' : 'Ⅱ Pause motion'}</button><a href={links.resume} download className="pf-resume" aria-label="Download résumé">Résumé <span aria-hidden="true">↓</span></a></div>
    </div></header>
    <main>
      <ProjectMatcher motion={motion.enabled} />
      <div className="pf-ticker" tabIndex="0" aria-label="Technology ticker. Focus or hover to pause."><div className="pf-ticker-track">{[0,1].map(copy=><div className="pf-ticker-set" key={copy} aria-hidden={copy===1}>{stack.slice(0,10).map(s=><span key={s.name}><img src={s.icon} alt="" />{s.name}</span>)}</div>)}</div></div>
      <section id="work" className="pf-section">
        <SectionHeading label="Selected work" title="Built to solve something."><a className="pf-text-link" href={links.github} target="_blank" rel="noreferrer">All repositories <Arrow /></a></SectionHeading>
        <div className="pf-grid">{presentation.map((p,i)=><article className="pf-card" key={p.title} data-reveal data-delay={(i%2)*90}>
          <div className="pf-card-visual"><ProjectMedia mediaId={`gallery:${p.title}`} project={p} motion={motion.enabled} compact /></div>
          <div className="pf-card-body"><div className="pf-card-title-row"><h3>{p.title}</h3><span className={`pf-project-status ${p.liveUrl ? 'pf-live' : ''}`}>{p.statusLabel === 'In progress' ? 'In progress' : p.liveUrl ? 'Live' : 'Source available'}</span></div><p>{p.shortDescription}</p><div className="pf-tags">{p.tech.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><ProjectLinks project={p} />{p.title==='PrizeCheck'&&<UnderTheHood project={p} motion={motion.enabled} />}</div>
        </article>)}</div>
      </section>
      <section id="about" className="pf-section pf-about">
        <div className="pf-about-surface"><SectionHeading label="About me" title="Good questions. Useful software." />
        <div className="pf-about-grid"><div className="pf-about-copy">
          <p data-reveal>I’m Chris, a software engineer in New York. I turn questions from everyday life into software I want to use.</p>
          <p data-reveal>That might mean making a card-game routine easier to practice, comparing parking options, or explaining a baseball statistic. I build across <strong>React and Next.js</strong> interfaces and <strong>Node, FastAPI, and PostgreSQL</strong> backends, with attention to how the whole experience works.</p>
          <p data-reveal>Outside of code, I teach chess to elementary-school kids, play Pokémon and Magic, and lift. Teaching keeps me focused on clear explanations; games keep me curious about how systems work.</p>
        </div><aside className="pf-about-aside"><h3>Currently exploring</h3><ul>{['AI features grounded in real data','Public APIs with practical applications','Local infrastructure, recovery, and rollback'].map((text,i)=><li data-reveal data-delay={i*80} key={text}><span aria-hidden="true">↗</span>{text}</li>)}</ul><span className="pf-aside-note">Learning by building, testing, and revisiting.</span></aside></div></div>
      </section>
      <section id="stack" className="pf-section pf-stack"><SectionHeading label="The toolkit" title="What I build with." /><div className="pf-stack-groups">{Object.entries(groups).map(([name,names])=><div className="pf-stack-group" key={name}><h3>{name}</h3><div className="pf-stack-pills">{names.map((name,i)=>{const s=stack.find(t=>t.name===name);return <div className="pf-stack-pill" data-reveal data-delay={(i%4)*60} key={name}><img className="pf-stack-icon" src={s.icon} alt="" /><span>{name}</span></div>;})}</div></div>)}</div></section>
      <section id="contact" className="pf-section pf-contact"><div className="pf-contact-surface" data-reveal data-contact-reveal><span className="pf-eyebrow">Get in touch</span><div className="pf-contact-grid"><div><h2 aria-label="Have something in mind?">{['Have','something','in','mind?'].map(word=><span aria-hidden="true" className={`pf-contact-word ${word==='mind?'?'is-accent':''}`} key={word}>{word} </span>)}</h2><p>I’m open to software engineering roles and thoughtful collaborations. Send me the problem you’re working on and what you need from your next engineer.</p><a className="pf-magnetic" data-magnetic href={links.email}><span>Email Chris <Arrow /></span></a><a className="pf-contact-resume" href={links.resume} download>Download résumé ↓</a></div><div className="pf-contact-links">{[['Email',links.email,links.emailLabel],['GitHub',links.github,links.githubLabel],['LinkedIn',links.linkedin,links.linkedinLabel]].map(([label,url,detail])=><a className="pf-contact-row" key={label} href={url} {...(label!=='Email'?{target:'_blank',rel:'noreferrer'}:{})}><span><small>{label}</small><span>{detail}</span></span><Arrow /></a>)}</div></div></div></section>
    </main>
    <footer className="pf-footer"><a className="pf-brand" href="#top" aria-label="Chris Capizzuto — back to top"><PixelKnight /><span>Chris Capizzuto</span></a><span>© {new Date().getFullYear()} Chris Capizzuto · New York</span></footer>
  </div></PlaybackProvider>;
}
