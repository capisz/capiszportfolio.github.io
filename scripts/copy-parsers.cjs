const fs = require('fs');
fs.mkdirSync('public/vendor', {recursive:true});
for (const file of ['pdf.mjs','pdf.worker.mjs']) fs.copyFileSync(`node_modules/pdfjs-dist/build/${file}`,`public/vendor/${file}`);
fs.copyFileSync('node_modules/fflate/esm/browser.js','public/vendor/fflate.js');
