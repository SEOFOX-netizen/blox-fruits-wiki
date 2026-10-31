// Onglet « Shop » : page d'information sur le Blox Fruit Dealer (sans appel à une API).
(function () {
  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  if (!nav || !main) return;

  const css = document.createElement('style');
  css.textContent = `
  #shop .shop-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin:18px 0}
  #shop .shop-card h2{margin:0 0 6px}
  #shop .shop-card .big{font-size:28px;font-weight:800;color:var(--cyan)}
  #shop .shop-links{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}
  #shop .shop-links a{display:inline-block;border:1px solid var(--line);background:var(--panel2);color:var(--text);padding:10px 14px;border-radius:10px;text-decoration:none}
  #shop .shop-links a:hover{border-color:var(--cyan)}
  #shop ul.shop-tips{padding-left:20px;margin:8px 0}
  `;
  document.head.appendChild(css);

  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.view = 'shop';
  tab.textContent = '🛒 Shop';
  tab.addEventListener('click', () => showView('shop'));
  nav.insertBefore(tab, nav.children[2] || null);

  const sec = document.createElement('section');
  sec.className = 'view';
  sec.id = 'shop';
  sec.innerHTML = `
    <div class="hero"><div class="eyebrow">DEALER</div>
      <h1>Le shop du <span>Blox Fruit Dealer</span></h1>
      <p>Comment fonctionne le stock, quand il change et où le suivre en direct. Le stock est le même sur tous les serveurs.</p>
    </div>

    <div class="shop-cards">
      <div class="box shop-card"><h2>🏪 Dealer normal</h2><div class="big">toutes les 4 h</div>
        <p class="muted">Le stock change environ toutes les 4 heures. Le dealer se trouve dans la zone de départ de chaque mer.</p></div>
      <div class="box shop-card"><h2>🌫️ Dealer Mirage</h2><div class="big">toutes les 2 h</div>
        <p class="muted">Le stock change environ toutes les 2 heures. Il est sur Mirage Island, seulement en Deuxième et Troisième Mer.</p></div>
    </div>

    <div class="box">
      <h2>📍 Voir le stock en jeu</h2>
      <ul class="shop-tips">
        <li>Parle au Blox Fruit Dealer : il affiche les fruits en vente.</li>
        <li>Chaque fruit s'achète en Beli ou en Robux. Un fruit payé en Robux reste dans ton inventaire, celui payé en Beli est remplacé quand tu en prends un autre.</li>
        <li>Les prix de chaque fruit sont dans la section <a href="#" onclick="showView('catalog');return false">🍈 Fruits</a>.</li>
      </ul>
    </div>

    <div class="box" style="margin-top:14px">
      <h2>🔗 Suivre le stock en direct</h2>
      <p class="muted">Sites externes, non affiliés à ce wiki. Les heures exactes de restock varient selon les sources : fie-toi au minuteur du site ou au jeu.</p>
      <div class="shop-links">
        <a href="https://beebom.com/blox-fruits-stock/" target="_blank" rel="noopener">Beebom — stock et horaires ↗</a>
        <a href="https://bloxfruitscalc.com/stock" target="_blank" rel="noopener">Stock avec minuteurs ↗</a>
      </div>
    </div>

    <div class="notice">Ce wiki n'affiche pas le stock directement : aucune source publique fiable n'est disponible pour le moment. Vérifie toujours le stock en jeu avant d'acheter.</div>`;
  main.appendChild(sec);
})();
