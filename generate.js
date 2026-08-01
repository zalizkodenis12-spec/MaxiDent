const fs = require('fs');
const path = require('path');

const categories = [
  { slug: 'terapiya', title: 'Терапевтична стоматологія', desc: 'Ефективне лікування карієсу та його ускладнень з використанням сучасних матеріалів.' },
  { slug: 'endodontiya', title: 'Ендодонтичне лікування', desc: 'Професійне лікування кореневих каналів зубів під мікроскопом.' },
  { slug: 'ortopediya', title: 'Ортопедична стоматологія', desc: 'Відновлення цілісності зубного ряду за допомогою сучасних протезів.' },
  { slug: 'ortodontiya', title: 'Ортодонтія', desc: 'Виправлення прикусу та вирівнювання зубів брекет-системами та елайнерами.' },
  { slug: 'implantaciya', title: 'Імплантація', desc: 'Безпечне встановлення зубних імплантів провідних світових виробників.' },
  { slug: 'ortoped-etap', title: 'Ортопедичний етап', desc: 'Протезування на імплантах для повного відновлення жувальної функції.' },
  { slug: 'hirurgiya', title: 'Хірургічне лікування', desc: 'Атравматичне видалення зубів будь-якої складності та інші хірургічні втручання.' }
];

const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerEnd = indexHtml.indexOf('<!-- HERO -->');
const actualFooterStart = indexHtml.indexOf('<footer class="site-footer">');

const headerPart = indexHtml.substring(0, headerEnd);
const footerPart = indexHtml.substring(actualFooterStart);

const servicesDir = path.join(__dirname, 'services');
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);

categories.forEach(cat => {
  const content = `
  <section class="hero" style="min-height: 40vh; padding-top: 120px;">
    <div class="hero-bg">
      <img src="https://placehold.co/1920x600/eaeaea/555555?text=BANNER" alt="${cat.title}">
      <div class="hero-scrim"></div>
    </div>
    <div class="container hero-inner">
      <a href="/#services" class="btn btn-ghost" style="color:var(--accent); margin-bottom: 20px;">← Назад до послуг</a>
      <h1 class="hero-title reveal">${cat.title}</h1>
      <p class="hero-sub reveal" style="max-width: 800px; text-transform:none;">${cat.desc}</p>
    </div>
  </section>
  <section class="section" style="background:#fff;">
    <div class="container">
      <h2 class="section-title" style="color:var(--accent);">Список послуг</h2>
      <p style="color:#555; max-width:800px; margin-bottom: 40px;">Детальний перелік процедур та цін для даної категорії.</p>
      
      <div class="works-grid" style="display:flex; flex-direction:column; gap: 16px;">
        <div style="padding: 20px; border: 1px solid var(--border); border-radius: 12px; display:flex; justify-content:space-between; align-items:center;">
          <div><strong style="color:#222">Первинна консультація</strong><br><span style="color:#666;">30 хв</span></div>
          <div style="font-weight:bold; color:var(--accent);">500 грн</div>
        </div>
        <div style="padding: 20px; border: 1px solid var(--border); border-radius: 12px; display:flex; justify-content:space-between; align-items:center;">
          <div><strong style="color:#222">Основна процедура лікування</strong><br><span style="color:#666;">60 хв</span></div>
          <div style="font-weight:bold; color:var(--accent);">від 1500 грн</div>
        </div>
      </div>
      
      <div style="margin-top: 40px; text-align:center;">
        <a href="/#booking" class="btn btn-cta btn-lg" style="color: #000;">Записатись на прийом</a>
      </div>
    </div>
  </section>
  `;
  
  let finalHtml = (headerPart + content + footerPart)
    .replace(/href="assets\//g, 'href="../assets/')
    .replace(/src="assets\//g, 'src="../assets/');

  fs.writeFileSync(path.join(servicesDir, cat.slug + '.html'), finalHtml);
});

fs.writeFileSync('vercel.json', JSON.stringify({ cleanUrls: true }, null, 2));

console.log("Created 7 service pages and vercel.json");
