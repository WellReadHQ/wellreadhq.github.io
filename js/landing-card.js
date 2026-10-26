// WellRead website: the "Go to your company's WellRead" box. The address is only kept in this browser and is never sent anywhere.
'use strict';
(function (root) {
  const KEY = 'wr_company_url';
  const BAD = "That doesn't look like a web address. Try something like wellread.yourcompany.com.";
  function normalise(raw) {
    let s = String(raw == null ? '' : raw).trim();
    if (!s) return { error: "Type your company's WellRead address." };
    if (/\s/.test(s) || s.length > 300) return { error: BAD };
    if (/^https?:\/\//i.test(s)) s = 'https://' + s.replace(/^https?:\/\//i, '');
    else if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^[^:/?#]+:\d{1,5}(?:[/?#]|$)/.test(s)) return { error: BAD }; // javascript:, ftp:, mailto: ...
    else s = 'https://' + s.replace(/^\/+/, '');
    let u;
    try { u = new URL(s); } catch (_) { return { error: BAD }; }
    if (u.protocol !== 'https:' || u.username || u.password) return { error: BAD };
    const h = u.hostname;
    const ip6 = /^\[[0-9a-f:.]+\]$/i.test(h);
    if (!ip6 && (!/^[a-z0-9.-]+$/i.test(h) || /^[.-]|[.-]$|\.\./.test(h))) return { error: BAD };
    return { url: u.origin + u.pathname };
  }
  const api = { normalise, KEY };
  if (typeof module === 'object' && module.exports) { module.exports = api; return; }
  root.WRLanding = api;

  const $ = (id) => document.getElementById(id);
  const link = $('lc-co'), form = $('lc-addr'), input = $('lc-url'), err = $('lc-err');
  const recall = () => { try { return localStorage.getItem(KEY) || ''; } catch (_) { return ''; } };
  const remember = (u) => { try { localStorage.setItem(KEY, u); } catch (_) { /* private mode: just go */ } };
  if (form && input) {
    if (link) link.addEventListener('click', (e) => {
      e.preventDefault();
      const open = form.hidden;
      form.hidden = !open; link.setAttribute('aria-expanded', String(open));
      if (open) { if (!input.value) input.value = recall(); input.focus(); }
    });
    if (!link && !form.hidden && !input.value) input.value = recall();
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // never submitted to this server
      const r = normalise(input.value);
      if (r.error) { err.textContent = r.error; input.setAttribute('aria-invalid', 'true'); return; }
      err.textContent = ''; input.removeAttribute('aria-invalid'); input.value = r.url;
      remember(r.url);
      location.assign(r.url);
    });
    input.addEventListener('input', () => { if (err.textContent) { err.textContent = ''; input.removeAttribute('aria-invalid'); } });
  }
  if (root.API) {
    root.API.get('/api/auth/me').then((m) => { if (m && m.guest) { const b = $('open-sim'); if (b) b.innerHTML = 'Back to the demo <span aria-hidden="true">→</span>'; } else location.href = '/app'; }).catch(() => {});
  }
})(typeof window !== 'undefined' ? window : globalThis);
