const fs = require('fs');
const path = require('path');

const categories = [
  {
    slug: 'terapiya',
    title: 'Терапевтична стоматологія',
    desc: 'Ефективне лікування карієсу та його ускладнень з використанням сучасних матеріалів.',
    img: '../assets/images/терапевтична стоматологія.png',
    services: [
      { name: 'Консультація', price: '300 грн' },
      { name: 'Рентгендіагностика (візіограф)', price: '200 грн' },
      { name: 'Ізоляція зуба кофердамом оптрагейт', price: '50 грн' },
      { name: 'Тимчасова пломба', price: '300 грн' },
      { name: 'Ізолююча прокладка зі склоіономерного цементу', price: '300 грн' },
      { name: 'Пломба поверхневий карієс', price: '1500 грн' },
      { name: 'Пломба середній карієс', price: '1900 грн' },
      { name: 'Пломба глибокий карієс', price: '2300 грн' },
      { name: 'Анестезія', price: '250 грн' },
      { name: 'Професійна гігієна', price: 'від 1700 грн' },
      { name: 'Покриття зуба фторвмісним препаратом', price: '300 грн' },
      { name: 'Герметизація фісур (1 зуб)', price: '800 грн' },
      { name: 'Реставрація переднього зуба', price: '2500-4000 грн' },
      { name: 'Реставрація бокового зуба', price: '2500-4000 грн' },
      { name: 'Реставрація культі зуба', price: '1500-2000 грн' },
      { name: 'Встановлення дентальних стразів', price: '1800 грн' },
      { name: 'Шинування зубів за допомогою скловолоконної стрічки (1 зуб)', price: 'від 1000 грн' },
      { name: 'Фіксація скловолоконного штифта', price: '1000 грн' },
      { name: 'Фіксація анкерного штифта', price: '800 грн' },
      { name: 'Відбілювання однієї щелепи', price: 'від 3000 грн' },
      { name: 'Виготовлення адгезивного протезу', price: '4000 грн' },
      { name: 'Ретракція ясен', price: '50 грн' }
    ]
  },
  {
    slug: 'endodontiya',
    title: 'Ендодонтичне лікування',
    desc: 'Професійне лікування кореневих каналів зубів під мікроскопом.',
    img: '../assets/images/ендодонтичне лікування.png',
    services: [
      { name: 'Накладання девіталізуючої пасти', price: '200 грн' },
      { name: 'Розпломбування кореневого каналу', price: '500 грн' },
      { name: 'Антисептична обробка і пломбування кореневого каналу гарячою гутаперчею', price: '1200 грн' },
      { name: 'Тимчасове пломбування кореневого каналу кальційвмісним препаратом', price: '500 грн' },
      { name: 'Закриття перфорації прорутом', price: '500 грн' },
      { name: 'Розширення кореневого каналу під куксову вкладку', price: '200 грн' },
      { name: 'Видалення куксової вкладки', price: '1500 грн' },
      { name: 'Вилучення анкерного штифта, скловолоконного', price: '600 грн' }
    ]
  },
  {
    slug: 'ortopediya',
    title: 'Ортопедична стоматологія',
    desc: 'Відновлення цілісності зубного ряду за допомогою сучасних протезів.',
    img: '../assets/images/ортопедичне лікування.png',
    services: [
      { name: 'Виготовлення діагностичних моделей', price: '1000 грн' },
      { name: 'Зняття відбитку С-сілікон (1 щелепа)', price: '1000 грн' },
      { name: 'Зняття відбитку А-сілікон (1 щелепа)', price: '1250 грн' },
      { name: 'Зняття відбитку Альгінат (1 щелепа )', price: '750 грн' },
      { name: 'Виготовлення тимчасової коронки', price: '1000 грн' },
      { name: 'Суцільнолита коронка', price: '3200 грн' },
      { name: 'Металокерамічна коронка', price: '4800 грн' },
      { name: 'Цирконієва коронка', price: 'від 7500 грн' },
      { name: 'Прескераміка', price: '8500 грн' },
      { name: 'Вініри', price: '10000 грн' },
      { name: 'Вкладка куксова', price: 'від 1500 грн' },
      { name: 'Протез акриловий', price: '9500 грн' },
      { name: 'Протез бюгельний', price: 'від 25000 грн' },
      { name: 'Ремонт протезу', price: '1000 грн' },
      { name: 'Перебазування протезу', price: '1000 грн' },
      { name: 'Зняття штампованої коронки', price: '300 грн' },
      { name: 'Індивідуальна ложка', price: '800 грн' },
      { name: 'Цементування коронки цемент Fuji+', price: '200 грн' },
      { name: 'Цементування коронки подвійного затвердіння', price: '250 грн' },
      { name: 'Виготовлення нейлонового протеза', price: '11500 грн' },
      { name: 'Зняття литої,мк,цирконової коронки', price: '800 грн' }
    ]
  },
  {
    slug: 'ortodontiya',
    title: 'Ортодонтія',
    desc: 'Виправлення прикусу та вирівнювання зубів брекет-системами та елайнерами.',
    img: '../assets/images/ортодонтія.png',
    services: [
      { name: 'Консультація', price: '200 грн' },
      { name: 'Металеві брекети ( 1 щелепа)', price: '13500 грн' },
      { name: 'Керамічні брекети (1 щелепа)', price: '18500 грн' },
      { name: 'Самолігуючі брекети (1 щелепа)', price: '22000 грн' },
      { name: 'Елайнери', price: 'від 55000 грн' },
      { name: 'Пластинка', price: 'від 3000 грн' },
      { name: 'Функціональні апарати', price: 'від 4500 грн' },
      { name: 'Трейнери', price: '5000 грн' },
      { name: 'Зняття відбитків', price: '1500 грн' },
      { name: 'Брекет контроль (1 щелепа)', price: '600 грн' },
      { name: 'Контроль комплексний', price: '600 грн' },
      { name: 'Заміна дуги (1 щелепа)', price: '600 грн' }
    ]
  },
  {
    slug: 'implantaciya',
    title: 'Імплантація',
    desc: 'Безпечне встановлення зубних імплантів провідних світових виробників.',
    img: '../assets/images/імплантація.png',
    services: [
      { name: 'Імплант Mega Gen Anyone (Пд. Корея)', price: '16500 грн' },
      { name: 'Імплант Mega Gen Anyridge (Пд. Корея)', price: '23000 грн' },
      { name: 'Імплант Straumann (Швейцарія)', price: '25000 грн' },
      { name: 'Синус - ліфтинг відкритий', price: '21000 грн' },
      { name: 'Синус - ліфтинг закритий', price: '12500 грн' },
      { name: 'Забір аутокістки', price: '1500 грн' },
      { name: 'Формувач', price: '1500 грн' }
    ]
  },
  {
    slug: 'ortoped-etap',
    title: 'Ортопедичний етап',
    desc: 'Протезування на імплантах для повного відновлення жувальної функції.',
    img: '../assets/images/ортопедичний етап.png',
    services: [
      { name: 'Тимчасова коронка', price: '2800 грн' },
      { name: 'Мультиюніт Mega Gen', price: 'від 2500 грн' },
      { name: 'Мультиюніт Straumann', price: 'від 3000 грн' },
      { name: 'Коронка на імпланті - металокераміка', price: 'від 10500 грн' },
      { name: 'Коронка на імпланті - цирконій або прескераміка', price: 'від 14000 грн' },
      { name: 'Фіксація коронки', price: '300 грн' }
    ]
  },
  {
    slug: 'hirurgiya',
    title: 'Хірургічне лікування',
    desc: 'Атравматичне видалення зубів будь-якої складності та інші хірургічні втручання.',
    img: '../assets/images/хірургічне лікування.png',
    services: [
      { name: 'Видалення молочного зуба', price: '700 грн' },
      { name: 'Видалення однокореневого зуба', price: 'від 1500 грн' },
      { name: 'Видалення багатокореневого зуба', price: 'від 1800 грн' },
      { name: 'Видалення зуба мудрості (прорізаний)', price: 'від 2000 грн' },
      { name: 'Видалення зуба мудрості (напівпрорізаний)', price: 'від 2500 грн' },
      { name: 'Видалення зуба мудрості (непрорізаний)', price: 'від 3000 грн' },
      { name: 'Атипове видалення зуба мудрості', price: 'від 4000 грн' },
      { name: 'Відкритий кюретаж (1 зуб)', price: '400 грн' },
      { name: 'Закритий кюретаж (1 зуб)', price: '300 грн' },
      { name: 'Кюретаж лунки', price: 'від 200 грн' },
      { name: 'Резекція різця', price: '10000 грн' },
      { name: 'Резекція премоляра', price: '12000 грн' },
      { name: 'Резекція моляра', price: '14000 грн' },
      { name: 'Корекція вуздечки', price: '2000 грн' },
      { name: 'Лікування альвеоліту за допомогою PRF', price: '1000 грн' },
      { name: 'Коагуляція м\'яких тканин', price: '300 грн' },
      { name: 'Клінічне видовження коронки зуба', price: '1000 грн' },
      { name: 'Хірургічне лікування перикоронариту зуба', price: '700 грн' },
      { name: 'Використання PRF мембрани', price: '800 грн' },
      { name: 'Накладання гемостатичної, колагенової губки', price: '300 грн' },
      { name: 'Накладання колагенового конуса Collacone', price: '800 грн' },
      { name: 'Ушиття лунки', price: '300 грн' },
      { name: 'Послаблюючий розріз', price: '200 грн' }
    ]
  }
];

