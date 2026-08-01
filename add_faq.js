const fs = require('fs');

const cssFile = 'd:/Мої сайти/MaksiDent_site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');
css += `\n
/* ===== FAQ ===== */
.faq-section { padding: 80px 0; }
.faq-list { margin-top: 48px; display: flex; flex-direction: column; gap: 16px; }
.faq-item {
  background: var(--bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  transition: box-shadow var(--transition);
}
.faq-item:hover { box-shadow: var(--shadow-sm); }
.faq-question {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 24px;
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.faq-icon {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  transition: transform 0.3s ease;
}
.faq-question[aria-expanded="true"] .faq-icon {
  transform: rotate(45deg);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-answer-inner {
  padding: 0 24px 24px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}
`;
fs.writeFileSync(cssFile, css);

const htmlFile = 'd:/Мої сайти/MaksiDent_site/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const jsCode = `
<script>
  // FAQ Accordion
  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const isExpanded = item.getAttribute('aria-expanded') === 'true';
        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.setAttribute('aria-expanded', 'false');
          otherItem.nextElementSibling.style.maxHeight = null;
        });
        // Toggle current
        if (!isExpanded) {
          item.setAttribute('aria-expanded', 'true');
          const answer = item.nextElementSibling;
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  });
</script>
</body>
`;
html = html.replace('</body>', jsCode);
fs.writeFileSync(htmlFile, html);
