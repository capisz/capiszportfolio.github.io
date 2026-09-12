import { useEffect, useRef, useState } from 'react';

// Transparent, integer-coordinate recreation of the supplied pixel-art knight.
export default function PixelKnight() {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const update=entry=>setVisible(entry.isIntersecting&&!document.hidden);
    const observer=new IntersectionObserver(([entry])=>update(entry),{threshold:.1});
    const visibility=()=>setVisible(!document.hidden&&node.getBoundingClientRect().bottom>0&&node.getBoundingClientRect().top<window.innerHeight);
    observer.observe(node);document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return <svg ref={ref} className={`pf-knight ${visible?'is-visible':''}`} viewBox="0 0 76 92" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <g className="pf-knight-mane" fill="#10bfae">
      <path d="M25 5h22v3h6v4h-3v8h5v3h-5v5h-7v4h-6v8h-5v10h-5V18h-4V9h2zM17 11h8v5h-5v4h-7v5H8v6H4v-7h3v-7h5v-4h5zM9 34h15v5H12v7h-2v8H4V40h3zM8 56h17v5H12v6H6v-7h2zM14 68h12v11h-7v5h-8v-4h3z"/>
      <path className="pf-knight-mane-glint" d="M42 10h7v3h-4v4h-3zM17 25h5v7h-3v-3h-2zM11 43h9v3h-5v4h-4z"/>
    </g>
    <path fill="#f5dfad" d="M28 3h4v5h4v5h5v4h6v4h6v4h6v5h6v4h6v6h3v12h-3v5h-8v4H52v-3H39v4h3v4h5v5h4v6h4v6h3v7H11v-7h4v-5h3V65h3V23h-3v-9h4V6h6zm-5 12v9h3V9h-3z"/>
    <path fill="#0b2230" d="M32 9v9h-4v6h-3v42h-3v12h-3v6h34v-4h-3v-6h-4v-5h-5v-6h-6V51h5v3h11v3h12v-4h6v-4h1V42h-5v-5h-6v-5h-6v-5h-6v-5h-6v-5h-5v-5z"/>
    <g className="pf-knight-eyes" fill="#18ead5"><path d="M40 32h5v6h-5zM51 32h5v6h-5z"/></g>
    <g fill="#f5dfad"><path d="M57 45h5v3h-5zM64 49h5v3h-5zM39 51h6v3h-6z"/><path d="M29 56h3v3h2v3h-5z"/></g>
    <g fill="#10bfae"><path d="M25 25h3v28h-3zM35 55h5v7h5v9h4v9H31V66h-4v-8h8zM19 80h34v4H19zM14 87h42v2H14z"/></g>
    <g className="pf-knight-binary" fill="#f5dfad">
      <path d="M26 70h2v7h-2zm4 0h5v2h-3v3h3v2h-5zm8 0h2v7h-2zm4 0h5v2h-3v3h3v2h-5z"/>
    </g>
  </svg>;
}
