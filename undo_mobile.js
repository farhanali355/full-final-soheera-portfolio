const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the style block added to the head
html = html.replace(/<style>[\s\S]*?<\/style>/, '');

// 2. Load the replacement_v2 content as the base for the portfolio section
let repl = fs.readFileSync('replacement_v2.txt', 'utf8');

// 3. Update the margins in the replacement content to match the state before the mobile mess
// Categories margins
repl = repl.replace('<h3>Website Works</h3>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>', '<h3>Website Works</h3>\n\t\t\t\t\t\t\t\t\t\t\t</div>'); // Normalizing
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>', 'style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
repl = repl.replace('style="margin-top: 15px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>', 'style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');

// Other item margins to -45px
repl = repl.replace(/style="margin-top: 15px;">/g, 'style="margin-top: -45px;">');
// Fix the two we already changed back if they got caught by regex
repl = repl.replace('style="margin-top: -45px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>', 'style="margin-top: -85px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Website Works</h3>');
repl = repl.replace('style="margin-top: -45px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>', 'style="margin-top: -95px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<h3>Designing Works</h3>');

// 4. Find the portfolio block and replace it
let startStr = '<div class="portfolio_list">';
let startIdx = html.indexOf(startStr);

if (startIdx !== -1) {
    let endPortStr = '<!-- /PORTFOLIO -->';
    let endPortIdx = html.indexOf(endPortStr);

    if (endPortIdx !== -1) {
        // Find the </div> just before <!-- /PORTFOLIO -->
        let lastUlIdx = html.lastIndexOf('</ul>', endPortIdx);
        let closingDiv1 = html.indexOf('</div>', lastUlIdx); // Closes category div
        let closingDiv2 = html.indexOf('</div>', closingDiv1 + 6); // Closes portfolio_list

        let before = html.substring(0, startIdx);
        let after = html.substring(closingDiv2 + 6);

        fs.writeFileSync('index.html', before + repl + after, 'utf8');
        console.log('Successfully undid changes after mobile request');
    }
}
