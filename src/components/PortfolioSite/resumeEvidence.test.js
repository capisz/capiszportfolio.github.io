import {assessResume} from '../../data/resumeEvidence';
import {matchProjects} from './matchEngine';
test('résumé recognizes core web skills even when selected project omits them',()=>{
 const r=matchProjects('React TypeScript JavaScript HTML CSS REST APIs AI');
 expect(r.resumeMatch.skills.find(s=>s.skill==='HTML').score).toBe(90);
 expect(r.resumeMatch.skills.find(s=>s.skill==='JavaScript').score).toBe(90);
 expect(r.resumeMatch.skills.find(s=>s.skill==='CSS').score).toBe(90);
 expect(r.resumeMatch.score).toBe(79);
});
test('résumé distinguishes familiarity and unlisted skills without inventing evidence',()=>{
 expect(assessResume(['Python','Azure']).skills.map(s=>s.score)).toEqual([65,null]);
 expect(assessResume([]).score).toBeNull();
});
