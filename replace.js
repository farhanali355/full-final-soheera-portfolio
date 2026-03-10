const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let repl = fs.readFileSync('replacement.txt', 'utf8');
let result = html.replace(/<div class="portfolio_list">[\s\S]*?<\/ul>[\s]*<\/div>/i, repl);
fs.writeFileSync('index.html', result, 'utf8');
console.log('Replaced successfully');
