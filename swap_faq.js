const fs = require('fs');

const file = 'd:/Мої сайти/MaksiDent_site/index.html';
let html = fs.readFileSync(file, 'utf8');

// Extract REVIEWS and FAQ sections
const reviewsRegex = /<!-- REVIEWS -->[\s\S]*?<\/section>\s*(?=<!-- FAQ -->)/;
const faqRegex = /<!-- FAQ -->[\s\S]*?<\/section>\s*(?=<!-- MAP \/ CONTACTS -->)/;

let reviewsMatch = html.match(reviewsRegex);
let faqMatch = html.match(faqRegex);

if (!reviewsMatch || !faqMatch) {
    console.error("Could not find sections! Maybe regex is slightly off.");
    // Let's try simpler regex if the first one fails
    const reviewsRegex2 = /<!-- REVIEWS -->[\s\S]*?<\/section>/;
    const faqRegex2 = /<!-- FAQ -->[\s\S]*?<\/section>/;
    reviewsMatch = html.match(reviewsRegex2);
    faqMatch = html.match(faqRegex2);
}

if (!reviewsMatch || !faqMatch) {
    console.error("Still couldn't find them.");
    process.exit(1);
}

let reviewsHtml = reviewsMatch[0];
let faqHtml = faqMatch[0];

let remainingHtml = html.replace(reviewsHtml, '%%%REVIEWS%%%');
remainingHtml = remainingHtml.replace(faqHtml, '%%%FAQ%%%');

// Swap their positions: originally it was REVIEWS then FAQ.
// So in remainingHtml it looks like:
// %%%REVIEWS%%%
// %%%FAQ%%%

// So we replace %%%REVIEWS%%% with faqHtml and %%%FAQ%%% with reviewsHtml
let newHtml = remainingHtml.replace('%%%REVIEWS%%%', faqHtml + '\n\n');
newHtml = newHtml.replace('%%%FAQ%%%', reviewsHtml);

fs.writeFileSync(file, newHtml, 'utf8');
console.log('Successfully swapped FAQ and REVIEWS sections.');
