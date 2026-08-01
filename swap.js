const fs = require('fs');

const file = 'd:/Мої сайти/MaksiDent_site/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Extract ABOUT and SERVICES sections
const aboutRegex = /<!-- ABOUT -->[\s\S]*?<\/section>/;
const servicesRegex = /<!-- SERVICES CAROUSEL -->[\s\S]*?<\/section>/;

let aboutMatch = html.match(aboutRegex);
let servicesMatch = html.match(servicesRegex);

if (!aboutMatch || !servicesMatch) {
    console.error("Could not find sections!");
    process.exit(1);
}

let aboutHtml = aboutMatch[0];
let servicesHtml = servicesMatch[0];

// Remove them from HTML temporarily, replacing with a placeholder
let remainingHtml = html.replace(aboutRegex, '%%%ABOUT_PLACEHOLDER%%%');
remainingHtml = remainingHtml.replace(servicesRegex, '%%%SERVICES_PLACEHOLDER%%%');

// 2. Modify ABOUT HTML
// Remove section-blue
aboutHtml = aboutHtml.replace('class="section about-section section-blue"', 'class="section about-section"');
// Fix button styling
aboutHtml = aboutHtml.replace('style="background: #ffffff; color: var(--accent);', 'style="background: var(--accent); color: #ffffff;');

// 3. Modify SERVICES HTML
// Make it blue, remove inline background #ffffff
servicesHtml = servicesHtml.replace('class="section services-section" id="services" style="background: #ffffff;"', 'class="section services-section section-blue" id="services"');
// Remove inline title colors
servicesHtml = servicesHtml.replace('style="color: var(--accent);"', '');
servicesHtml = servicesHtml.replace('style="color: #555555;"', '');
// Add text-align center back to title container? Wait, the container had: style="text-align:center; display:flex; flex-direction:column; align-items:center;"
// That's fine to keep.

// 4. Modify ADVANTAGES section texts
// We will do this by globally replacing in the remainingHtml OR the final HTML. Let's do it in the whole HTML later.

// 5. Place them in the new order.
// Originally: ABOUT_PLACEHOLDER came before SERVICES_PLACEHOLDER.
// Now we swap them.
let newHtml = remainingHtml.replace('%%%ABOUT_PLACEHOLDER%%%', servicesHtml);
newHtml = newHtml.replace('%%%SERVICES_PLACEHOLDER%%%', aboutHtml);

// 6. Update ADVANTAGES text
// Replace Якість -> Безпека
// Since there's <img src="assets/images/фонове на місці ....png" alt="Якість"> and <h2 class="adv-title">Якість</h2>
newHtml = newHtml.replace('alt="Якість"', 'alt="Безпека"');
newHtml = newHtml.replace('<h2 class="adv-title">Якість</h2>', '<h2 class="adv-title">Безпека</h2>');

// Replace Якість description
const oldQualityDesc = `<p class="adv-desc">Коли йдеться про здоров'я, питання якості послуг та компетентності фахівців мають бути на першому місці.</p>
          <p class="adv-desc">І для нас – це правило №1. Якість наших послуг базується на:</p>
          <ul class="adv-list">
            <li>сучасних методах діагностики;</li>
            <li>використанні сертифікованих матеріалів найкращих світових виробників;</li>
            <li>постійному професійному удосконаленні лікарів;</li>
            <li>використанні сучасного обладнання.</li>
          </ul>`;

const newSafetyDesc = `<p class="adv-desc">Коли йдеться про здоров'я, питання безпеки та інфекційного контролю мають бути на першому місці. Ми гарантуємо 100% стерильність на кожному етапі лікування.</p>
          <p class="adv-desc">Безпека наших послуг базується на:</p>
          <ul class="adv-list">
            <li>багатоступеневій стерилізації інструментів в автоклавах класу B;</li>
            <li>використанні індивідуальних стерильних пакетів, які відкриваються при вас;</li>
            <li>регулярному кварцюванні та дезінфекції всіх кабінетів;</li>
            <li>використанні одноразових розхідних матеріалів (рукавички, маски).</li>
          </ul>`;

newHtml = newHtml.replace(oldQualityDesc, newSafetyDesc);

// Replace Час description
const oldTimeDesc = `<p class="adv-desc">На сьогоднішній день час є чи не найдорожчим ресурсом, який не поновиться ніколи. Саме тому спеціалісти нашої клініки надають якісні послуги один раз і надовго.</p>
          <p class="adv-desc">Завітавши до нас, Вам не доведеться витрачати час на пошук того чи іншого спеціаліста, або ж їздити містом з метою провести діагностичне дослідження.</p>
          <ul class="adv-list">
            <li>всі види стоматологічних послуг під одним дахом;</li>
            <li>швидка постановка діагнозу;</li>
            <li>оперативне планування лікування.</li>
          </ul>`;

const newTimeDesc = `<p class="adv-desc">На сьогоднішній день час є чи не найдорожчим ресурсом. Саме тому спеціалісти нашої клініки надають якісні послуги так, щоб ви отримали ідеальний результат з мінімальними витратами часу.</p>
          <p class="adv-desc">Завітавши до нас, вам не доведеться витрачати час на черги, пошук різних спеціалістів або поїздки містом для діагностики.</p>
          <ul class="adv-list">
            <li>всі види стоматологічних послуг під одним дахом;</li>
            <li>власна рентген-діагностика безпосередньо в кріслі;</li>
            <li>оперативне планування комплексного лікування в день звернення;</li>
            <li>прийом точно у призначений час без очікувань.</li>
          </ul>`;

newHtml = newHtml.replace(oldTimeDesc, newTimeDesc);

fs.writeFileSync(file, newHtml, 'utf8');
console.log('Successfully swapped sections and updated text.');
