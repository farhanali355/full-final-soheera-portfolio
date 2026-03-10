const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let repl = fs.readFileSync('replacement_v2.txt', 'utf8');

// The block starts with <div class="portfolio_list">
let startStr = '<div class="portfolio_list">';
let startIdx = html.indexOf(startStr);

if (startIdx !== -1) {
    // The block we want to replace ends with the Designing View's closing div and the portfolio_list's closing div.
    // In our previous replace, we might have slightly different whitespace.
    // Let's find the Designing View closing div.
    let designEndStr = '<!-- Designing View -->';
    let designIdx = html.indexOf(designEndStr);

    if (designIdx !== -1) {
        // Find the last </div> before <!-- /PORTFOLIO -->
        let portfolioEndStr = '<!-- /PORTFOLIO -->';
        let portfolioEndIdx = html.indexOf(portfolioEndStr);

        if (portfolioEndIdx !== -1) {
            // The structure is:
            // </div> <!-- portfolio-designing -->
            // </div> <!-- portfolio_list -->
            // </div> <!-- container -->
            // </div> <!-- grax_tm_portfolio -->
            // </div> <!-- grax_tm_section -->

            // We want to replace from <div class="portfolio_list"> to the </div> that closes it.
            // Let's find the </div> just before the container's closing div.
            // Actually, let's just use a safer approach: find the sequence </div>\n\t\t\t\t\t</div>

            // Let's just find the first </div> after the last </ul> in the designing section.
            let lastUlIdx = html.lastIndexOf('</ul>', portfolioEndIdx);
            if (lastUlIdx !== -1) {
                let closingDiv1 = html.indexOf('</div>', lastUlIdx); // Closes portfolio-designing
                let closingDiv2 = html.indexOf('</div>', closingDiv1 + 6); // Closes portfolio_list

                if (closingDiv2 !== -1) {
                    let endIdx = closingDiv2 + 6;
                    let newHtml = html.substring(0, startIdx) + repl + html.substring(endIdx);
                    fs.writeFileSync('index.html', newHtml, 'utf8');
                    console.log('REPLACEMENT SUCCESSFUL');
                } else {
                    console.log('Cant find closing div 2');
                }
            } else {
                console.log('Cant find last ul');
            }
        }
    }
} else {
    console.log('Cant find startIdx');
}
