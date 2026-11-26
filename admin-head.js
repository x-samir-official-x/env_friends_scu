/* بيشتغل في الأول: الثيم + منع فتح اللوحة جوه موقع تاني (clickjacking) */
(function () {
  try {
    var th = localStorage.getItem('ef-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', th); document.documentElement.setAttribute('data-lang', 'ar');
  } catch (e) {}
  if (window.top !== window.self) {
    document.documentElement.style.display = 'none';
    try { window.top.location = window.self.location.href; } catch (e) {}
  }
})();
