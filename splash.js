/* سبلاش سكرين: نفس الكرة الأرضية 3D بألوان فاتحة، بيظهر مع كل فتح أو ريفريش لمدة 5 ثواني (أو أكتر لو الصفحة لسه بتحمّل، لحد 8 ثواني) */
(() => {
  const root = document.documentElement, sp = document.getElementById('splash');
  if (!sp || root.classList.contains('no-splash')) { sp && sp.remove(); return; }
  const bar = document.getElementById('sp-bar'), t0 = performance.now(), MIN = 5000, MAX = 8000;  /* MIN/MAX من بداية فتح الصفحة */
  let raf = 0, renderer = null, zoom = 0, done = false;

  if (window.THREE) {
    try {
      const THREE = window.THREE, cv = document.getElementById('splash-globe');
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.z = 8.2;
      const g = new THREE.Group(); scene.add(g);
      const NAVY = 0x052549, EM = 0x1A6929, LEAF = 0x89C54A;
      g.add(new THREE.Mesh(new THREE.SphereGeometry(1.9, 48, 48), new THREE.MeshBasicMaterial({ color: 0xF3F8EC, transparent: true, opacity: .92 })));
      g.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.95, 3)), new THREE.LineBasicMaterial({ color: EM, transparent: true, opacity: .55 })));
      g.add(new THREE.Mesh(new THREE.SphereGeometry(2.14, 48, 48), new THREE.MeshBasicMaterial({ color: LEAF, transparent: true, opacity: .12, side: THREE.BackSide })));
      const ring = (r, tilt, col, op) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, .014, 8, 180), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); m.rotation.x = tilt; g.add(m); return m; };
      const r1 = ring(2.6, 1.2, LEAF, .95), r2 = ring(3.1, 1.9, EM, .8), r3 = ring(3.6, .5, NAVY, .25);
      const dot = (col, s) => { const d = new THREE.Mesh(new THREE.SphereGeometry(s, 14, 14), new THREE.MeshBasicMaterial({ color: col })); g.add(d); return d; };
      const d1 = dot(LEAF, .085), d2 = dot(NAVY, .07);
      const N = 220, pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { const r = 3 + Math.random() * 3.5, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)], i * 3); }
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: EM, size: .04, transparent: true, opacity: .55 })); scene.add(pts);
      let gy = 0;
      const size = () => {
        const w = innerWidth, h = innerHeight, a = w / h; renderer.setSize(w, h, false); cam.aspect = a;
        const z = Math.max(4.3 / (.52 * .828), 4.3 / (.62 * .828 * a)); cam.position.z = z; cam.updateProjectionMatrix();
        gy = .10 * .828 * z;                                   /* مركز الكرة عند 40% من ارتفاع الشاشة */
        sp.style.setProperty('--gb', (40 + 2.14 / (.828 * z) * 100) + '%');  /* أسفل الكرة → مكان النص */
      };
      addEventListener('resize', size); size();
      const e1 = new THREE.Euler(1.2, 0, 0), e2 = new THREE.Euler(1.9, 0, 0);
      (function loop(now) {
        raf = requestAnimationFrame(loop);
        const t = (now - t0) / 1000, intro = Math.min(1, t / 1.1), ease = 1 - Math.pow(1 - intro, 3);
        g.scale.setScalar((.55 + .45 * ease) * (1 + zoom * 1.6)); g.rotation.y = t * .45; g.rotation.x = .18 + Math.sin(t * .6) * .06;
        g.position.y = gy + Math.sin(t * 1.4) * .05;
        r1.rotation.z = t * .5; r2.rotation.z = -t * .35; r3.rotation.z = t * .15; pts.rotation.y = -t * .05;
        d1.position.set(Math.cos(t * 1.3) * 2.6, 0, Math.sin(t * 1.3) * 2.6).applyEuler(e1);
        d2.position.set(Math.cos(-t * .9) * 3.1, 0, Math.sin(-t * .9) * 3.1).applyEuler(e2);
        renderer.render(scene, cam);
      })(t0);
      sp.classList.add('sp-3d');
    } catch (e) { renderer = null; }
  }

  let shown = 0;
  const tick = () => { if (done) return; const p = Math.min(.9, performance.now() / MIN * .9); if (p > shown) { shown = p; bar.style.width = (p * 100) + '%'; } setTimeout(tick, 120); };
  tick();
  const finish = () => {
    if (done) return; done = true; bar.style.width = '100%';
    const z0 = performance.now(); (function zl(n) { zoom = Math.min(1, (n - z0) / 700); if (zoom < 1) requestAnimationFrame(zl); })(z0);
    setTimeout(() => { sp.classList.add('sp-out'); root.classList.add('no-splash'); }, 180);
    setTimeout(() => { cancelAnimationFrame(raf); try { renderer && renderer.dispose(); } catch (e) {} sp.remove(); }, 1000);
  };
  const ready = () => setTimeout(finish, Math.max(0, MIN - performance.now()));
  if (document.readyState === 'complete') ready(); else addEventListener('load', ready);
  setTimeout(finish, Math.max(0, MAX - performance.now()));
  sp.addEventListener('click', finish);
})();
