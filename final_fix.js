const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Better CSS block
const styleBlock = `
<style>
    /* Default behavior (Desktop) */
    .custom_portfolio_list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: block; /* Use block + float to match original theme behavior */
    }
    .custom_portfolio_list a {
        display: block;
        width: 48%;
        float: left;
        margin-right: 2%;
        text-decoration: none;
    }
    .custom_portfolio_list li {
        width: 100% !important;
        float: none !important;
        list-style: none;
    }
    
    /* Reverting the headings to the user's preferred PC positions */
    .website-cat-heading { margin-top: -85px !important; }
    .designing-cat-heading { margin-top: -95px !important; }

    /* Mobile adjustments (Phone) */
    @media (max-width: 767px) {
        .custom_portfolio_list a {
            width: 100% !important;
            float: none !important;
            margin-right: 0 !important;
            margin-bottom: 20px !important;
        }
        .custom_portfolio_list .card-heading {
            margin-top: 10px !important; /* Move heading below image on mobile so it's readable */
            position: relative !important;
            z-index: 10 !important;
        }
        /* Reset specific headings for mobile */
        .website-cat-heading, .designing-cat-heading { margin-top: 10px !important; }
    }
</style>
`;

// Replace style block
html = html.replace(/<style>[\s\S]*?<\/style>/, styleBlock);

// 2. Remove problematic inline margin-top from the HTML itself to let CSS handle it
html = html.replace(/style="margin-top: -[0-9]+px;"/g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Final layout fixes applied');
