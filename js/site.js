// WellRead website: phone menu (hamburger). No network calls, no storage.
'use strict';
(function () {
  const b = document.getElementById('s-burger'), nav = document.getElementById('s-nav');
  if (!b || !nav) return;
  const set = (open) => { document.body.classList.toggle('s-menu-open', open); b.setAttribute('aria-expanded', String(open)); b.setAttribute('aria-label', open ? 'Close menu' : 'Menu'); };
  b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { set(false); b.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 900 && b.getAttribute('aria-expanded') === 'true') set(false); });
})();