const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerEnd = indexHtml.indexOf('<!-- HERO -->');
const actualFooterStart = indexHtml.indexOf('<footer class="site-footer">');

const headerPart = indexHtml.substring(0, headerEnd);
const footerPart = indexHtml.substring(actualFooterStart);

const servicesDir = path.join(__dirname, 'services');
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);

categories.forEach(cat => {
  const servicesHtml = cat.services.map((srv, idx) => `
    <div class="service-row reveal" style="transition-delay: ${(idx % 10) * 0.05}s;">
      <div class="service-info">
        <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
        <span class="service-name">${srv.name}</span>
      </div>
      <div class="service-price">${srv.price}</div>
    </div>
  `).join('');

  const content = `
  <style>
    .category-hero {
      position: relative;
      min-height: 45vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 100px;
      padding-bottom: 60px;
    }
    .category-hero-bg {
      position: absolute; inset: 0; z-index: -1;
    }
    .category-hero-bg img {
      width: 100%; height: 100%; object-fit: cover;
    }
    .category-hero-scrim {
      position: absolute; inset: 0;
      background: rgba(14, 11, 20, 0.65);
    }
    .category-hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      max-width: 900px;
      padding: 0 20px;
    }
    .category-hero-title {
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      color: #fff;
      margin-bottom: 20px;
      line-height: 1.1;
    }
    .category-hero-desc {
      color: rgba(255, 255, 255, 0.9);
      font-size: clamp(1rem, 1.5vw, 1.15rem);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .services-wrapper {
      background: #f9fbfd;
      padding: 80px 0;
    }
    .services-list {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .service-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .service-row:hover {
      transform: translateY(-3px) scale(1.01);
      box-shadow: 0 12px 30px rgba(14, 165, 233, 0.08);
      border-color: rgba(14, 165, 233, 0.3);
    }
    .service-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .service-icon {
      width: 24px; height: 24px;
      color: var(--accent);
      flex-shrink: 0;
    }
    .service-name {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--text-primary);
    }
    .service-price {
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--accent);
      white-space: nowrap;
      margin-left: 20px;
    }
    
    @media (max-width: 768px) {
      .service-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 20px;
      }
      .service-price {
        margin-left: 40px;
        font-size: 1.2rem;
      }
    }
  </style>

  <section class="category-hero">
    <div class="category-hero-bg">
      <img src="${cat.img}" alt="${cat.title}" onerror="this.src='../assets/images/фонове на місці заявки.jpg'">
      <div class="category-hero-scrim"></div>
    </div>
    <div class="category-hero-content">
      <a href="/#services" class="btn btn-outline" style="margin-bottom: 30px; border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(0,0,0,0.3); backdrop-filter: blur(10px);">← Назад до послуг</a>
      <h1 class="category-hero-title reveal">${cat.title}</h1>
      <p class="category-hero-desc reveal" style="transition-delay: 0.1s;">${cat.desc}</p>
    </div>
  </section>

  <section class="services-wrapper">
    <div class="container">
      <div class="services-list">
        ${servicesHtml}
      </div>
      <div style="margin-top: 60px; text-align: center;" class="reveal">
        <a href="/#booking" class="btn btn-cta btn-lg" style="color: #ffffff; padding: 18px 40px; font-size: 16px;">Записатись на прийом</a>
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

console.log("Created 7 service pages with real data and UI enhancements.");
