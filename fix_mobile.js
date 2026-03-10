const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add a CSS block for mobile responsiveness
const styleBlock = `
<style>
    /* Desktop layout for categories */
    .portfolio-cat-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .portfolio-cat-list li {
        width: 48%;
        margin-bottom: 20px;
        float: none !important; /* Override potential floats */
    }
    .portfolio-cat-list li a {
        display: block;
        width: 100%;
    }

    /* Mobile adjustments */
    @media (max-width: 767px) {
        .portfolio-cat-list li {
            width: 100% !important;
        }
        .portfolio-cat-list .card-heading,
        .gallery_zoom .card-heading {
            margin-top: 10px !important; /* Move heading below the image on mobile */
            padding-bottom: 20px;
        }
        .about-card {
            margin-bottom: 40px;
        }
    }
</style>
`;

if (!html.includes('.portfolio-cat-list')) {
    html = html.replace('</head>', styleBlock + '\n</head>');
}

// 2. Apply the new class and remove inline styles from categories
html = html.replace('<div id="portfolio-categories">\r\n\t\t\t\t\t\t\t<ul class="gallery_zoom my_waypoint">',
    '<div id="portfolio-categories">\n\t\t\t\t\t\t\t<ul class="portfolio-cat-list gallery_zoom my_waypoint">');

// If already modified or slightly different whitespace:
html = html.replace('<div id="portfolio-categories">\n\t\t\t\t\t\t\t<ul class="gallery_zoom my_waypoint">',
    '<div id="portfolio-categories">\n\t\t\t\t\t\t\t<ul class="portfolio-cat-list gallery_zoom my_waypoint">');

// Remove the problematic inline styles from the category list items
html = html.replace(/<li class="wow fadeInLeft" data-wow-duration="1.5s" style="width: 48%; float: left; margin-right: 4%;">/g,
    '<li class="wow fadeInLeft" data-wow-duration="1.5s">');
html = html.replace(/<li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s" style="width: 48%; float: left;">/g,
    '<li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">');

// 3. Fix the sub-item view lists too to use flex and wrap
html = html.replace(/<ul class="gallery_zoom my_waypoint">/g, '<ul class="portfolio-cat-list gallery_zoom my_waypoint">');

// 4. Adjust the headings: the user manually set some to -85px and -95px. 
// We should probably remove these extreme negative margins or at least normalize them.
// Let's replace all margin-top: -XXpx; with a class or a smaller value for desktop.
html = html.replace(/margin-top: -[0-9]+px;/g, 'margin-top: -45px;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Responsive fixes applied successfully');
