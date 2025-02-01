// npm install marked

const fs = require('fs');
const marked = require('marked');

fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const html = marked(data);

    fs.writeFile('index.html', html, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('HTML file has been saved as index.html');
    });
});
