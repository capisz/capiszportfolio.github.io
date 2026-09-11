import { normalizeMatchText } from './match-text.js';
// Untrusted documents are text sources only. Never render markup or follow links.
const MAX_TEXT = 30000;
const MAX_EXPANDED = 8 * 1024 * 1024;
self.onmessage = async ({data:{bytes,name}}) => {
  try {
    const data = new Uint8Array(bytes);
    if (!data.length || data.length > 5 * 1024 * 1024) throw Error('Choose a non-empty document under 5 MB.');
    const ext = name.split('.').pop().toLowerCase();
    let text = '';
    if (ext === 'txt') {
      text = new TextDecoder('utf-8', {fatal:true}).decode(data);
      if (/[\u0000-\u0008\u000e-\u001f]/.test(text)) throw Error('This is not a plain text document.');
    } else if (ext === 'docx') {
      if (data[0] !== 80 || data[1] !== 75 || data[2] !== 3 || data[3] !== 4) throw Error('The file is not a valid DOCX document.');
      const {Unzip, UnzipInflate, strFromU8} = await import('./vendor/fflate.js');
      // Require a complete, single-disk ZIP directory before streaming entries.
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      let end = -1;
      for (let i=data.length-22; i>=Math.max(0,data.length-65557); i--) {
        if (view.getUint32(i,true)===0x06054b50 && i+22+view.getUint16(i+20,true)===data.length) {end=i;break;}
      }
      if (end<0 || view.getUint16(end+4,true) || view.getUint16(end+6,true)) throw Error('The ZIP directory is invalid.');
      const entries=view.getUint16(end+10,true);
      if (!entries || entries>200 || view.getUint16(end+8,true)!==entries || view.getUint32(end+12,true)+view.getUint32(end+16,true)!==end) throw Error('The ZIP directory exceeds supported limits.');
      let xml = '', total = 0, count = 0, documents = 0;
      const unzip = new Unzip(file => {
        if (++count > 200 || /vbaProject|embeddings\/|activeX\/|\.exe$|\.js$/i.test(file.name)) throw Error('Documents with macros or embedded content are not supported.');
        if (file.originalSize > MAX_EXPANDED) throw Error('The expanded document is too large.');
        if (/\.\.|^[/\\]|\.(?:html?|mhtml|bin|vbs|ps1)$/i.test(file.name)) throw Error('Active document content is not supported.');
        const document = file.name === 'word/document.xml';
        if (document && ++documents>1) throw Error('Duplicate document content is not supported.');
        const inspect = document || /\.(xml|rels)$/i.test(file.name);
        let length=0;
        const chunks = [];
        file.ondata = (err, chunk, final) => {
          if (err) throw err;
          total += chunk.length;
          if (total > MAX_EXPANDED) throw Error('The expanded document is too large.');
          length += chunk.length;
          if (inspect) chunks.push(chunk);
          if (final && inspect) {
            const merged = new Uint8Array(length); let offset = 0;
            chunks.forEach(c => {merged.set(c,offset); offset += c.length;});
            const content = strFromU8(merged);
            if (/<!DOCTYPE|<!ENTITY|<w:altChunk|<w:object|<w:instrText|TargetMode\s*=\s*["']External/i.test(content)) throw Error('Active or external document content is not supported.');
            if (document) xml = content;
          }
        };
        file.start();
      });
      unzip.register(UnzipInflate); unzip.push(data,true);
      if (count!==entries) throw Error('The ZIP entries are incomplete.');
      if (!xml || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw Error('This DOCX cannot be read safely. Paste the text instead.');
      // Extract only Word text runs; XML is never inserted into the page.
      text = [...xml.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join(' ')
        .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&');
    } else if (ext === 'pdf') {
      if (new TextDecoder().decode(data.slice(0,5)) !== '%PDF-') throw Error('The file is not a valid PDF.');
      const raw = new TextDecoder('latin1').decode(data).replace(/#([0-9a-f]{2})/gi, (_,hex)=>String.fromCharCode(parseInt(hex,16)));
      if (/\/(JavaScript|JS|Launch|EmbeddedFile|RichMedia|OpenAction|AA|XFA|SubmitForm|ImportData|GoToR)\b/.test(raw)) throw Error('PDFs with active or embedded content are not supported.');
      // Preload PDF.js's internal handler without attaching it to our worker port.
      globalThis.window = {};
      try { await import('./vendor/pdf.worker.mjs'); } finally { delete globalThis.window; }
      const pdfjs = await import('./vendor/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.mjs', self.location.href).href;
      const task = pdfjs.getDocument({data, isEvalSupported:false, useWasm:false, isOffscreenCanvasSupported:false, disableFontFace:true, useSystemFonts:false});
      try {
        const doc = await task.promise;
        if (doc.numPages > 30) throw Error('Please use a PDF with no more than 30 pages.');
        if (await doc.getJSActions() || await doc.getAttachments() || await doc.getOpenAction()) throw Error('PDFs with scripts or attachments are not supported.');
        for (let i=1; i<=doc.numPages; i++) {
          const page = await doc.getPage(i);
          if (await page.getJSActions()) throw Error('PDF scripts are not supported.');
          const annotations = await page.getAnnotations();
          if (annotations.some(a=>a.url || a.unsafeUrl || a.action || a.attachment || a.file || a.actions)) throw Error('PDFs with active links or embedded content are not supported.');
          const content = await page.getTextContent();
          text += content.items.map(item => item.str || '').join(' ') + '\n';
          page.cleanup();
          if (text.length > MAX_TEXT) throw Error('Please use a shorter document (30,000 characters max).');
        }
      } finally {await task.destroy();}
    } else throw Error('Choose a TXT, PDF or DOCX document.');
    text = normalizeMatchText(text);
    if (!text) throw Error('No readable text found. For scanned documents, paste the text instead.');
    if (text.length > MAX_TEXT) throw Error('Please use a shorter document (30,000 characters max).');
    self.postMessage({text});
  } catch (err) {self.postMessage({error:err.message || 'Unable to read this document. Please paste its text.'});}
};
