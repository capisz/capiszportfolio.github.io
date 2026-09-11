/** @jest-environment node */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import {zipSync,strToU8} from 'fflate';
import * as fflate from 'fflate';
import {normalizeMatchText} from './matchText';
const source=fs.readFileSync(path.join(process.cwd(),'public/match-parser.js'),'utf8').replace(/^import .*;\n/,'').replace(/import\(/g,'loadModule(');
async function parse(bytes,name='brief.docx',pdf={}) {
 let result;
 const task={promise:Promise.resolve({numPages:1,getJSActions:async()=>null,getAttachments:async()=>null,getOpenAction:async()=>null,getPage:async()=>({getJSActions:async()=>null,getAnnotations:async()=>[],getTextContent:async()=>({items:[{str:'React Native'}]}),cleanup:()=>{}}),...pdf}),destroy:jest.fn()};
 const getDocument=jest.fn(()=>task);
 const context={self:{postMessage:value=>{result=value;},location:{href:'http://localhost:4173/match-parser.js'}},normalizeMatchText,Uint8Array,DataView,TextDecoder,URL,loadModule:async name=>name.includes('fflate')?fflate:name.endsWith('pdf.mjs')?{GlobalWorkerOptions:{},getDocument}: {}};
 vm.runInNewContext(source,context);
 await context.self.onmessage({data:{bytes:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),name}});
 return {...result,getDocument,task};
}
const doc=(text,extra={})=>zipSync({'word/document.xml':strToU8(`<w:document><w:t>${text}</w:t></w:document>`),...extra});
test('normalization stays identical between typed and worker text',()=>{
 expect(fs.readFileSync(path.join(process.cwd(),'public/match-text.js'),'utf8')).toBe(fs.readFileSync(path.join(process.cwd(),'src/components/PortfolioSite/matchText.js'),'utf8'));
});
test('real ZIP decompression extracts text only',async()=>{
 expect((await parse(doc('React Native &amp; Expo'))).text).toBe('React Native & Expo');
 expect((await parse(doc('&lt;script&gt;React&lt;/script&gt;'))).text).toBe('<script>React</script>');
});
test.each(['\0','\u000b','\u007f'])('rejects control abuse in all text sources',async value=>{
 expect((await parse(strToU8('React'+value),'brief.txt')).error).toMatch(/plain text|control/);
 expect((await parse(doc('React'+value))).error).toMatch(/control/);
});
test('normalizes bidi and limits extracted text',async()=>{
 expect((await parse(strToU8('\u202eReact Native\u2069'),'brief.txt')).text).toBe('React Native');
 expect((await parse(doc('x'.repeat(30001)))).error).toMatch(/30,000/);
 expect((await parse(new Uint8Array(5*1024*1024+1),'brief.txt')).error).toMatch(/5 MB/);
});
test.each([
 ['bad signature',()=>strToU8('not a zip')],
 ['truncated ZIP',()=>doc('React').slice(0,-8)],
 ['entities',()=>doc('<!DOCTYPE x [<!ENTITY e SYSTEM "file:///etc/passwd">]>')],
 ['embedded objects',()=>doc('React',{'word/embeddings/object.bin':strToU8('x')})],
 ['macros',()=>doc('React',{'word/vbaProject.bin':strToU8('x')})],
 ['external relationship',()=>doc('React',{'word/_rels/document.xml.rels':strToU8('<Relationship TargetMode="External" Target="https://example.invalid"/>')})],
 ['oversized expanded archive',()=>doc('React',{'padding.dat':new Uint8Array(8*1024*1024+1)})],
 ['aggregate archive limit',()=>doc('React',{'a.dat':new Uint8Array(5*1024*1024),'b.dat':new Uint8Array(5*1024*1024)})],
 ['too many files',()=>doc('React',Object.fromEntries(Array.from({length:201},(_,i)=>['file'+i,strToU8('x')])))]
])('rejects %s',async(_,fixture)=>expect((await parse(fixture())).error).toBeTruthy());
test.each(['/JavaScript','/JS','/J#61vaScript','/EmbeddedFile','/OpenAction','/Launch','/RichMedia','/AA','/XFA'])('rejects active PDF token %s before loading PDF.js',async token=>{
 const r=await parse(strToU8('%PDF-1.7 '+token),'brief.pdf');expect(r.error).toMatch(/active|embedded/);expect(r.getDocument).not.toHaveBeenCalled();
});
test('PDF extraction keeps evaluator disabled and destroys the task',async()=>{
 const r=await parse(strToU8('%PDF-1.7'),'brief.pdf');expect(r.text).toBe('React Native');expect(r.getDocument.mock.calls[0][0].isEvalSupported).toBe(false);expect(r.task.destroy).toHaveBeenCalled();
});
test.each([{numPages:31},{getOpenAction:async()=>({action:'Print'})},{getPage:async()=>({getJSActions:async()=>null,getAnnotations:async()=>[{url:'https://example.invalid'}]})},{getAttachments:async()=>({file:{}})},{getJSActions:async()=>({script:[]})}])('rejects parsed PDF limits and active objects',async pdf=>{
 const r=await parse(strToU8('%PDF-1.7'),'brief.pdf',pdf);expect(r.error).toBeTruthy();expect(r.task.destroy).toHaveBeenCalled();
});
