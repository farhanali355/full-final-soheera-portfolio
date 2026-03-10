const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update the style block to be more specific and not override PC behavior too much
const styleBlock = `
<style>
    /* Desktop behavior: Keep them side-by-side if they were floating */
    @media (min-width: 768px) {
        .custom_portfolio_list li {
            width: 48% !important;
            float: left !important;
            margin-right: 2% !important;
        }
        /* Specific adjustments for the headings the user liked */
        .website-cat-heading { margin-top: -85px !important; }
        .designing-cat-heading { margin-top: -95px !important; }
    }

    /* Mobile adjustments: Stack them and move headings down */
    @media (max-width: 767px) {
        .custom_portfolio_list li {
            width: 100% !important;
            float: none !important;
            margin-right: 0 !important;
            margin-bottom: 30px !important;
        }
        .custom_portfolio_list .card-heading {
            margin-top: 10px !important;
            position: relative !important;
            z-index: 10 !important;
        }
        .about-card {
            margin-bottom: 20px !important;
        }
    }
</style>
`;

// Replace the old style block if it exists
if (html.includes('portfolio-cat-list')) {
    html = html.replace(/<style>[\s\S]*?<\/style>/, styleBlock);
} else {
    html = html.replace('</head>', styleBlock + '\n</head>');
}

// 2. Adjust the HTML structure
// Ensure the categories list uses the new class
html = html.replace('portfolio-cat-list', 'custom_portfolio_list');

// Fix the category headings back to what they were on PC
html = html.replace('<h3>Website Works</h3>', '<h3 class="website-cat-heading">Website Works</h3>');
html = html.replace('<h3>Designing Works</h3>', '<h3 class="designing-cat-heading">Designing Works</h3>');

// Ensure sub-items also use the custom class for mobile stacking
html = html.replace(/<ul class="gallery_zoom my_waypoint">/g, '<ul class="custom_portfolio_list gallery_zoom my_waypoint">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted PC layout while keeping mobile fixes');
