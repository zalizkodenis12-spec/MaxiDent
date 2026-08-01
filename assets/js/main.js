(() => {
  const header = document.getElementById('siteHeader');
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
      const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-hidden-up', 'is-hidden-down');
        } else {
          entry.target.classList.remove('is-visible');
          if (entry.boundingClientRect.top < window.innerHeight / 2) {
            entry.target.classList.add('is-hidden-up');
          } else {
            entry.target.classList.add('is-hidden-down');
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' });

    revealTargets.forEach((el) => observer.observe(el));
  }

  // ===== Custom Fixed Slots Carousel =====
  const track = document.getElementById('servicesCarouselTrack');
  if (track) {
    const categories = [
      { slug: 'terapiya', title: 'Терапевтична стоматологія', img: 'assets/images/терапевтична стоматологія.png' },
      { slug: 'endodontiya', title: 'Ендодонтичне лікування', img: 'assets/images/ендодонтичне лікування.png' },
      { slug: 'ortopediya', title: 'Ортопедична стоматологія', img: 'assets/images/ортопедичне лікування.png' },
      { slug: 'ortodontiya', title: 'Ортодонтія', img: 'assets/images/ортодонтія.png' },
      { slug: 'implantaciya', title: 'Імплантація', img: 'assets/images/імплантація.png' },
      { slug: 'ortoped-etap', title: 'Ортопедичний етап', img: 'assets/images/ортопедичний етап.png' },
      { slug: 'hirurgiya', title: 'Хірургічне лікування', img: 'assets/images/хірургічне лікування.png' }
    ];
    
    let currentIndex = 0;
    const slots = [
      track.querySelector('.slot-left-2'),
      track.querySelector('.slot-left-1'),
      track.querySelector('.slot-center'),
      track.querySelector('.slot-right-1'),
      track.querySelector('.slot-right-2')
    ];
    
    const renderSlots = () => {
      slots.forEach(slot => slot.classList.add('fading'));
      setTimeout(() => {
        slots.forEach((slot, i) => {
          const offset = i - 2;
          let catIndex = (currentIndex + offset) % categories.length;
          if (catIndex < 0) catIndex += categories.length;
          
          const cat = categories[catIndex];
          slot.href = `/services/${cat.slug}`;
          slot.querySelector('img').src = cat.img;
          slot.querySelector('img').alt = cat.title;
          slot.querySelector('h3').textContent = cat.title;
          slot.classList.remove('fading');
        });
      }, 250);
    };
    
    renderSlots();
    
    document.querySelector('.custom-carousel-wrapper .next-btn').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % categories.length;
      renderSlots();
    });
    document.querySelector('.custom-carousel-wrapper .prev-btn').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + categories.length) % categories.length;
      renderSlots();
    });
  }

  // ===== Booking form -> Telegram =====
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = document.getElementById('bookingStatus');
  const cfg = window.SITE_CONFIG || {};

  const setFieldError = (field, message) => {
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    const errorEl = field.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message || '';
  };

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => setFieldError(field, ''));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const comment = form.comment.value.trim();

    let firstInvalid = null;

    if (!name) {
      setFieldError(form.name, "Вкажіть, будь ласка, ваше ім'я");
      firstInvalid = firstInvalid || form.name;
    }
    if (!phone) {
      setFieldError(form.phone, 'Вкажіть номер телефону');
      firstInvalid = firstInvalid || form.phone;
    } else if (!/^[+0-9][0-9\s()-]{6,}$/.test(phone)) {
      setFieldError(form.phone, 'Перевірте формат номера');
      firstInvalid = firstInvalid || form.phone;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилаємо…';
    statusEl.textContent = '';
    statusEl.className = 'booking-status';

    const service = form.service ? form.service.value.trim() : '';
    const text = [
      '💜 Нова заявка з сайту Салон краси «KARI»',
      '',
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      `Послуга: ${service || '—'}`,
      `Побажання: ${comment || '—'}`
    ].join('\n');

    try {
      if (!cfg.telegramBotToken || cfg.telegramBotToken.includes('PASTE_')) {
        throw new Error('not-configured');
      }

      const response = await fetch(`https://api.telegram.org/bot${cfg.telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: cfg.telegramChatId, text })
      });

      if (!response.ok) throw new Error('bad-response');

      form.reset();
      statusEl.textContent = "Дякуємо! Майстер зв'яжеться з вами найближчим часом.";
      statusEl.className = 'booking-status success';
    } catch (err) {
      statusEl.innerHTML = `Не вдалося надіслати заявку. Зателефонуйте напряму: <a href="tel:${cfg.phone}">${cfg.phoneDisplay}</a>`;
      statusEl.className = 'booking-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Записатися';
    }
  });
})();