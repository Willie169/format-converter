// npm install showdown

const fs = require('fs');
const showdown = require('showdown');

const converter = new showdown.Converter();

fs.readFile('README.md', 'utf8', (err, markdownContent) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const htmlContent = converter.makeHtml(markdownContent);

    fs.writeFile('index.html', htmlContent, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }

        console.log('HTML file has been saved as index.html');
    });
});
