// npm install marked marked-gfm-heading-id

const fs = require('fs');
const marked = require("marked");
const gfmHeadingId = require("marked-gfm-heading-id");

marked.use(gfmHeadingId());

try {
  const markdown = fs.readFileSync('README.md', 'utf8');
  const htmlContent = marked(markdown);
  
  fs.writeFileSync('index.html', htmlContent);
  console.log('HTML file has been saved as index.html');
} catch (err) {
  console.error('An error occurred:', err);
}
