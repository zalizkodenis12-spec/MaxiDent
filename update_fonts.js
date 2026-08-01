const fs = require('fs');

const cssFile = 'd:/Мої сайти/MaksiDent_site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const overrides = `
/* ===== USER FONT OVERRIDES ===== */
.hero-sub {
  font-style: italic !important;
}
.section-title, .adv-title {
  font-family: var(--font-display) !important;
}
.trust-item span {
  font-family: var(--font-serif) !important;
  font-style: italic !important;
  font-size: 15px !important;
}
.about-list li {
  font-family: var(--font-serif) !important;
  font-style: italic !important;
  font-size: 17px !important;
}
.adv-list li {
  font-family: var(--font-serif) !important;
  font-style: italic !important;
  font-size: 19px !important;
}
`;

css += overrides;
fs.writeFileSync(cssFile, css);
console.log('Fonts updated successfully');
