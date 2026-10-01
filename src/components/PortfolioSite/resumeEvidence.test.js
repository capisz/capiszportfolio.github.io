import {assessResume} from '../../data/resumeEvidence';
import {matchProjects} from './matchEngine';
test('résumé recognizes core web skills even when selected project omits them',()=>{
 const r=matchProjects('React TypeScript JavaScript HTML CSS REST APIs AI');
 expect(r.resumeMatch.skills.find(s=>s.skill==='HTML').score).toBe(90);
 expect(r.resumeMatch.skills.find(s=>s.skill==='JavaScript').score).toBe(90);
 expect(r.resumeMatch.skills.find(s=>s.skill==='CSS').score).toBe(90);
 expect(r.resumeMatch.score).toBe(93);
});
test('résumé recognizes demonstrated Python and leaves unlisted skills unknown without inventing evidence',()=>{
 expect(assessResume(['Python','Rust']).skills.map(s=>s.score)).toEqual([95,null]);
 expect(assessResume([]).score).toBeNull();
});
