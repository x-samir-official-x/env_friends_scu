(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (scope = document) => scope.querySelectorAll('i[class*="ph-"]').forEach(el => {
    const fill = el.classList.contains('ph-fill'), name = [...el.classList].find(c => /^ph-/.test(c) && c !== 'ph-fill' && c !== 'ph-bold');
    const body = (window.ICONS || {})[(fill ? 'fill/' : 'bold/') + (name || '').slice(3)]; if (!body) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 256 256'); svg.setAttribute('fill', 'currentColor'); svg.setAttribute('aria-hidden', 'true'); svg.innerHTML = body; el.replaceWith(svg);
  });
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2600); };

  const root = document.documentElement;
  const themeIcon = () => { $('#theme').innerHTML = `<i class="ph-bold ph-${root.dataset.theme === 'dark' ? 'sun' : 'moon'}"></i>`; icon($('#theme')); };
  $('#theme').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('ef-theme', root.dataset.theme); } catch (e) {} themeIcon(); };
  themeIcon(); icon();

  const C = window.CONFIG.supabase;
  const sb = window.supabase.createClient(C.url, C.key, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'implicit' } });
  const BACK = location.href.split('#')[0].split('?')[0];

  const ST = { new: 'جديد', reviewing: 'تحت المراجعة', accepted: 'مقبول', rejected: 'مرفوض' };
  const YEAR = { 1: 'الفرقة الأولى', 2: 'الفرقة الثانية', 3: 'الفرقة الثالثة', 4: 'الفرقة الرابعة', grad: 'خريج' };
  const INT = { planting: 'التشجير', recycling: 'إعادة التدوير', awareness: 'التوعية والندوات', community: 'الزيارات المجتمعية', media: 'التصوير والميديا', design: 'التصميم', content: 'كتابة المحتوى', events: 'تنظيم الفعاليات' };
  const DAY = { sat: 'السبت', sun: 'الأحد', mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس' };
  const fmtDate = d => new Date(d).toLocaleString('ar-EG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

  const show = v => { $$('.view').forEach(x => x.classList.toggle('on', x.id === 'v-' + v)); $('#out').hidden = v === 'login'; };

  /* ---------- الدخول ---------- */
  let mode = 'login';
  const MODES = {
    login: { t: 'دخول الإدارة', s: 'للقادة بس — ادخل بإيميلك وكلمة السر.', b: 'دخول', pass: true, pass2: false, email: true },
    signup: { t: 'أول مرة', s: 'اعمل كلمة سر لإيميلك (لازم يكون متسجل كإدارة). هيوصلك إيميل تأكيد.', b: 'اعمل الحساب', pass: true, pass2: true, email: true },
    reset: { t: 'نسيت كلمة السر', s: 'اكتب إيميلك وهنبعتلك لينك تعمل بيه كلمة سر جديدة.', b: 'ابعت اللينك', pass: false, pass2: false, email: true },
    newpass: { t: 'كلمة سر جديدة', s: 'اكتب كلمة السر الجديدة (8 حروف على الأقل).', b: 'احفظ', pass: true, pass2: true, email: false }
  };
  const setMode = m => {
    mode = m; const c = MODES[m];
    $('#lt').textContent = c.t; $('#ls').textContent = c.s; $('#lb').innerHTML = `<span>${c.b}</span>`;
    $('#f-email').hidden = !c.email; $('#f-pass').hidden = !c.pass; $('#f-pass2').hidden = !c.pass2;
    $('#pw').autocomplete = m === 'login' ? 'current-password' : 'new-password';
    $('#lk').innerHTML = m === 'login' ? '<button type="button" data-m="signup">أول مرة؟ اعمل كلمة سر</button><button type="button" data-m="reset">نسيت كلمة السر</button>' : m === 'newpass' ? '' : '<button type="button" data-m="login">رجوع للدخول</button>';
    msg('');
  };
  const msg = (t, ok) => { const m = $('#lm'); m.textContent = t; m.className = 'msg' + (t ? ' on ' + (ok ? 'ok' : 'err') : ''); };
  $('#lk').addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (b) setMode(b.dataset.m); });
  const ERR = m => /Database error saving new user|signup_not_allowed/i.test(m) ? 'الإيميل ده مش من إيميلات الإدارة، فمينفعش يعمل حساب.' : /Invalid login/i.test(m) ? 'الإيميل أو كلمة السر غلط.' : /not confirmed/i.test(m) ? 'لسه ما أكدتش الإيميل — افتح رسالة التأكيد ودوس على اللينك.' : /already registered/i.test(m) ? 'الإيميل ده عامل حساب قبل كده — ادخل على طول أو اختار «نسيت كلمة السر».' : /rate limit|security purposes/i.test(m) ? 'استنى شوية وجرّب تاني.' : /at least|weak/i.test(m) ? 'كلمة السر ضعيفة — خليها 8 حروف أو أكتر.' : 'حصلت مشكلة: ' + m;

  $('#lf').addEventListener('submit', async e => {
    e.preventDefault();
    const em = $('#em').value.trim().toLowerCase(), pw = $('#pw').value, pw2 = $('#pw2').value, c = MODES[mode];
    if (c.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return msg('اكتب إيميل صحيح.');
    if (c.pass && pw.length < 8) return msg('كلمة السر لازم تبقى 8 حروف على الأقل.');
    if (c.pass2 && pw !== pw2) return msg('كلمتين السر مش زي بعض.');
    const b = $('#lb'); b.disabled = true; b.innerHTML = '<span class="spin"></span>';
    try {
      if (mode === 'login') { const { error } = await sb.auth.signInWithPassword({ email: em, password: pw }); if (error) throw error; msg(''); $('#pw').value = ''; await boot(); }
      else if (mode === 'signup') {
        const { data, error } = await sb.auth.signUp({ email: em, password: pw, options: { emailRedirectTo: BACK } }); if (error) throw error;
        if (!data.session) { setMode('login'); $('#em').value = em; msg('تمام! بعتنالك إيميل تأكيد على ' + em + ' — افتحه ودوس على اللينك، وبعدها ادخل من هنا.', true); }
      } else if (mode === 'reset') {
        const { error } = await sb.auth.resetPasswordForEmail(em, { redirectTo: BACK }); if (error) throw error;
        msg('لو الإيميل ده عنده حساب، هيوصله لينك دلوقتي. افتحه من نفس الجهاز.', true);
      } else if (mode === 'newpass') {
        const { error } = await sb.auth.updateUser({ password: pw }); if (error) throw error;
        toast('اتحفظت كلمة السر الجديدة'); history.replaceState(null, '', BACK); await boot();
      }
    } catch (err) { msg(ERR(err.message || '')); }
    b.disabled = false; if (mode !== 'newpass' || $('#v-login').classList.contains('on')) b.innerHTML = `<span>${MODES[mode].b}</span>`;
  });
  /* ---------- التحقق بخطوتين (TOTP) ---------- */
  let factorId = null;
  const mmsg = (t, ok) => { const m = $('#mm'); m.textContent = t; m.className = 'msg' + (t ? ' on ' + (ok ? 'ok' : 'err') : ''); };
  const startMfa = async () => {
    show('mfa'); mmsg(''); $('#code').value = '';
    const { data: f, error } = await sb.auth.mfa.listFactors();
    if (error) return mmsg('حصلت مشكلة: ' + error.message);
    const ok = (f.totp || []).filter(x => x.status === 'verified');
    if (ok.length) {
      factorId = ok[0].id; $('#enroll').hidden = true;
      $('#mt').textContent = 'كود التحقق'; $('#ms').textContent = 'افتح تطبيق المصادقة على موبايلك واكتب الكود اللي ظاهر لـ «أصدقاء البيئة».';
    } else {
      for (const x of (f.all || []).filter(x => x.status !== 'verified')) await sb.auth.mfa.unenroll({ factorId: x.id });
      const { data: e, error: er } = await sb.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'EF-' + Date.now().toString(36), issuer: 'أصدقاء البيئة' });
      if (er) return mmsg('مقدرناش نجهّز التحقق بخطوتين: ' + er.message);
      factorId = e.id; $('#enroll').hidden = false;
      const q = e.totp.qr_code || ''; $('#qr').src = q.startsWith('data:') ? q : 'data:image/svg+xml;utf8,' + encodeURIComponent(q);
      $('#sec').textContent = e.totp.secret; $('#otpl').href = e.totp.uri;
      $('#mt').textContent = 'فعّل التحقق بخطوتين'; $('#ms').textContent = 'مرة واحدة بس: عشان صور البطاقات محمية، الدخول محتاج كود من موبايلك كمان.';
    }
    setTimeout(() => $('#code').focus(), 100);
  };
  $('#code').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); if (e.target.value.length === 6) $('#mf').requestSubmit(); });
  $('#mf').addEventListener('submit', async e => {
    e.preventDefault(); const code = $('#code').value;
    if (!/^\d{6}$/.test(code)) return mmsg('اكتب الـ6 أرقام.');
    const b = $('#mb'); b.disabled = true; b.innerHTML = '<span class="spin"></span>';
    const { error } = await sb.auth.mfa.challengeAndVerify({ factorId, code });
    b.disabled = false; b.innerHTML = '<span>تأكيد</span>';
    if (error) { $('#code').value = ''; return mmsg(/invalid|expired/i.test(error.message) ? 'الكود غلط أو خلص وقته — اكتب الكود الجديد اللي في التطبيق.' : /rate|too many/i.test(error.message) ? 'محاولات كتير — استنى دقيقة.' : 'حصلت مشكلة: ' + error.message); }
    toast('تمام، اتأكدنا إنه انت'); boot();
  });

  $('#out').onclick = async () => { await sb.auth.signOut(); rows = []; closeDr(); setMode('login'); show('login'); };

  $('#out2').onclick = () => $('#out').click();

  /* ---------- البيانات ---------- */
  let rows = [], filter = 'all', me = '', thumbs = {};
  const load = async () => {
    $('#list').innerHTML = '<div class="empty">جارٍ التحميل…</div>';
    const { data, error } = await sb.from('applications').select('*').order('created_at', { ascending: false });
    if (error) { $('#list').innerHTML = `<div class="empty">مقدرناش نجيب الطلبات: ${esc(error.message)}</div>`; return; }
    rows = data || [];
    const paths = rows.map(r => r.photo_path).filter(p => p && !thumbs[p]);
    if (paths.length) { const { data: s } = await sb.storage.from('applications').createSignedUrls(paths, 3600); (s || []).forEach(x => { if (x.signedUrl) thumbs[x.path] = x.signedUrl; }); }
    render();
  };
  const initials = n => (n || '؟').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join(' ');
  const av = r => r.photo_path && thumbs[r.photo_path] ? `<span class="av" style="background-image:url('${thumbs[r.photo_path]}')"></span>` : `<span class="av">${esc(initials(r.full_name))}</span>`;
  const match = r => { const q = $('#q').value.trim().toLowerCase(); return !q || [r.full_name, r.phone, r.email, r.faculty, r.university, r.department, r.ref].some(x => (x || '').toLowerCase().includes(q)); };
  const render = () => {
    const cnt = { all: rows.length, new: 0, reviewing: 0, accepted: 0, rejected: 0 }; rows.forEach(r => cnt[r.status]++);
    $('#stats').innerHTML = [['all', 'كل الطلبات'], ...Object.entries(ST)].map(([k, l]) => `<button class="st" type="button" data-s="${k}" aria-pressed="${filter === k}"><b>${cnt[k] || 0}</b><span>${l}</span></button>`).join('');
    const list = rows.filter(r => (filter === 'all' || r.status === filter) && match(r));
    $('#list').innerHTML = list.length ? list.map(r => `<button class="app" type="button" data-id="${r.id}">${av(r)}<span class="t"><b>${esc(r.full_name)}</b><small>${esc(r.faculty || '')} · ${esc(YEAR[r.year] || '')}</small><small dir="ltr" style="text-align:end">${esc(r.ref)} · ${fmtDate(r.created_at)}</small><span class="badge b-${r.status}">${ST[r.status]}</span></span></button>`).join('')
      : `<div class="empty" style="grid-column:1/-1"><i class="ph-bold ph-tray"></i>${rows.length ? 'مفيش طلبات بالشكل ده' : 'لسه مفيش طلبات — أول ما حد يقدّم هيظهر هنا'}</div>`;
    icon($('#list'));
  };
  $('#stats').addEventListener('click', e => { const b = e.target.closest('.st'); if (b) { filter = b.dataset.s; render(); } });
  $('#q').addEventListener('input', render);
  $('#reload').onclick = () => load();
  $('#list').addEventListener('click', e => { const b = e.target.closest('.app'); if (b) openDr(+b.dataset.id); });

  /* ---------- تفاصيل الطلب ---------- */
  let cur = null;
  const closeDr = () => { $('#dr').classList.remove('on'); $('#ov').classList.remove('on'); $('#dr').setAttribute('aria-hidden', 'true'); cur = null; };
  $('#ov').onclick = closeDr; document.addEventListener('keydown', e => { if (e.key === 'Escape') { if ($('#lbx').classList.contains('on')) $('#lbx').classList.remove('on'); else closeDr(); } });
  $('#lbx').onclick = () => $('#lbx').classList.remove('on');
  const kv = pairs => `<dl class="kv">${pairs.filter(([, v]) => v !== '' && v != null).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const wa = p => 'https://wa.me/2' + p;

  const openDr = async id => {
    const r = rows.find(x => x.id === id); if (!r) return; cur = r;
    const files = [['photo_path', 'الصورة الشخصية'], ['id_front_path', 'البطاقة — وش'], ['id_back_path', 'البطاقة — ضهر']];
    const have = files.map(([k]) => r[k]).filter(Boolean); let urls = {};
    if (have.length) { const { data } = await sb.storage.from('applications').createSignedUrls(have, 900); (data || []).forEach(x => { if (x.signedUrl) urls[x.path] = x.signedUrl; }); }
    const fb = r.facebook ? (/^https?:\/\//.test(r.facebook) ? r.facebook : 'https://' + r.facebook) : '';
    $('#dr').innerHTML = `
      <div class="dr-h">${av(r)}<h2>${esc(r.full_name)}<small>${esc(r.ref)} · ${fmtDate(r.created_at)}</small></h2><button class="ib" type="button" id="x" aria-label="إغلاق"><i class="ph-bold ph-x"></i></button></div>
      <div class="dr-b">
        <div class="sec"><h3><i class="ph-bold ph-seal-check"></i>حالة الطلب</h3>
          <div class="acts">${Object.entries(ST).map(([k, l]) => `<button class="sb" type="button" data-s="${k}" aria-pressed="${r.status === k}">${l}</button>`).join('')}</div>
          <div class="confirm" id="cf">الرفض هيمسح الصورة الشخصية وصور البطاقة نهائيًا (عشان خصوصية المتقدم)، وبيانات الطلب نفسها هتفضل. متأكد؟
            <div class="row"><button class="btn red" type="button" id="cfy">أيوه، ارفض وامسح الصور</button><button class="ib" type="button" id="cfn">لأ</button></div></div>
          ${r.reviewed_by ? `<p style="margin-top:.6rem;font-size:.78rem;color:var(--muted);font-weight:700">آخر تعديل: ${esc(r.reviewed_by)} · ${fmtDate(r.reviewed_at)}</p>` : ''}
          <div class="quick">
            <a class="ib" href="${wa(r.phone)}" target="_blank" rel="noopener"><i class="ph-bold ph-whatsapp-logo"></i>واتساب</a>
            <a class="ib" href="tel:${esc(r.phone)}"><i class="ph-bold ph-phone"></i>اتصال</a>
            <a class="ib" href="mailto:${esc(r.email)}"><i class="ph-bold ph-envelope-simple"></i>إيميل</a>
            ${fb ? `<a class="ib" href="${esc(fb)}" target="_blank" rel="noopener"><i class="ph-bold ph-facebook-logo"></i>فيسبوك</a>` : ''}
            ${r.status === 'accepted' && r.photo_path ? `<button class="ib" type="button" id="dl"><i class="ph-bold ph-download-simple"></i>صورة لصفحة الفريق</button>` : ''}
          </div>
        </div>
        <div class="sec"><h3><i class="ph-bold ph-identification-card"></i>الصور</h3>
          <div class="pics">${files.map(([k, l]) => r[k] && urls[r[k]] ? `<div class="pic" data-u="${urls[r[k]]}" style="background-image:url('${urls[r[k]]}')"><span>${l}</span></div>` : `<div class="pic gone">${l}<br>${r.status === 'rejected' ? 'اتمسحت' : 'مش موجودة'}</div>`).join('')}</div>
        </div>
        <div class="sec"><h3><i class="ph-bold ph-user"></i>البيانات</h3>${kv([
          ['الموبايل', `<span dir="ltr">${esc(r.phone)}</span>`], ['الإيميل', `<span dir="ltr">${esc(r.email)}</span>`],
          ['الجامعة', esc(r.university)], ['الكلية', esc(r.faculty)], ['الفرقة', esc(YEAR[r.year] || r.year)], ['الشعبة / القسم', esc(r.department)],
          ['مقاس التيشيرت', esc(r.tshirt_size || '')]])}</div>
        <div class="sec"><h3><i class="ph-bold ph-leaf"></i>الاهتمامات والوقت</h3>${kv([
          ['الاهتمامات', `<span class="chips">${(r.interests || []).map(x => `<span>${esc(INT[x] || x)}</span>`).join('')}</span>`],
          ['ساعات في الأسبوع', `<span dir="ltr">${esc(r.hours_per_week)}</span>`], ['الأيام المناسبة', esc((r.days || []).map(d => DAY[d] || d).join('، '))],
          ['المهارات', esc(r.skills || '')], ['تطوع قبل كده', esc(r.prior_volunteering || '')]])}</div>
        <div class="sec"><h3><i class="ph-bold ph-lightbulb"></i>الدافع والأفكار</h3>${kv([
          ['ليه عايز ينضم', esc(r.motivation)], ['فكرة مبادرة', esc(r.idea || '')], ['عرف عننا منين', esc(r.heard_from || '')],
          ['موافق على التصوير', r.agree_photos ? 'أيوه' : 'لأ']])}</div>
        <div class="sec"><h3><i class="ph-bold ph-note-pencil"></i>ملاحظات الإدارة</h3>
          <textarea class="in" id="nt" maxlength="1000" placeholder="مثلاً: اتكلمنا معاه، ميعاد المقابلة…">${esc(r.notes || '')}</textarea>
          <button class="btn" type="button" id="ns" style="margin-top:.6rem;height:42px">احفظ الملاحظة</button></div>
      </div>`;
    icon($('#dr'));
    $('#dr').classList.add('on'); $('#ov').classList.add('on'); $('#dr').setAttribute('aria-hidden', 'false'); $('#dr').scrollTop = 0;
    $('#x').onclick = closeDr;
    $$('#dr .pic[data-u]').forEach(p => p.onclick = () => { $('#lbx img').src = p.dataset.u; $('#lbx').classList.add('on'); });
    $$('#dr .sb').forEach(b => b.onclick = () => b.dataset.s === 'rejected' && r.status !== 'rejected' ? $('#cf').classList.add('on') : setStatus(r, b.dataset.s));
    $('#cfn').onclick = () => $('#cf').classList.remove('on');
    $('#cfy').onclick = () => setStatus(r, 'rejected');
    $('#ns').onclick = () => save(r, { notes: $('#nt').value.trim() || null }, 'اتحفظت الملاحظة');
    if ($('#dl')) $('#dl').onclick = async () => {
      const { data, error } = await sb.storage.from('applications').download(r.photo_path); if (error) return toast('مقدرناش ننزل الصورة');
      const a = document.createElement('a'); a.href = URL.createObjectURL(data); a.download = r.full_name.trim().split(/\s+/).slice(0, 2).join(' ') + '.jpg'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast('نزّلناها باسمه — ارفعها في فولدر Team Member');
    };
  };

  const save = async (r, patch, okMsg) => {
    patch.reviewed_by = me; patch.reviewed_at = new Date().toISOString();
    const { data, error } = await sb.from('applications').update(patch).eq('id', r.id).select().single();
    if (error) { toast('ما اتحفظش: ' + error.message); return false; }
    Object.assign(r, data); render(); toast(okMsg); return true;
  };
  const setStatus = async (r, s) => {
    if (s === r.status) return;
    const patch = { status: s };
    if (s === 'rejected') {
      const paths = [r.photo_path, r.id_front_path, r.id_back_path].filter(Boolean);
      if (paths.length) { const { error } = await sb.storage.from('applications').remove(paths); if (error) return toast('مقدرناش نمسح الصور: ' + error.message); }
      Object.assign(patch, { photo_path: null, id_front_path: null, id_back_path: null });
    }
    if (await save(r, patch, 'الحالة دلوقتي: ' + ST[s])) openDr(r.id);
  };

  /* ---------- تصدير ---------- */
  $('#csv').onclick = () => {
    const cols = [['ref', 'رقم الطلب'], ['created_at', 'التاريخ'], ['status', 'الحالة'], ['full_name', 'الاسم'], ['phone', 'الموبايل'], ['email', 'الإيميل'], ['university', 'الجامعة'], ['faculty', 'الكلية'], ['year', 'الفرقة'], ['department', 'القسم'], ['interests', 'الاهتمامات'], ['hours_per_week', 'ساعات/أسبوع'], ['days', 'الأيام'], ['tshirt_size', 'التيشيرت'], ['facebook', 'فيسبوك'], ['skills', 'المهارات'], ['prior_volunteering', 'تطوع سابق'], ['motivation', 'الدافع'], ['idea', 'فكرة'], ['heard_from', 'عرف منين'], ['notes', 'ملاحظات']];
    const val = (r, k) => k === 'status' ? ST[r[k]] : k === 'year' ? (YEAR[r[k]] || r[k]) : k === 'interests' ? (r[k] || []).map(x => INT[x] || x).join('، ') : k === 'days' ? (r[k] || []).map(x => DAY[x] || x).join('، ') : k === 'created_at' ? new Date(r[k]).toLocaleString('en-GB') : (r[k] ?? '');
    const q = v => { v = String(v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
    const list = rows.filter(r => (filter === 'all' || r.status === filter) && match(r));
    const csv = '﻿' + [cols.map(c => q(c[1])).join(','), ...list.map(r => cols.map(([k]) => q(val(r, k))).join(','))].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = `طلبات-التطوع-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  };

  /* ---------- تثبيت اللوحة كأيقونة على الموبايل ---------- */
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let deferred = null;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; if (!standalone) $('#inst').hidden = false; });
  if (ios && !standalone) $('#inst').hidden = false;
  $('#inst').onclick = async () => {
    if (deferred) { deferred.prompt(); const r = await deferred.userChoice; if (r.outcome === 'accepted') $('#inst').hidden = true; deferred = null; return; }
    if (ios) { const t = $('#toast'); t.textContent = 'من Safari: دوس زرار المشاركة ⬆️ وبعدين «إضافة إلى الشاشة الرئيسية»'; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 7000); return; }
    toast('من قايمة المتصفح ⋮ اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»');
  };
  addEventListener('appinstalled', () => { $('#inst').hidden = true; toast('اتثبتت — هتلاقيها على الشاشة الرئيسية'); });

  /* ---------- التشغيل ---------- */
  const boot = async () => {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { show('login'); return; }
    me = session.user.email;
    const { data: lvl } = await sb.auth.mfa.getAuthenticatorAssuranceLevel();
    if (!lvl || lvl.currentLevel !== 'aal2') { await startMfa(); return; }
    const { data: ok } = await sb.rpc('is_admin');
    if (!ok) { $('#dn').textContent = `انت داخل بـ ${me}، والإيميل ده مش متسجل في الإدارة.`; show('denied'); return; }
    $('#who').textContent = 'داخل بـ ' + me; show('dash'); load();
  };
  let recovering = /type=recovery/.test(location.hash);
  sb.auth.onAuthStateChange((ev) => { if (ev === 'PASSWORD_RECOVERY') { recovering = true; setMode('newpass'); show('login'); } });
  setMode('login');
  if (/error_description=/.test(location.hash)) { const p = new URLSearchParams(location.hash.slice(1)); show('login'); msg(/expired/i.test(p.get('error_description') || '') ? 'اللينك ده خلص — اطلب لينك جديد.' : 'اللينك مش شغال: ' + p.get('error_description')); history.replaceState(null, '', BACK); }
  else setTimeout(() => { if (recovering) { setMode('newpass'); show('login'); } else { if (/access_token=/.test(location.hash)) history.replaceState(null, '', BACK); boot(); } }, 150);
})();
