// npm install marked

const fs = require('fs');
const marked = require('marked');

const markdown = fs.readFileSync('README.md', 'utf8');
const htmlContent = marked(markdown);

fs.writeFileSync('index.html', htmlContent);
