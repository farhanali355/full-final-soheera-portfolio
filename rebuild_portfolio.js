const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let repl = fs.readFileSync('replacement_v2.txt', 'utf8');

// 1. Remove ANY style block in the head
html = html.replace(/<style>[\s\S]*?<\/style>/g, '');

// 2. Prepare the replacement content with the correct margins
// Categories
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>', 'style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>', 'style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');

// Sub-items
repl = repl.replace(/style="margin-top: 15px;">/g, 'style="margin-top: -45px;">');

// Re-fix the categories if they were caught by the global replace
repl = repl.replace('style="margin-top: -45px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>', 'style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
repl = repl.replace('style="margin-top: -45px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>', 'style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');

// 3. Find the portfolio section and rebuild it
let startMark = '<div class="grax_tm_portfolio">';
let endMark = '<!-- /PORTFOLIO -->';

let startIdx = html.indexOf(startMark);
let endIdx = html.indexOf(endMark);

if (startIdx !== -1 && endIdx !== -1) {
    // Keep the title part (Selected Works)
    let titleEnd = '</h3>';
    let titleEndIdx = html.indexOf(titleEnd, startIdx) + titleEnd.length;
    // Go until the end of the div holding the title
    let titleDivEnd = '</div>';
    let titleDivEndIdx = html.indexOf(titleDivEnd, titleEndIdx) + titleDivEnd.length;

    let before = html.substring(0, titleDivEndIdx);
    let after = html.substring(endIdx);

    const finalHtml = before + '\n\t\t\t\t\t\t\t\t\t\t\t' + repl + '\n\t\t\t\t' + after;
    fs.writeFileSync('index.html', finalHtml, 'utf8');
    console.log('REBUILT ENTIRE PORTFOLIO SECTION SUCCESSFULLY');
}
