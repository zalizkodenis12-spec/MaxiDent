const fs = require('fs');

const cssFile = 'd:/Мої сайти/MaksiDent_site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

// Replace the previous overrides section
const oldOverridesStart = css.indexOf('/* ===== USER FONT OVERRIDES ===== */');
if (oldOverridesStart !== -1) {
  css = css.substring(0, oldOverridesStart);
}

const newOverrides = `/* ===== USER FONT OVERRIDES ===== */
.section-title, .adv-title {
  font-family: 'Playfair Display', serif !important;
  font-style: italic !important;
  font-weight: 700 !important;
}
.hero-sub {
  font-family: var(--font-body) !important;
  font-style: normal !important;
  font-weight: 400 !important;
  transform: skewX(-12deg);
  transform-origin: left bottom;
  display: block;
}
.trust-item span {
  font-family: 'Playfair Display', serif !important;
  font-style: italic !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}
.about-list li {
  font-family: 'Playfair Display', serif !important;
  font-style: italic !important;
  font-size: 17px !important;
  font-weight: 500 !important;
}
.adv-list li {
  font-family: 'Playfair Display', serif !important;
  font-style: italic !important;
  font-size: 19px !important;
  font-weight: 500 !important;
}
`;

css += newOverrides;
fs.writeFileSync(cssFile, css);
console.log('Fixed fonts successfully.');
