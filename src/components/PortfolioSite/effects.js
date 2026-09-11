import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function usePortfolioEffects(rootRef, motion) {
  const entered = useRef(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanup = [];
    const q = selector => Array.from(root.querySelectorAll(selector));
    const context = gsap.context(() => {}, root);
    const animate = (target, from, to) => context.add(() => gsap.fromTo(target, from, to));
    const textarea=root.querySelector('textarea');
    let typingTimer;
    const typing=()=>{if(!motion)return;textarea?.closest('.pm-composer')?.classList.add('is-typing');clearTimeout(typingTimer);typingTimer=setTimeout(()=>textarea?.closest('.pm-composer')?.classList.remove('is-typing'),900);};
    textarea?.addEventListener('input',typing);
    cleanup.push(()=>{textarea?.removeEventListener('input',typing);clearTimeout(typingTimer);textarea?.closest('.pm-composer')?.classList.remove('is-typing');});
    const reveals = q('[data-reveal]');
    // Elements are visible in base CSS. Motion is an enhancement, never a gate.
    const revealIO = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        revealIO.unobserve(target);
        if (target.dataset.entered) return;
        target.dataset.entered = 'true';
        target.classList.add('is-entered');
        if (!motion) return;
        animate(target, {y: 28, opacity: .35}, {y: 0, opacity: 1, duration: .45, delay: Number(target.dataset.delay || 0) / 1000, ease: 'power3.out', clearProps: 'transform,opacity'});
        const heading=target.querySelector('[data-heading]');
        if(heading) animate(heading,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.45,ease:'power2.out',clearProps:'clipPath'});
        const icon = target.querySelector('.pf-stack-icon');
        if (icon) animate(icon, {rotation: -14, scale: .8}, {rotation: 0, scale: 1, duration: .6, ease: 'back.out(1.4)', clearProps: 'transform'});
        if (target.hasAttribute('data-contact-reveal')) {
          animate(target.querySelectorAll('.pf-contact-word'), {y: 22, opacity: .3, scale: .97}, {y: 0, opacity: 1, scale: 1, stagger: .09, duration: .65, ease: 'back.out(1.35)', clearProps: 'transform,opacity'});
        }
      });
    }, {threshold: .08});
    reveals.forEach(el => revealIO.observe(el));
    cleanup.push(() => revealIO.disconnect());
    const ticker=root.querySelector('.pf-ticker');
    const tickerIO=new IntersectionObserver(([e])=>ticker?.classList.toggle('is-offscreen',!e.isIntersecting));
    if(ticker)tickerIO.observe(ticker);
    cleanup.push(()=>tickerIO.disconnect());

    if (!entered.current && motion) {
      const words = q('.pm-title-word');
      animate(words, {y: 35, opacity: .25, rotationX: 12}, {y: 0, opacity: 1, rotationX: 0, stagger: .075, duration: .45, ease: 'power3.out', clearProps: 'transform,opacity'});
      entered.current = true;
    }
    let frame = 0;
    let lastY=window.scrollY, lastTime=performance.now(), velocity=0, settleUntil=0;
    let pointer = {x: .5, y: .5};
    let activeMagnet = null;
    const layers = q('[data-depth]');
    const nav = root.querySelector('.pf-nav');
    const measureNav=()=>root.style.setProperty('--nav-height',`${nav?.getBoundingClientRect().height||100}px`);
    measureNav();
    const navObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(measureNav):null;
    if(nav)navObserver?.observe(nav);
    cleanup.push(()=>navObserver?.disconnect());
    const progress = root.querySelector('[data-progress]');
    const sections = q('section[id]');
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      nav?.classList.toggle('is-scrolled', y > 20);
      if (progress) progress.style.transform = `scaleX(${Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))})`;
      let active = 'top';
      sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) active = section.id; });
      root.dataset.section=active;
      q('.pf-navlink').forEach(link => link.classList.toggle('is-active', link.hash === '#' + active));
      if (!motion) return;
      const desktop=window.innerWidth>=900;
      const now=performance.now(), dt=Math.min(50,now-lastTime);
      velocity=Math.max(0,velocity-dt/600);
      lastTime=now;
      q('.pf-code-column').forEach(el=>el.getAnimations?.().forEach(animation=>{if(animation.animationName==='pf-code-drift')animation.playbackRate=1+velocity;}));
      layers.forEach(layer => {
        const depth = Number(layer.dataset.depth);
        layer.style.transform = `translate3d(${desktop?(pointer.x - .5) * depth * 12:0}px,${-Math.min(y,6000)*depth*(desktop?.012:.004)}px,0)`;
      });
      if(now<settleUntil)frame=requestAnimationFrame(update);
      if (activeMagnet) {
        const {el,x,y:localY} = activeMagnet;
        el.firstElementChild.style.transform = `translate(${Math.max(-6,Math.min(6,x))}px,${Math.max(-6,Math.min(6,localY))}px)`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const scroll=()=>{const now=performance.now();velocity=Math.min(1,Math.abs(window.scrollY-lastY)/120);lastY=window.scrollY;settleUntil=now+600;schedule();};
    window.addEventListener('scroll', scroll, {passive:true});
    window.addEventListener('resize', schedule, {passive:true});
    cleanup.push(() => { window.removeEventListener('scroll', scroll); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); });
    if (motion && window.innerWidth>=900 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const move = e => { pointer = {x:e.clientX / window.innerWidth,y:e.clientY / window.innerHeight}; schedule(); };
      window.addEventListener('pointermove', move, {passive:true});
      cleanup.push(() => window.removeEventListener('pointermove', move));
      q('[data-magnetic]').forEach(el => {
        const onMove=e=>{const r=el.getBoundingClientRect();activeMagnet={el,x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.2};schedule();};
        const leave=()=>{activeMagnet=null;el.firstElementChild.style.transform='';};
        el.addEventListener('pointermove',onMove);el.addEventListener('pointerleave',leave);
        cleanup.push(()=>{leave();el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerleave',leave);});
      });
    }
    update();
    return () => {cleanup.forEach(fn=>fn());context.revert();layers.forEach(el=>{el.style.transform='';});q('.pf-code-column').forEach(el=>el.getAnimations?.().forEach(a=>{a.playbackRate=1;}));};
  }, [rootRef, motion]);
}

export function useResultMotion(resultRef, scoreRef, result, motion) {
  useLayoutEffect(() => {
    if (!result?.best || !motion) return;
    const context=gsap.context(()=>{
      const media=resultRef.current?.previousElementSibling;
      if(media)gsap.fromTo(media,{opacity:0,scale:.985},{opacity:1,scale:1,duration:.7,ease:'power2.out',clearProps:'transform,opacity'});
      gsap.fromTo(resultRef.current,{opacity:0,y:12},{opacity:1,y:0,duration:.5,ease:'power2.out',clearProps:'transform,opacity'});
      gsap.fromTo(resultRef.current?.querySelectorAll('.pm-tags > span'),{opacity:0,y:7},{opacity:1,y:0,stagger:.07,duration:.3,delay:.18,ease:'power2.out',clearProps:'transform,opacity'});
      if(scoreRef.current && (result.best || result.suggestion).score !== null){
        const value={score:0};
        gsap.to(value,{score:(result.best || result.suggestion).score,duration:.8,ease:'power2.out',onUpdate:()=>{if(scoreRef.current)scoreRef.current.textContent=String(Math.round(value.score));},onInterrupt:()=>{if(scoreRef.current)scoreRef.current.textContent=String((result.best || result.suggestion).score);}});
      }
    });
    return()=>context.revert();
  },[resultRef,scoreRef,result,motion]);
}
