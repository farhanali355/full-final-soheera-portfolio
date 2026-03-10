const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let repl = fs.readFileSync('replacement_v2.txt', 'utf8');

// Set the category margins
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>', 'style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>', 'style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');
repl = repl.replace(/style="margin-top: 15px;"/g, 'style="margin-top: -45px;"');

// Ensure the category replacements happened (handle potential whitespace diffs)
if (!repl.includes('-85px')) {
    repl = repl.replace(/<div class="card-heading"[^>]*>\s*<h3>Website Works<\/h3>/, '<div class="card-heading" style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
}
if (!repl.includes('-95px')) {
    repl = repl.replace(/<div class="card-heading"[^>]*>\s*<h3>Designing Works<\/h3>/, '<div class="card-heading" style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');
}

// Find the portfolio section
let startMark = '<div class="portfolio_list">';
let endMark = '<!-- /PORTFOLIO -->';

let startIdx = html.indexOf(startMark);
let endIdx = html.indexOf(endMark);

if (startIdx !== -1 && endIdx !== -1) {
    let before = html.substring(0, startIdx);
    let after = html.substring(endIdx);

    fs.writeFileSync('index.html', before + repl + '\n\t\t\t\t' + after, 'utf8');
    console.log('REBUILT PORTFOLIO LIST CLEANLY');
}
