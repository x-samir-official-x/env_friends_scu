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

  /* ───── أيقونات SVG مدمجة (بدل أيقونات الخط) ───── */
  const hydrateIcons = (scope = document) => $$('i[class*="ph-"]', scope).forEach(el => {
    const cls = [...el.classList], fill = cls.includes('ph-fill');
    const name = (cls.find(c => /^ph-/.test(c) && c !== 'ph-fill' && c !== 'ph-bold') || '').slice(3);
    const body = (window.ICONS || {})[(fill ? 'fill/' : 'bold/') + name];
    if (!body) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 256 256'); svg.setAttribute('fill', 'currentColor'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'ph-svg ' + cls.filter(c => !/^ph-/.test(c)).concat(cls.filter(c => c === 'ph-sun' || c === 'ph-moon' || c === 'ph-fill')).join(' '));
    if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
    svg.innerHTML = body; el.replaceWith(svg);
  });

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
    $('#university-grid').innerHTML = C.university.map(vipCard).join('');
    $('#supervision-grid').innerHTML = C.supervision.map(vipCard).join('');
    $('#leadership-grid').innerHTML = C.leadership.map(vipCard).join('');
    $$('.vip-mono[data-photo]').forEach(async el => {
      const url = await firstLoadable(el.dataset.photo);
      if (url) { const img = document.createElement('img'); img.src = url; img.alt = el.parentElement.parentElement.querySelector('h3').textContent; img.loading = 'lazy'; el.replaceWith(img); }
    });
  };
  /* ───── معرض صور الفعاليات ───── */
  let manifest = {};
  const photosOf = c => { const m = manifest[c.id], l = Array.isArray(m) ? m : ((m && m.photos) || []); return l.map(f => `${c.folder}/${f}`).concat(c.gallery || []); };
  const coverOf = c => { const m = manifest[c.id]; return m && m.cover ? `${c.folder}/${m.cover}` : null; };
  const renderCampaigns = () => {
    $('#campaigns-grid').innerHTML = C.campaigns.map((c, i) => {
      const ph = photosOf(c), has = ph.length > 0;
      const stack = has ? `<span class="stack">${ph.slice(0, 3).map((u, k) => `<span class="stack-i" style="--k:${k};background-image:url('${esc(u)}')"></span>`).join('')}</span>
          <span class="count"><i class="ph-bold ph-images"></i>${ph.length} ${esc(T('photosWord'))}</span>
          <span class="tap"><i class="ph-bold ph-hand-tap"></i>${esc(T('viewPhotos'))}</span>` : '';
      return `
      <article class="camp-card reveal${has ? ' has-gallery' : ''}" style="--i:${i}" data-id="${esc(c.id)}" ${has ? `role="button" tabindex="0" aria-label="${esc(L(c.ar, c.en))} — ${esc(T('viewPhotos'))}"` : ''}>
        <div class="camp-img">
          <div class="camp-fallback"><i class="ph-bold ${c.icon}"></i></div>
          <div class="bgimg" data-img='${esc(JSON.stringify(coverOf(c) ? [coverOf(c)] : (has ? [ph[0]] : c.image)))}'></div>
          <div class="date-badge"><b>${esc(c.day)}</b><span>${esc(L(c.monthAr, c.monthEn))}</span></div>
          <span class="soon${c.done ? ' is-done' : ''}">${esc(T(c.done ? 'done' : 'soon'))}</span>
          ${stack}${!has && !c.done ? `<span class="tap later"><i class="ph-bold ph-images"></i>${esc(T('photosAfter'))}</span>` : ''}
        </div>
        <div class="camp-body">
          <h3>${esc(L(c.ar, c.en))}</h3>
          <div class="camp-date"><i class="ph-bold ph-calendar-blank"></i>${esc(L(c.dateAr, c.dateEn))}</div>
          <p>${esc(L(c.descAr, c.descEn))}</p>
        </div>
      </article>`;
    }).join('');
    $$('.bgimg[data-img]').forEach(async el => { const u = await firstLoadable(JSON.parse(el.dataset.img.replace(/&quot;/g, '"'))); if (u) el.style.backgroundImage = `url("${u}")`; });
  };
  /* لو الفعالية مالهاش صور في gallery.json، نقرأ فولدرها مباشرة من GitHub (الصور الجديدة تظهر لوحدها) */
  const ghList = async c => {
    if (!C.github || location.protocol === 'file:') return null;
    const key = 'ef-gh-' + c.id;
    try { const k = JSON.parse(sessionStorage.getItem(key)); if (k && Date.now() - k.t < 300000) return k.v; } catch (e) {}
    try {
      const r = await fetch(`https://api.github.com/repos/${C.github}/contents/${c.folder}`); if (!r.ok) return null;
      const names = (await r.json()).filter(f => f.type === 'file' && /\.(jpe?g|png|webp)$/i.test(f.name)).map(f => f.name).sort((x, y) => x.localeCompare(y, 'en', { numeric: true }));
      const cover = names.find(n => /^cover\./i.test(n)) || null, v = { cover, photos: names.filter(n => n !== cover) };
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch (e) {}
      return v;
    } catch (e) { return null; }
  };
  const loadManifest = async () => {
    try { const r = await fetch('gallery.json', { cache: 'no-cache' }); manifest = r.ok ? (await r.json()) || {} : {}; } catch (e) { manifest = {}; }
    await Promise.all(C.campaigns.filter(c => !(manifest[c.id] && (manifest[c.id].photos || manifest[c.id]).length)).map(async c => { const v = await ghList(c); if (v && v.photos.length) manifest[c.id] = v; }));
    teamFiles = (manifest.team && manifest.team.files) || await ghNames(C.team.folder);
    renderCampaigns(); renderTeam(); hydrateIcons(); observe($$('.reveal:not(.in)'));
  };

  /* أصوات ناعمة بـ WebAudio (من غير ملفات) */
  const sfx = (() => {
    let ctx, muted = false; try { muted = localStorage.getItem('ef-sound') === 'off'; } catch (e) {}
    const ac = () => ctx || (ctx = new (window.AudioContext || window.webkitAudioContext)());
    const tone = (f, t0, d, v) => { const c = ac(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + .05); };
    const whoosh = (d, v, f0, f1) => { const c = ac(), n = c.createBufferSource(), b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), x = b.getChannelData(0); for (let i = 0; i < x.length; i++) x[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / x.length); n.buffer = b; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .8; f.frequency.setValueAtTime(f0, c.currentTime); f.frequency.exponentialRampToValueAtTime(f1, c.currentTime + d); const g = c.createGain(); g.gain.value = v; n.connect(f).connect(g).connect(c.destination); n.start(); };
    const play = fn => { if (muted) return; try { ac().resume(); fn(); } catch (e) {} };
    return {
      get muted() { return muted; },
      toggle() { muted = !muted; safeStore('ef-sound', muted ? 'off' : 'on'); return muted; },
      open: () => play(() => { whoosh(.6, .32, 350, 3000); tone(659.25, .15, .8, .07); tone(987.77, .27, .9, .06); tone(1318.5, .4, 1.1, .045); }),
      flip: () => play(() => { whoosh(.22, .2, 900, 2400); tone(880, 0, .25, .035); }),
      close: () => play(() => whoosh(.32, .18, 2400, 450)),
    };
  })();

  const lb = { el: null, list: [], i: 0, from: null, title: '' };
  const buildLb = () => {
    const el = document.createElement('div'); el.className = 'lb'; el.id = 'lb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = `<div class="lb-bg"></div>
      <div class="lb-bar"><span class="lb-title"></span><span class="lb-count" dir="ltr"></span>
        <button class="icon-btn lb-snd" type="button"></button><button class="icon-btn lb-x" type="button"><i class="ph-bold ph-x"></i></button></div>
      <div class="lb-stage"><span class="ghost g1"></span><span class="ghost g2"></span><img class="lb-img" alt="" />
        <button class="icon-btn lb-nav lb-prev" type="button"><i class="ph-bold ph-caret-left"></i></button><button class="icon-btn lb-nav lb-next" type="button"><i class="ph-bold ph-caret-right"></i></button></div>
      <div class="lb-thumbs"></div>`;
    document.body.appendChild(el); hydrateIcons(el); lb.el = el;
    $('.lb-x', el).onclick = closeLb; $('.lb-bg', el).onclick = closeLb;
    $('.lb-prev', el).onclick = () => go(state.lang === 'ar' ? 1 : -1); $('.lb-next', el).onclick = () => go(state.lang === 'ar' ? -1 : 1);
    $('.lb-snd', el).onclick = () => { sfx.toggle(); paintSnd(); };
    let sx = null; const st = $('.lb-stage', el);
    st.addEventListener('pointerdown', e => { sx = e.clientX; });
    st.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * (state.lang === 'ar' ? -1 : 1)); });
  };
  const paintSnd = () => { const b = $('.lb-snd', lb.el); b.innerHTML = `<i class="ph-bold ph-speaker-${sfx.muted ? 'slash' : 'high'}"></i>`; b.setAttribute('aria-label', T('sound')); hydrateIcons(b); };
  const show = (i, silent) => {
    lb.i = (i + lb.list.length) % lb.list.length; const img = $('.lb-img', lb.el);
    img.classList.remove('in'); void img.offsetWidth; img.src = lb.list[lb.i]; img.alt = `${lb.title} ${lb.i + 1}`; img.classList.add('in');
    $('.lb-count', lb.el).textContent = `${lb.i + 1} / ${lb.list.length}`;
    $$('.lb-thumbs button', lb.el).forEach((b, k) => b.classList.toggle('on', k === lb.i));
    const nx = new Image(); nx.src = lb.list[(lb.i + 1) % lb.list.length];
    if (!silent) sfx.flip();
  };
  const go = d => show(lb.i + d);
  function openLb(c, card) {
    if (!lb.el) buildLb(); lb.list = photosOf(c); lb.title = L(c.ar, c.en); lb.from = card; if (!lb.list.length) return;
    const r = card.getBoundingClientRect(); lb.el.style.setProperty('--ox', (r.left + r.width / 2 - innerWidth / 2) + 'px'); lb.el.style.setProperty('--oy', (r.top + r.height / 2 - innerHeight / 2) + 'px');
    $('.lb-title', lb.el).textContent = lb.title; $('.lb-x', lb.el).setAttribute('aria-label', T('close'));
    $('.lb-prev', lb.el).setAttribute('aria-label', T(state.lang === 'ar' ? 'next' : 'prev')); $('.lb-next', lb.el).setAttribute('aria-label', T(state.lang === 'ar' ? 'prev' : 'next'));
    $('.lb-thumbs', lb.el).innerHTML = lb.list.map((u, k) => `<button type="button" style="--i:${k};--n:${lb.list.length};background-image:url('${esc(u)}')" aria-label="${k + 1}"></button>`).join('');
    $$('.lb-thumbs button', lb.el).forEach((b, k) => { b.onclick = () => show(k); });
    lb.el.classList.remove('closing', 'open'); void lb.el.offsetWidth; lb.el.classList.add('open'); document.body.style.overflow = 'hidden';
    paintSnd(); show(0, true); sfx.open(); $('.lb-x', lb.el).focus({ preventScroll: true });
  }
  function closeLb() { if (!lb.el || !lb.el.classList.contains('open')) return; sfx.close(); lb.el.classList.add('closing'); setTimeout(() => { lb.el.classList.remove('open', 'closing'); document.body.style.overflow = ''; lb.from && lb.from.focus({ preventScroll: true }); }, 380); }
  document.addEventListener('click', e => { const card = e.target.closest('.camp-card.has-gallery'); if (card) openLb(C.campaigns.find(c => c.id === card.dataset.id), card); });
  document.addEventListener('keydown', e => {
    const card = e.target.closest && e.target.closest('.camp-card.has-gallery');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLb(C.campaigns.find(c => c.id === card.dataset.id), card); return; }
    if (!lb.el || !lb.el.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowRight') go(state.lang === 'ar' ? -1 : 1); else if (e.key === 'ArrowLeft') go(state.lang === 'ar' ? 1 : -1);
  });
  /* ───── أعضاء الفريق (من فولدر Team Member) ───── */
  let teamFiles = [];
  const ghNames = async folder => {
    if (!C.github || location.protocol === 'file:') return [];
    const key = 'ef-gh-team', k0 = (() => { try { return JSON.parse(sessionStorage.getItem(key)); } catch (e) { return null; } })();
    if (k0 && Date.now() - k0.t < 300000) return k0.v;
    try {
      const r = await fetch(`https://api.github.com/repos/${C.github}/contents/${encodeURI(folder)}`); if (!r.ok) return [];
      const v = (await r.json()).filter(f => f.type === 'file' && /\.(jpe?g|png|webp)$/i.test(f.name)).map(f => f.name).sort((x, y) => x.localeCompare(y, 'ar', { numeric: true }));
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch (e) {} return v;
    } catch (e) { return []; }
  };
  const memberName = f => f.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim();
  const renderTeam = () => {
    const g = $('#team-grid'); if (!g) return;
    g.innerHTML = teamFiles.length ? teamFiles.map((f, i) => `
      <article class="member reveal" style="--i:${Math.min(i, 8)}">
        <div class="arch"><img src="${esc(encodeURI(C.team.folder + '/' + f))}" alt="${esc(memberName(f))}" loading="lazy" decoding="async"></div>
        <h3>${esc(memberName(f))}</h3><span class="role">${esc(L(C.team.titleAr, C.team.titleEn))}</span>
      </article>`).join('') : `<p class="team-empty reveal">${esc(T('teamSoon'))}</p>`;
    observe($$('#team-grid .reveal'));
  };
  const renderContact = () => {
    const a = $('#contact-fb'); a.href = C.contact.href; $('#contact-handle').textContent = C.contact.handle;
  };
  const renderSocials = () => {
    $('#socials').innerHTML = C.socials.map(s => `<a ${linkProps(s.href)} aria-label="${esc(s.label)}" title="${esc(s.label)}"><i class="ph-fill ${s.icon}"></i></a>`).join('');
  };
  function renderAll() { renderNav(); renderStats(); renderAbout(); renderPeople(); renderTeam(); renderCampaigns(); renderContact(); renderSocials(); wireLinkButtons(); hydrateIcons(); observe($$('.reveal:not(.in)')); }

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
    ['hero', 'about', 'university', 'supervision', 'leadership', 'team', 'campaigns', 'join', 'contact'].forEach(id => { const s = document.getElementById(id); if (s && s.offsetTop <= y) cur = id; });
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
  setLogos(); setBackgrounds(); makeLeaves(); hydrateIcons(); applyTheme(); applyLang(); onScroll(); loadManifest();
})();
