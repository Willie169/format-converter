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

  headers.forEach((header) => {
    if (!header.id) {
      header.id = header.textContent
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^\w\-]+/g, '')
        .replace(/^-+|-+$/g, '');
    }

    tocListHTML += `<li class="${header.tagName.toLowerCase()}">`;
    tocListHTML += `<a href="#${header.id}">${header.textContent}</a>`;
    tocListHTML += '</li>\n';
  });

  tocListHTML += '</ul>';

  fs.writeFile('toc.html', tocListHTML, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing toc.html:', writeErr);
    } else {
      console.log('TOC generated successfully in toc.html');
    }
  });
});