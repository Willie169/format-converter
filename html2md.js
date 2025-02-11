// npm install node-html-markdown

const fs = require('fs');
const { NodeHtmlMarkdown } = require('node-html-markdown');

fs.readFile('index.html', 'utf8', (err, htmlContent) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const markdownContent = NodeHtmlMarkdown.translate(htmlContent).replaceAll(/```\n([\s\S]+?)\n\n```/, "```\n$1\n```");

    fs.writeFile('README.md', markdownContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        }
        
        console.log('Markdown file has been saved as README.md');
    });
});
