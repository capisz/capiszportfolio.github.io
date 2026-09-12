import { useState } from 'react';
import { useTypewriter } from './motion';

export default function UnderTheHood({project, motion}) {
  const [open,setOpen]=useState(false);
  const typed=useTypewriter(project.codeText, motion && open, 9);
  return <details className="pf-underhood" onToggle={e=>setOpen(e.currentTarget.open)}>
    <summary>Under the hood <span aria-hidden="true">＋</span></summary>
    <pre aria-hidden="true">{typed}</pre>
    <span className="pf-sr-only">{project.codeText}</span>
  </details>;
}
