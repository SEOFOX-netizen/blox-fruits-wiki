// Onglet « Shop » : stock du Blox Fruit Dealer (normal + Mirage), rafraîchi chaque minute.
// Source : API communautaire non officielle. Pour changer de source, modifie seulement API_URL.
(function () {
  const API_URL = 'https://blox-fruits-api.onrender.com/api/bloxfruits/stock';
  const REFRESH_MS = 60000;
  const TIMEOUT_MS = 30000; // l'hébergement gratuit peut mettre du temps à se réveiller
  const CACHE_KEY = 'bfwiki_shop_cache_v1';

  // Anciens noms -> noms utilisés dans ton catalogue
  const ALIAS = { leopard: 'Tiger', rumble: 'Lightning', chop: 'Blade', falcon: 'Eagle', revive: 'Ghost', soul: 'Spirit' };

  // ---------- Styles ----------
  const css = document.createElement('style');
  css.textContent = `
  #shop .shop-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:14px 0}
  #shop .shop-status{color:var(--muted);font-size:14px}
  #shop .shop-status b{color:var(--text)}
  #shop .dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;background:var(--muted)}
  #shop .dot.ok{background:var(--green);box-shadow:0 0 8px var(--green)}
  #shop .dot.old{background:var(--gold)}
  #shop .dot.err{background:#ff7b7b}
  #shop .shop-block{margin-top:22px}
  #shop .shop-block h2{margin:0 0 4px}
  #shop .shop-empty{padding:16px;border:1px dashed var(--line);border-radius:12px;color:var(--muted)}
  #shop details{margin-top:14px;color:var(--muted)}
  #shop pre{white-space:pre-wrap;word-break:break-word;max-height:240px;overflow:auto;background:#050c18;border:1px solid var(--line);border-radius:10px;padding:10px;font-size:12px}
  `;
  document.head.appendChild(css);

  // ---------- Onglet + vue ----------
  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  if (!nav || !main) return;

  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.view = 'shop';
  tab.textContent = '🛒 Shop';
  tab.addEventListener('click', () => { showView('shop'); refresh(); });
  nav.insertBefore(tab, nav.children[2] || null);

  const sec = document.createElement('section');
  sec.className = 'view';
  sec.id = 'shop';
  sec.innerHTML = `
    <div class="hero"><div class="eyebrow">STOCK EN DIRECT</div>
      <h1>Shop du <span>Blox Fruit Dealer</span></h1>
      <p>Fruits actuellement en vente chez le Dealer normal et chez le Dealer Mirage. Le stock se renouvelle environ toutes les 4 h (normal) et toutes les 2 h (Mirage) ; la page se met à jour chaque minute.</p>
    </div>
    <div class="shop-bar">
      <button class="btn" id="shopRefresh">↻ Actualiser</button>
      <span class="shop-status" id="shopStatus"><span class="dot"></span>Chargement…</span>
    </div>
    <div class="shop-block"><h2>🏪 Dealer normal</h2><p class="muted">Achat en Beli ou en Robux.</p><div class="grid" id="shopNormal"></div></div>
    <div class="shop-block"><h2>🌫️ Dealer Mirage</h2><p class="muted">Visible seulement pendant l'événement Mirage Island.</p><div class="grid" id="shopMirage"></div></div>
    <div id="shopDebug"></div>
    <div class="notice">Données fournies par une API communautaire non officielle : elles peuvent avoir du retard ou être indisponibles. Vérifie toujours le stock en jeu avant d'acheter.</div>`;
  main.appendChild(sec);
  document.getElementById('shopRefresh').addEventListener('click', () => refresh(true));

  // ---------- Lecture souple de la réponse ----------
  function tryParse(v) {
    for (let i = 0; i < 3 && typeof v === 'string'; i++) {
      try { v = JSON.parse(v); } catch (e) { return v; }
    }
    return v;
  }
  function toNames(v) {
    if (Array.isArray(v)) {
      return v.map(x => typeof x === 'string' ? x : (x && (x.name || x.fruit || x.title || x.id))).filter(Boolean);
    }
    if (v && typeof v === 'object') return Object.keys(v);
    return null;
  }
  function extract(data) {
    data = tryParse(data);
    if (Array.isArray(data)) return { normal: toNames(data), mirage: null };
    if (!data || typeof data !== 'object') return null;
    let normal = null, mirage = null;
    (function walk(o, depth) {
      if (!o || typeof o !== 'object' || Array.isArray(o) || depth > 3) return;
      for (const k of Object.keys(o)) {
        const lk = k.toLowerCase(), v = o[k];
        if (lk.includes('mirage')) { if (!mirage) mirage = toNames(v); }
        else if (/normal|dealer|current|regular/.test(lk)) { if (!normal) normal = toNames(v); }
        else if (/^(stock|fruits|data|result|results)$/.test(lk)) {
          if (Array.isArray(v) && !normal) normal = toNames(v);
          else walk(v, depth + 1);
        }
      }
    })(data, 0);
    if (!normal && !mirage) return null;
    return { normal, mirage };
  }

  // ---------- Affichage ----------
  function findFruit(name) {
    let n = String(name).replace(/\s*fruit$/i, '').trim();
    const al = ALIAS[n.toLowerCase()];
    if (al) n = al;
    return fruits.find(f => f.name.toLowerCase() === n.toLowerCase());
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function renderList(el, names) {
    const box = document.getElementById(el);
    if (!names) { box.innerHTML = '<div class="shop-empty">Aucune donnée pour cette catégorie.</div>'; return; }
    if (!names.length) { box.innerHTML = '<div class="shop-empty">Stock vide pour le moment.</div>'; return; }
    box.innerHTML = names.map(n => {
      const f = findFruit(n);
      return f ? card(f) : `<div class="box fruit"><span class="emoji">❔</span><strong>${esc(n)}</strong><small>Fruit non listé dans le catalogue</small></div>`;
    }).join('');
  }
  function setStatus(kind, html) {
    document.getElementById('shopStatus').innerHTML = `<span class="dot ${kind}"></span>${html}`;
  }
  function timeStr(ts) { return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }

  function showDebug(raw) {
    const d = document.getElementById('shopDebug');
    let txt;
    try { txt = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2); } catch (e) { txt = String(raw); }
    d.innerHTML = '<details><summary>Réponse brute de l\'API (pour dépannage)</summary><pre>' + esc((txt || '').slice(0, 4000)) + '</pre></details>';
  }

  function loadCache() { try { return JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (e) { return null; } }
  function saveCache(obj) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(obj)); } catch (e) {} }

  function showCached(reason) {
    const c = loadCache();
    if (c && c.stock) {
      renderList('shopNormal', c.stock.normal);
      renderList('shopMirage', c.stock.mirage);
      setStatus('old', `<b>Ancien stock</b> (dernière mise à jour réussie à ${timeStr(c.time)}). ${reason}`);
    } else {
      renderList('shopNormal', null);
      renderList('shopMirage', null);
      setStatus('err', reason);
    }
  }

  // ---------- Récupération ----------
  let loading = false;
  async function refresh(manual) {
    if (loading) return;
    loading = true;
    const hadData = !!document.querySelector('#shopNormal .fruit');
    if (!hadData) setStatus('', 'Chargement… (le serveur gratuit peut mettre jusqu\'à 30 s à se réveiller)');
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(API_URL, { signal: ctrl.signal, cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
      const stock = extract(text);
      if (!stock) {
        showCached('Format de réponse non reconnu.');
        showDebug(text);
        return;
      }
      renderList('shopNormal', stock.normal);
      renderList('shopMirage', stock.mirage);
      const now = Date.now();
      saveCache({ time: now, stock });
      setStatus('ok', `<b>En direct</b> · mis à jour à ${timeStr(now)}`);
      document.getElementById('shopDebug').innerHTML = '';
    } catch (e) {
      showCached(e.name === 'AbortError' ? 'Le serveur n\'a pas répondu à temps.' : 'Impossible de joindre le serveur de stock.');
    } finally {
      clearTimeout(to);
      loading = false;
    }
  }

  // Actualisation chaque minute, seulement si l'onglet Shop est ouvert et la page visible
  setInterval(() => {
    if (document.hidden) return;
    if (document.getElementById('shop').classList.contains('active')) refresh();
  }, REFRESH_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && document.getElementById('shop').classList.contains('active')) refresh();
  });
})();
