const fs = require('fs');

const cssFile = 'd:/Мої сайти/MaksiDent_site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const newAnimations = `
/* ===== ADVANCED ANIMATIONS ===== */
.reveal {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Carousel crossfade */
.service-card {
  transition: opacity 0.3s ease, transform 0.3s ease, box-shadow var(--transition) !important;
}
.service-card.fading {
  opacity: 0 !important;
}

/* Stagger icons */
.trust-item.reveal { transition-delay: 0.1s; }
.trust-item.reveal:nth-child(2) { transition-delay: 0.2s; }
.trust-item.reveal:nth-child(3) { transition-delay: 0.3s; }
.trust-item.reveal:nth-child(4) { transition-delay: 0.4s; }

/* Stagger review cards */
.review-card.reveal { transition-delay: 0.1s; }
.review-card.reveal:nth-child(2) { transition-delay: 0.25s; }
.review-card.reveal:nth-child(3) { transition-delay: 0.4s; }

/* Image scale */
.about-media.reveal {
  transform: scale(0.95);
}
.about-media.reveal.is-visible {
  transform: scale(1);
}

/* About text & list stagger */
.about-content.reveal { transition-delay: 0.15s; }
.about-list li {
  opacity: 0;
  transform: translateX(-15px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.about-content.reveal.is-visible .about-list li {
  opacity: 1;
  transform: translateX(0);
}
.about-content.reveal.is-visible .about-list li:nth-child(1) { transition-delay: 0.2s; }
.about-content.reveal.is-visible .about-list li:nth-child(2) { transition-delay: 0.28s; }
.about-content.reveal.is-visible .about-list li:nth-child(3) { transition-delay: 0.36s; }
.about-content.reveal.is-visible .about-list li:nth-child(4) { transition-delay: 0.44s; }

/* FAQ stagger */
.faq-container.reveal .faq-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.faq-container.reveal.is-visible .faq-item {
  opacity: 1;
  transform: translateY(0);
}
.faq-container.reveal.is-visible .faq-item:nth-child(1) { transition-delay: 0.1s; }
.faq-container.reveal.is-visible .faq-item:nth-child(2) { transition-delay: 0.18s; }
.faq-container.reveal.is-visible .faq-item:nth-child(3) { transition-delay: 0.26s; }
.faq-container.reveal.is-visible .faq-item:nth-child(4) { transition-delay: 0.34s; }
.faq-container.reveal.is-visible .faq-item:nth-child(5) { transition-delay: 0.42s; }

/* Buttons bounce/scale */
.reveal .btn {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, background-color var(--transition), color var(--transition);
}
.reveal.is-visible .btn {
  opacity: 1;
  transform: scale(1);
}
.reveal.is-visible .btn:hover {
  transform: translateY(-2px);
}
`;

if (!css.includes('ADVANCED ANIMATIONS')) {
  css += newAnimations;
  fs.writeFileSync(cssFile, css);
  console.log('Advanced animations added successfully.');
} else {
  console.log('Animations already exist.');
}
