// npm install markdown-toc

const fs = require('fs');
const toc = require('markdown-toc');

fs.readFile('README.md', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading README.md:', err);
    return;
  }

  const tocContent = toc(data).content;

  fs.writeFile('TOC.md', tocContent, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing TOC.md:', writeErr);
    } else {
      console.log('TOC generated and saved to TOC.md');
    }
  });
});