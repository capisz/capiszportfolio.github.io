// Transcribed from public/assets/christopher-capizzuto-resume.pdf.
// Refresh this profile when the user supplies a replacement résumé.
const demonstrated = ['React','Next.js','TypeScript','Node','PostgreSQL','PostGIS','SwiftUI','Tailwind','REST API','MongoDB','Electron'];
const listed = ['JavaScript','HTML','Swift','CSS','Firebase','SQL'];
export const resumeEvidence = Object.fromEntries([
  ...demonstrated.map(skill=>[skill,{score:95,label:'Demonstrated in résumé projects'}]),
  ...listed.map(skill=>[skill,{score:90,label:'Listed in résumé skills or coursework'}]),
  ['Python',{score:65,label:'Listed as familiar in résumé'}],
]);
export function assessResume(requested) {
  const skills=requested.map(skill=>({skill,...(resumeEvidence[skill]||{score:null,label:'Not mentioned in current résumé'})}));
  return {
    skills,
    score:skills.length?Math.round(skills.reduce((sum,item)=>sum+(item.score??0),0)/skills.length):null,
    covered:skills.filter(item=>item.score!==null).length,
  };
}
