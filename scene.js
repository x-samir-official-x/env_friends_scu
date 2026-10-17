/* مشهد 3D للهيرو (three.js): كرة أرضية سلكية + حلقات + جسيمات، بتتحرك مع الماوس والسكرول */
(() => {
  const cv = document.getElementById('globe');
  if (!cv || !window.THREE || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const THREE = window.THREE, hero = document.getElementById('hero');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.z = 7;
  const g = new THREE.Group(); scene.add(g);
  const LEAF = 0x89C54A, EM = 0x1A6929;
  g.add(new THREE.Mesh(new THREE.SphereGeometry(1.9, 48, 48), new THREE.MeshBasicMaterial({ color: 0x052549, transparent: true, opacity: .88 })));
  g.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.95, 3)), new THREE.LineBasicMaterial({ color: LEAF, transparent: true, opacity: .45 })));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(2.12, 48, 48), new THREE.MeshBasicMaterial({ color: LEAF, transparent: true, opacity: .07, side: THREE.BackSide })));
  const ring = (r, tilt, col, op) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, .012, 8, 160), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); m.rotation.x = tilt; g.add(m); return m; };
  const r1 = ring(2.6, 1.2, LEAF, .7), r2 = ring(3.1, 1.9, EM, .9), r3 = ring(3.6, .5, 0xFCFCF9, .25);
  const dots = []; for (const [r, n, col] of [[2.6, 1, LEAF], [3.1, 1, 0xFCFCF9]]) { const d = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 12), new THREE.MeshBasicMaterial({ color: col })); dots.push({ d, r }); g.add(d); }
  const N = 260, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const r = 3 + Math.random() * 3.5, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)], i * 3); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: LEAF, size: .045, transparent: true, opacity: .8 })); scene.add(pts);
  const size = () => { const w = hero.clientWidth, h = hero.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  addEventListener('resize', size); size();
  let mx = 0, my = 0, visible = true;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
  const clock = new THREE.Clock(); let px = 0;
  (function loop() {
    requestAnimationFrame(loop); if (!visible) return;
    const wide = hero.clientWidth > 900, tx = wide ? (document.documentElement.dir === 'rtl' ? -3.3 : 3.3) : 0; px += (tx - px) * .08; scene.position.x = px;
    const t = clock.getElapsedTime(), s = Math.min(scrollY / innerHeight, 1);
    g.rotation.y = t * .18 + mx * .8 + s * 1.5; g.rotation.x = my * .5 + s * .4; g.position.y = Math.sin(t) * .08 - s * .8; g.scale.setScalar(1 - s * .25);
    r1.rotation.z = t * .3; r2.rotation.z = -t * .22; r3.rotation.z = t * .1; pts.rotation.y = -t * .03 + mx * .2;
    dots[0].d.position.set(Math.cos(t * .9) * 2.6, 0, Math.sin(t * .9) * 2.6).applyEuler(new THREE.Euler(1.2, 0, 0));
    dots[1].d.position.set(Math.cos(-t * .6) * 3.1, 0, Math.sin(-t * .6) * 3.1).applyEuler(new THREE.Euler(1.9, 0, 0));
    renderer.render(scene, cam);
  })();
})();

/* ميل 3D للكروت مع الماوس */
(() => {
  if (matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  const SEL = '.vip-card,.camp-card,.stat-card,.about-card,.link-card';
  const mark = () => document.querySelectorAll(SEL).forEach(el => el.classList.add('tilt'));
  new MutationObserver(mark).observe(document.body, { childList: true, subtree: true }); mark();
  document.addEventListener('pointermove', e => {
    const el = e.target.closest && e.target.closest(SEL);
    document.querySelectorAll('.tilt.hovering').forEach(x => { if (x !== el) { x.classList.remove('hovering'); x.style.transform = ''; } });
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.classList.add('hovering'); el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
    el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 12}deg) rotateY(${(x - .5) * 14}deg) translateZ(14px)`;
  });
  document.addEventListener('pointerleave', () => document.querySelectorAll('.tilt').forEach(x => { x.classList.remove('hovering'); x.style.transform = ''; }), true);
})();
