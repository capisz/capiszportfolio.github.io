import { featured, projects } from '../../data/portfolioContent';
import { projectEvidence, skillAliases, roleAliases } from '../../data/projectEvidence';
import { normalizeMatchText } from './matchText';
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = term => new RegExp('(^|[^a-z0-9])(' + escape(term) + ')(?=$|[^a-z0-9])', 'gi');
// Patterns come only from the fixed dictionary, never from input.
const terms = Object.entries(skillAliases).flatMap(([skill, aliases]) => aliases.map(term => ({skill, term, regex: pattern(term)}))).sort((a,b) => b.term.length-a.term.length);
const roles = Object.entries(roleAliases).map(([role, aliases]) => [role, aliases.map(pattern)]);
const demos = {'PrizeCheck':'pokemon', 'DraftKings NBA Optimizer':'draftkings', 'backstop.ai':'backstop', CareCation:'carecation-hq', Dragapultist:'dragapultist', 'Contessa Shop':'contessa', 'Concrete Jungle Sports':'nba-blog', 'Hudson Chess':'hudson-chess'};
export const catalog = [featured, ...projects].map(p => {
  const evidence = {...projectEvidence[p.title], repositoryUrl: p.codeUrl || null};
  return {...p, evidence, tech: evidence.verified ? [...evidence.canonicalSkills, ...evidence.supportingTechnologies] : p.tech, demo: demos[p.title] ? `/assets/demos/${demos[p.title]}.mp4` : p.isVideo ? p.media : null};
});
// Explicit broader relationships are partial ranking evidence, never exact matches.
const broader = {React:['React Native'], SQL:['PostgreSQL'], Swift:['SwiftUI'], AI:['Claude API'], LLM:['Claude API']};
// Alignment is an explicitly weighted estimate, distinct from literal coverage.
export function techAlignment(matched, requested) {
  if (!requested) return null;
  return Math.min(95, Math.round(100 * matched / (matched + (requested - matched) * .5)));
}
export function matchProjects(input) {
  const text = normalizeMatchText(input).toLowerCase();
  const occupied = new Uint8Array(text.length), found = new Set();
  terms.forEach(({skill,regex}) => {
    regex.lastIndex=0;
    let match;
    while ((match=regex.exec(text))) {
      const start=match.index+match[1].length, end=start+match[2].length;
      if (!occupied.slice(start,end).some(Boolean)) {found.add(skill); occupied.fill(1,start,end);}
    }
  });
  const requested=Object.keys(skillAliases).filter(s=>found.has(s));
  const requestedRoles=roles.filter(([,patterns])=>patterns.some(p=>{p.lastIndex=0;return p.test(text);})).map(([role])=>role);
  const ranked=catalog.map(p=>{
    const skills=new Set([...p.evidence.canonicalSkills,...p.evidence.supportingTechnologies]);
    const exact=requested.filter(s=>skills.has(s));
    const matched=requested.filter(s=>skills.has(s)||(broader[s]||[]).some(t=>skills.has(t)));
    const supporting=matched.filter(s=>p.evidence.supportingTechnologies.includes(s));
    const roleMatches=requestedRoles.filter(s=>p.evidence.capabilities.includes(s));
    return {...p, exact, matched, supporting, roleMatches, alignment:techAlignment(matched.length,requested.length), missing:requested.filter(s=>!matched.includes(s)), score:requested.length?Math.round(matched.length/requested.length*100):null};
  }).sort((a,b)=>b.exact.length-a.exact.length || b.matched.length-a.matched.length || (b.score||0)-(a.score||0) || b.roleMatches.length-a.roleMatches.length || (a.title.toLowerCase()<b.title.toLowerCase()?-1:1));
  const candidates=ranked.filter(p=>p.matched.length);
  const best=candidates[0]||null;
  const status=!requested.length?'unrecognized':best?'matched':'no-evidence';
  const suggestion=ranked.slice().sort((a,b)=>b.roleMatches.length-a.roleMatches.length || Number(b.title==='PrizeCheck')-Number(a.title==='PrizeCheck'))[0];
  const explanation=!requested.length?'No recognized technologies. This is a featured suggestion, not a scored match.':!best?`0 of ${requested.length} recognized technologies have verified project evidence. 0% coverage; no matching project.`:`${best.matched.length} of ${requested.length} recognized technologies have project evidence (${best.exact.length} exact${best.supporting.length?`; supporting tooling: ${best.supporting.join(', ')}`:''}).`;
  return {requested, requestedRoles, status, best, suggestion, alternatives:candidates.slice(1,3), explanation:explanation+' Tech Alignment is an estimate: evidenced skills count twice as much as gaps, capped at 95%. It is not literal coverage, hiring probability or overall qualification. Equal evidence is ordered by role relevance, then project title.'};
}
