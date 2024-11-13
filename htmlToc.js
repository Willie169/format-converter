// npm install jsdom

const fs = require('fs');
const { JSDOM } = require('jsdom');

fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  const dom = new JSDOM(data);
  const document = dom.window.document;

  const headers = document.querySelectorAll('h2, h3');
  let tocListHTML = '<ul id="toc-list">\n';

  let currentH2 = null;

  headers.forEach((header) => {
    if (!header.id) {
      header.id = header.textContent
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/^-+|-+$/g, '');
    }

    if (header.tagName.toLowerCase() === 'h2') {
      if (currentH2) {
        tocListHTML += '</ul>\n</li>\n';
      }
      
      tocListHTML += `<li class="h2"><a href="#${header.id}">${header.textContent}</a>\n<ul>\n`;
      currentH2 = header;
    } else if (header.tagName.toLowerCase() === 'h3' && currentH2) {
      tocListHTML += `<li class="h3"><a href="#${header.id}">${header.textContent}</a></li>\n`;
    }
  });

  if (currentH2) {
    tocListHTML += '</ul>\n</li>\n';
  }

  tocListHTML += '</ul>';

  fs.writeFile('TOC.html', tocListHTML, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing toc.html:', writeErr);
    } else {
      console.log('TOC generated successfully in TOC.html');
    }
  });
});