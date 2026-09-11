import { useEffect, useState } from 'react';

export function useMotionPreferences() {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('portfolio-motion-paused') === 'true'; } catch { return false; }
  });
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    query.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => { query.removeEventListener('change', change); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const toggle = () => setPaused(value => {
    try { localStorage.setItem('portfolio-motion-paused', String(!value)); } catch { /* Storage is optional. */ }
    return !value;
  });
  return { enabled: !paused && !reduced && !hidden, paused, reduced, toggle };
}

export function useTypewriter(text, enabled, speed = 25) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (!enabled || length >= text.length) return;
    const timer = setTimeout(() => setLength(n => n + 1), speed);
    return () => clearTimeout(timer);
  }, [text, enabled, speed, length]);
  return enabled ? text.slice(0, length) : text;
}
