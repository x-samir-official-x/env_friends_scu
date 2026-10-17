/* ════════════════════════════════════════════════════════════
   أصدقاء البيئة — app.js
   كل المحتوى جاي من config.js. الثيم واللغة بيتطبقوا على الموقع كله.
════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const state = { lang: root.getAttribute('data-lang') || 'ar', theme: root.getAttribute('data-theme') || 'light', statsPlayed: false };
  const L = (ar, en) => (state.lang === 'en' ? en : ar);
  const T = key => (C.i18n[key] ? C.i18n[key][state.lang] : '');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const safeStore = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  /* ───── تحميل الصور: يجرب الصورة المحلية (بأي امتداد) ثم الاحتياطية ───── */
  const EXT = ['.jpg', '.jpeg', '.png', '.webp'];
  const expand = u => (/\.(jpe?g|png|webp|avif|svg)(\?|$)/i.test(u) || /^https?:/i.test(u) ? [u] : EXT.map(e => u + e));
  const cache = new Map();
  const probe = u => cache.get(u) || (cache.set(u, new Promise(res => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = u; })), cache.get(u));
  const firstLoadable = async list => { for (const u of [].concat(list).flatMap(expand)) if (await probe(u)) return u; return null; };

  /* ───── الثيم واللغة ───── */
  const applyTheme = () => {
    root.setAttribute('data-theme', state.theme);
    const m = $('meta[name="theme-color"]'); if (m) m.content = state.theme === 'dark' ? '#052549' : '#FCFCF9';
    $('#theme-toggle')?.setAttribute('aria-checked', state.theme === 'dark');
  };
  const applyLang = () => {
    root.setAttribute('lang', state.lang); root.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr'); root.setAttribute('data-lang', state.lang);
    document.title = L('أصدقاء البيئة — كلية التجارة | جامعة قناة السويس', 'Environment Friends — Faculty of Commerce | Suez Canal University');
    $$('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', T(el.dataset.i18nAria)));
    renderAll();
  };
  $('#theme-toggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; safeStore('ef-theme', state.theme); applyTheme(); });
  $('#lang-toggle').addEventListener('click', () => { state.lang = state.lang === 'ar' ? 'en' : 'ar'; safeStore('ef-lang', state.lang); applyLang(); });

  /* ───── روابط فاضية → رسالة "قريبًا" ───── */
  const toast = $('#toast'); let toastT;
  const showToast = msg => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 2600); };
  const linkProps = href => (href ? `href="${esc(href)}" target="_blank" rel="noopener"` : `href="#" data-empty="1"`);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-empty="1"]'); if (a) { e.preventDefault(); showToast(T('toastSoon')); }
  });
  const wireLinkButtons = () => $$('[data-link]').forEach(a => {
    const href = C.links[a.dataset.link];
    if (href) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.removeAttribute('data-empty'); }
    else { a.href = '#'; a.setAttribute('data-empty', '1'); a.removeAttribute('target'); }
  });

  /* ───── الرندر ───── */
  const mono = s => (s || '').replace(/^(أ\.د\/|دكتور|د\/|Prof\. Dr\.|Dr\.)\s*/i, '').trim().charAt(0).toUpperCase();
  const renderNav = () => {
    const links = C.nav.map(n => `<a href="${n.href}" data-sec="${n.href.slice(1)}">${esc(L(n.ar, n.en))}</a>`).join('');
    $('#nav-list').innerHTML = links; $('#drawer-list').innerHTML = links;
    $('#footer-links').innerHTML = C.nav.map(n => `<li><a href="${n.href}">${esc(L(n.ar, n.en))}</a></li>`).join('');
    $$('#drawer-list a').forEach(a => a.addEventListener('click', closeDrawer));
    updateActive();
  };

  /* عداد odometer: الأرقام بتلف وتقف على القيمة (صفر دلوقتي) */
  const odoHTML = value => {
    const digits = String(Math.max(0, Math.floor(value))).padStart(2, '0').split('');
    const strip = '0123456789'.repeat(3).split('').map(d => `<span>${d}</span>`).join('');
    return (value > 0 ? `<span class="plus">+</span>` : '') + digits.map(d => `<span class="od"><span class="od-strip" data-d="${d}">${strip}</span></span>`).join('');
  };
  const rollOdo = (card, instant) => $$('.od-strip', card).forEach((s, i) => {
    const target = 20 + Number(s.dataset.d);
    if (instant) { s.style.transition = 'none'; s.style.transform = `translateY(-${target}em)`; return; }
    s.style.transitionDuration = (2 + i * 0.5) + 's';
    requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = `translateY(-${target}em)`; }));
  });
  const renderStats = () => {
    $('#stats-grid').innerHTML = C.stats.map((s, i) => `
      <div class="stat-card reveal" style="--i:${i}">
        <div class="stat-icon"><i class="ph-bold ${s.icon}"></i></div>
        <div class="odo">${odoHTML(s.value)}</div>
        <span class="stat-label">${esc(L(s.ar, s.en))}</span>
      </div>`).join('');
    if (state.statsPlayed) $$('.stat-card').forEach(c => { c.classList.add('in'); rollOdo(c, true); });
    else observe($$('#stats-grid .reveal'));
  };
  const renderAbout = () => {
    $('#about-cards').innerHTML = C.about.map((a, i) => `
      <article class="about-card reveal" style="--i:${i}">
        <div class="about-ico"><i class="ph-bold ${a.icon}"></i></div>
        <div><h3>${esc(L(a.ar, a.en))}</h3><p>${esc(L(a.textAr, a.textEn))}</p></div>
      </article>`).join('');
    $('#link-cards').innerHTML = C.officialLinks.map((l, i) => `
      <a class="link-card reveal" style="--i:${i}" ${linkProps(C.links[l.linkKey])}>
        <i class="ph-bold ${l.icon} lc-ico"></i><h4>${esc(L(l.ar, l.en))}</h4><p>${esc(L(l.descAr, l.descEn))}</p>
        <span class="more">${esc(T('readMore'))} <i class="ph-bold ph-arrow-${state.lang === 'ar' ? 'left' : 'right'}"></i></span>
      </a>`).join('');
  };
  const vipCard = (p, i) => `
    <article class="vip-card reveal" style="--i:${i}">
      <span class="vip-badge"><i class="ph-fill ph-crown-simple"></i>VIP</span>
      <div class="vip-photo"><div class="vip-mono" data-photo="${esc(p.photo)}">${esc(mono(L(p.ar, p.en)))}</div></div>
      ${p.chipAr ? `<span class="vip-chip">${esc(L(p.chipAr, p.chipEn))}</span>` : ''}
      <h3>${esc(L(p.ar, p.en))}</h3>
      <p class="vip-title">${esc(L(p.titleAr, p.titleEn))}</p>
    </article>`;
  const renderPeople = () => {
    $('#supervision-grid').innerHTML = C.supervision.map(vipCard).join('');
    $('#leadership-grid').innerHTML = C.leadership.map(vipCard).join('');
    $$('.vip-mono[data-photo]').forEach(async el => {
      const url = await firstLoadable(el.dataset.photo);
      if (url) { const img = document.createElement('img'); img.src = url; img.alt = el.parentElement.parentElement.querySelector('h3').textContent; img.loading = 'lazy'; el.replaceWith(img); }
    });
  };
  const renderCampaigns = () => {
    $('#campaigns-grid').innerHTML = C.campaigns.map((c, i) => `
      <article class="camp-card reveal" style="--i:${i}">
        <div class="camp-img">
          <div class="camp-fallback"><i class="ph-bold ${c.icon}"></i></div>
          <div class="bgimg" data-img='${esc(JSON.stringify(c.image))}'></div>
          <div class="date-badge"><b>${esc(c.day)}</b><span>${esc(L(c.monthAr, c.monthEn))}</span></div>
          <span class="soon">${esc(T('soon'))}</span>
        </div>
        <div class="camp-body">
          <h3>${esc(L(c.ar, c.en))}</h3>
          <div class="camp-date"><i class="ph-bold ph-calendar-blank"></i>${esc(L(c.dateAr, c.dateEn))}</div>
          <p>${esc(L(c.descAr, c.descEn))}</p>
        </div>
      </article>`).join('');
    $$('.bgimg[data-img]').forEach(async el => { const u = await firstLoadable(JSON.parse(el.dataset.img.replace(/&quot;/g, '"'))); if (u) el.style.backgroundImage = `url("${u}")`; });
  };
  const renderContact = () => {
    const a = $('#contact-fb'); a.href = C.contact.href; $('#contact-handle').textContent = C.contact.handle;
  };
  const renderSocials = () => {
    $('#socials').innerHTML = C.socials.map(s => `<a ${linkProps(s.href)} aria-label="${esc(s.label)}" title="${esc(s.label)}"><i class="ph-fill ${s.icon}"></i></a>`).join('');
  };
  function renderAll() { renderNav(); renderStats(); renderAbout(); renderPeople(); renderCampaigns(); renderContact(); renderSocials(); wireLinkButtons(); observe($$('.reveal:not(.in)')); }

  /* ───── Reveal + بدء العداد ───── */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in'); io.unobserve(en.target);
    if (en.target.classList.contains('stat-card')) { state.statsPlayed = true; setTimeout(() => rollOdo(en.target, false), 250); }
  }), { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  function observe(list) { list.forEach(el => io.observe(el)); }

  /* ───── الصور الثابتة (خلفيات + لوجوهات) ───── */
  const setBackgrounds = () => $$('[data-bg]').forEach(async el => { const u = await firstLoadable(C.images[el.dataset.bg]); if (u) el.style.backgroundImage = `url("${u}")`; });
  const setLogos = () => {
    $('#brand-logo').src = C.images.ecoLogo; $('#footer-logo').src = C.images.ecoLogo;
    $('#hero-logo-1').src = C.images.facultyEmblem; $('#hero-logo-2').src = C.images.ecoLogo;
    $$('#brand-logo,#footer-logo,#hero-logo-1,#hero-logo-2').forEach(i => { i.alt = ''; });
  };

  /* ───── أوراق متساقطة في الهيرو ───── */
  const makeLeaves = () => {
    const box = $('#leaves'); let html = '';
    for (let i = 0; i < 12; i++) {
      const left = Math.random() * 100, size = 14 + Math.random() * 22, dur = 9 + Math.random() * 9, delay = -Math.random() * 14;
      const dx = (Math.random() * 160 - 80).toFixed(0) + 'px', rot = (Math.random() * 540 - 270).toFixed(0) + 'deg';
      html += `<i class="ph-fill ph-leaf leaf" style="left:${left}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;--dx:${dx};--rot:${rot}"></i>`;
    }
    box.innerHTML = html;
  };

  /* ───── النافبار: scroll + active ───── */
  const header = $('#navbar');
  const updateActive = () => {
    const y = scrollY + 140; let cur = 'hero';
    ['hero', 'about', 'supervision', 'leadership', 'campaigns', 'join', 'contact'].forEach(id => { const s = document.getElementById(id); if (s && s.offsetTop <= y) cur = id; });
    if (cur === 'stats') cur = 'hero';
    $$('.nav-list a, .drawer-list a').forEach(a => a.classList.toggle('active', a.dataset.sec === cur));
  };
  const onScroll = () => { header.classList.toggle('scrolled', scrollY > 60); updateActive(); };
  addEventListener('scroll', onScroll, { passive: true });

  /* ───── Drawer ───── */
  const drawer = $('#drawer'), overlay = $('#drawer-overlay');
  function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
  $('#nav-burger').addEventListener('click', () => { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
  $('#drawer-close').addEventListener('click', closeDrawer); overlay.addEventListener('click', closeDrawer);
  addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ───── تشغيل ───── */
  setLogos(); setBackgrounds(); makeLeaves(); applyTheme(); applyLang(); onScroll();
})();
