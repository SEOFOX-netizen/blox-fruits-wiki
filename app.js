function showView(id){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
function fmt(n){return n==null?'À vérifier':n.toLocaleString('fr-FR');}
function card(f,old=false){return `<button class="box fruit" onclick="${old?`openLegacy('${f.name}')`:`openFruit('${f.name}')`}"><span class="emoji">${f.emoji}</span><strong>${f.name}</strong><small>${f.type} · ${f.beli==null?'Prix à vérifier':fmt(f.beli)+' Beli'}</small><span class="rarity ${f.rarity==='Mythique'?'mythic':f.rarity==='Légendaire'?'legendary':f.rarity==='Rare'?'rare':''}">${f.rarity}</span></button>`}
let selectedR='Tous',selectedT='Tous';
function chips(el,values,selected,callback){document.getElementById(el).innerHTML=values.map(v=>`<button class="chip ${v===selected?'active':''}" data-v="${v}">${v}</button>`).join('');document.getElementById(el).querySelectorAll('button').forEach(b=>b.onclick=()=>{callback(b.dataset.v);chips(el,values,el==='rarityChips'?selectedR:selectedT,callback);render();});}
function render(){let q=document.getElementById('search').value.toLowerCase(),sort=document.getElementById('sort').value;let a=fruits.filter(f=>(f.name+' '+f.type+' '+f.rarity).toLowerCase().includes(q)&&(selectedR==='Tous'||f.rarity===selectedR)&&(selectedT==='Tous'||f.type===selectedT));if(sort==='priceDesc')a.sort((x,y)=>(y.beli||0)-(x.beli||0));else if(sort==='priceAsc')a.sort((x,y)=>(x.beli||0)-(y.beli||0));else a.sort((x,y)=>x.name.localeCompare(y.name));document.getElementById('fruitGrid').innerHTML=a.map(f=>card(f)).join('');document.getElementById('resultCount').textContent=a.length+' résultat(s)';}
chips('rarityChips',['Tous','Commun','Peu commun','Rare','Légendaire','Mythique'],selectedR,v=>selectedR=v);
chips('typeChips',['Tous','Naturel','Élémentaire','Bête'],selectedT,v=>selectedT=v);
document.getElementById('search').addEventListener('input',render);document.getElementById('sort').addEventListener('change',render);render();
document.getElementById('featured').innerHTML=['Dough','Phoenix','Buddha','Portal','Kitsune','Dragon','Pain','Gravity'].map(n=>card(fruits.find(f=>f.name===n))).join('');
document.getElementById('legacyGrid').innerHTML=legacy.map(f=>card(f,true)).join('');
document.getElementById('activeCount').textContent=fruits.length;
function openFruit(name){let f=fruits.find(x=>x.name===name),d=detail[name];showView('detail');let moves=d?d.moves.map(m=>`<div class="move"><h3><span class="key">${m[0]}</span>${m[1]}</h3><div class="mastery">Maîtrise requise : ${m[2]}</div><p>${m[3]}</p></div>`).join(''):`<div class="info">Les attaques et seuils de maîtrise de ce fruit ne sont pas encore vérifiés dans cette version. Consulte la fiche communautaire liée ci-dessous avant d'ajouter des valeurs.</div>`;
let guide=d?`<h3>Guide d'éveil / progression</h3><ol class="steps">${d.guide.map(s=>`<li>${s}</li>`).join('')}</ol><div class="notice">${d.note}</div><p><b>Coût :</b> ${d.cost}</p>`:`<h3>Éveil et quêtes</h3><p class="muted">À vérifier. Tous les fruits ne possèdent pas un éveil V2 classique.</p>`;
document.getElementById('detailContent').innerHTML=`<div class="detail-hero"><div class="bigemoji">${f.emoji}</div><div><span class="rarity ${f.rarity==='Mythique'?'mythic':f.rarity==='Légendaire'?'legendary':f.rarity==='Rare'?'rare':''}">${f.rarity}</span><h1>${f.name}</h1><p class="muted">${d?d.intro:f.type+' — fruit du catalogue Blox Fruits.'}</p></div></div><div class="detail-grid"><aside><div class="box"><h2>📋 Résumé</h2><div class="facts"><div class="fact"><small>Type</small><b>${f.type}</b></div><div class="fact"><small>Rareté</small><b>${f.rarity}</b></div><div class="fact"><small>Prix Beli</small><b>${fmt(f.beli)}</b></div><div class="fact"><small>Prix Robux</small><b>${f.robux==null?'À vérifier':fmt(f.robux)}</b></div></div><p><b>Éveil :</b> ${d?d.awaken:'À vérifier'}</p><p><b>Mastery :</b> seuils propres à chaque attaque, à vérifier dans la liste ci-contre.</p><p><a href="https://bffr.fr/wiki/fruits/${f.name.toLowerCase().replaceAll(' ','-')}/" target="_blank" rel="noopener">Ouvrir la fiche communautaire ↗</a></p></div><div class="box"><h3>À vérifier avant de jouer</h3><p class="muted">Prix actuel, touches, seuils de maîtrise, coûts de fragments et conditions après la dernière mise à jour.</p></div></aside><div><div class="box"><h2>⚔️ Attaques & maîtrise</h2>${moves}</div><div class="box">${guide}</div></div></div>`;}
function openLegacy(name){let f=legacy.find(x=>x.name===name);showView('detail');document.getElementById('detailContent').innerHTML=`<div class="detail-hero"><div class="bigemoji">${f.emoji}</div><div><h1>${f.name}</h1><p>${f.note}</p></div></div><div class="box"><p><b>Statut :</b> ancien fruit, alias ou disponibilité spéciale à confirmer.</p><p><b>Prix historique :</b> ${fmt(f.beli)} Beli.</p><p>Cette fiche est séparée des fruits jouables actuels pour ne pas induire en erreur.</p><a href="https://bffr.fr/wiki/fruits" target="_blank" rel="noopener">Comparer au catalogue communautaire ↗</a></div>`;}
function showGuide(i){let g=guideData[i],el=document.getElementById('guideDetail');el.classList.remove('hidden');el.innerHTML=`<h2>${g[1]} ${g[0]}</h2><p class="muted">${g[2]}</p><ol class="steps">${g[3].map(s=>`<li>${s}</li>`).join('')}</ol><button class="btn" onclick="document.getElementById('guideDetail').classList.add('hidden')">Fermer</button>`;el.scrollIntoView({behavior:'smooth',block:'start'});}

// Verdict PvP / PvE et animations des fiches.
(function(){
  const ratings={Rocket:[2,3,2],Spin:[3,3,3],Blade:[4,4,4],Spring:[4,4,4],Bomb:[5,5,4],Smoke:[4,5,5],Spike:[3,4,3],Flame:[6,7,7],Ice:[8,8,8],Sand:[7,7,7],Dark:[7,7,6],Eagle:[6,6,6],Diamond:[5,6,5],Light:[7,9,9],Rubber:[7,6,5],Ghost:[6,7,6],Magma:[7,10,10],Quake:[8,8,7],Buddha:[5,10,10],Love:[7,7,6],Creation:[6,8,7],Spider:[8,8,7],Sound:[7,9,8],Phoenix:[7,7,6],Portal:[10,7,5],Lightning:[8,9,8],Pain:[8,6,5],Blizzard:[8,9,9],Gravity:[7,8,6],Mammoth:[7,8,8],'T-Rex':[8,9,9],Dough:[9,8,8],Shadow:[8,8,7],Venom:[8,9,9],Gas:[8,9,9],Spirit:[8,8,8],Tiger:[9,9,9],Yeti:[8,8,8],Kitsune:[10,9,9],Control:[9,8,6],Dragon:[10,10,10],Magnet:[6,7,7]};
  const recommendations={Rocket:'Bien pour découvrir le jeu, puis à remplacer pour progresser plus vite.',Spin:'Simple au début, mais ses performances deviennent limitées plus tard.',Blade:'Correct pour apprendre le combat rapproché ; peu polyvalent en fin de partie.',Spring:'Amusant pour bouger et surprendre, mais pas idéal pour farmer longtemps.',Bomb:'Ses dégâts de zone aident au début ; d’autres fruits facilitent davantage la progression.',Smoke:'Accessible pour commencer ; choisis ensuite un fruit avec de meilleures attaques de zone.',Spike:'Peut dépanner au début, mais manque de polyvalence pour le contenu avancé.',Flame:'Bon premier choix avec des attaques de zone utiles et une progression équilibrée.',Ice:'Très bon contrôle et bons combos ; équilibré pour le PvP et la progression.',Sand:'Bon contrôle et bonne portée ; profite de la maîtrise et de l’éveil lorsqu’il est disponible.',Dark:'Excellent pour immobiliser et enchaîner en PvP ; moins axé farm pur.',Eagle:'À choisir pour la mobilité et les transformations ; farm convenable.',Diamond:'Plutôt défensif et situationnel ; choisis-le pour son style, pas pour optimiser le farm.',Light:'Excellent pour progresser tôt grâce à sa mobilité et ses attaques pratiques pour farmer.',Rubber:'Bon potentiel de combos, mais demande de la précision et n’est pas spécialisé en farm.',Ghost:'Polyvalent et agréable à jouer ; correct en progression sans dominer un domaine précis.',Magma:'Excellent en PvE et pour les dégâts de zone ; très recommandé pour farmer.',Quake:'Bon contrôle et dégâts de zone, notamment en groupe ; mobilité plus limitée.',Buddha:'Un des meilleurs choix pour monter de niveau et farmer ; adapte ton combat à sa transformation.',Love:'Mobilité et contrôle agréables ; bon choix si tu apprécies le jeu aérien.',Creation:'Intéressant pour contrôler l’espace ; dépend de ta maîtrise de ses capacités.',Spider:'Très bon potentiel de combos et de contrôle en PvP ; farm moins rapide.',Sound:'Bonnes attaques de zone et pression régulière ; solide en PvE et en équipe.',Phoenix:'Privilégie la mobilité et le soutien ; survie utile, mais farm moins rapide que Magma ou Buddha.',Portal:'Excellent pour la mobilité et les déplacements PvP ; pas le meilleur choix pour farmer.',Lightning:'Bon compromis entre dégâts, zone et combat ; performant en PvE comme en PvP.',Pain:'Fruit technique pour les combos PvP ; moins confortable pour farmer.',Blizzard:'Très bon contrôle et attaques de zone ; recommandé pour le farm et efficace en PvP.',Gravity:'Contrôle de zone intéressant ; moins pratique que les meilleurs fruits pour farmer rapidement.',Mammoth:'Transformation résistante et dégâts réguliers ; bon choix pour farmer au contact.','T-Rex':'Très bon choix général grâce à ses dégâts et sa transformation ; efficace en farm comme en combat.',Dough:'Excellent pour les combos PvP ; son éveil améliore sa polyvalence et son farm.',Shadow:'Bon burst et bons combos ; orienté combat tout en restant correct pour progresser.',Venom:'Dégâts persistants et attaques de zone ; très bon pour farmer et combattre.',Gas:'Très bon potentiel PvE grâce à sa zone et ses dégâts continus ; solide pour farmer.',Spirit:'Polyvalent et puissant, mais demande de bien gérer ses différentes capacités.',Tiger:'Forte pression en combat et bonne transformation ; excellent choix polyvalent.',Yeti:'Résistant et puissant ; choix polyvalent dont l’efficacité dépend de ta maîtrise.',Kitsune:'Très grande mobilité et dégâts élevés ; excellent choix général pour bouger, farmer et combattre.',Control:'Très fort en PvP entre de bonnes mains, mais exigeant et moins pratique pour farmer.',Dragon:'Très puissant et polyvalent ; excellent choix général, avec une prise en main exigeante.',Magnet:'Bon contrôle des ennemis et attaques de zone ; utile en farm de groupe, moins mobile que les meilleurs choix.'};
  function level(n){return n>=9?'Excellent':n>=8?'Très bon':n>=7?'Bon':n>=5?'Correct':'Limité'}
  function score(label,n){return '<div class="verdict-score"><div class="verdict-score-head"><b>'+label+'</b><strong>'+n+'/10</strong></div><small>'+level(n)+'</small><div class="verdict-bar"><span style="width:'+(n*10)+'%"></span></div></div>'}
  function restore(){
    const root=document.getElementById('detailContent'); if(!root)return;
    const hero=root.querySelector('.detail-hero'); if(!hero)return;
    const title=hero.querySelector('h1'); const name=title?title.textContent.trim():'';
    if(!hero.querySelector('.detail-fx')){const fx=document.createElement('span');fx.className='detail-fx';fx.setAttribute('aria-hidden','true');hero.appendChild(fx)}
    const grid=root.querySelector('.detail-grid'); if(!grid||grid.querySelector('.verdict-panel'))return;
    const values=ratings[name]||[5,5,5];
    const overall=Math.round(((values[0]+values[1]+values[2])/3)*10)/10;
    const recommendation=recommendations[name]||'Compare ses capacités à ton objectif principal et vérifie les valeurs après la dernière mise à jour.';
    const panel=document.createElement('section');panel.className='verdict-panel';
    panel.innerHTML='<div class="verdict-title"><span class="verdict-icon">⚖️</span><div><h2>Verdict final</h2><p>Évaluation indicative de '+name+'</p></div></div><div class="verdict-scores">'+score('PvP',values[0])+score('PvE',values[1])+score('Farm',values[2])+'</div><p class="verdict-disclaimer"><b>Note globale : </b>'+overall+'/10 · <b>Recommandation : </b>'+recommendation+'</p><p class="verdict-disclaimer">Notes éditoriales indicatives et non officielles : elles varient selon le niveau, le build, la maîtrise et les mises à jour. Ce ne sont pas des statistiques garanties.</p>';
    grid.appendChild(panel);
  }
  const root=document.getElementById('detailContent');
  if(root){new MutationObserver(restore).observe(root,{childList:true,subtree:true});restore()}
})();

function renderRestoredMastery(name) {
  const rows = restoredMasteryLevels[name];
  if (!rows) return;
  const root = document.getElementById("detailContent");
  if (!root) return;
  const panel = document.createElement("section");
  panel.className = "box restored-mastery-panel";
  panel.innerHTML = '<h2>⚔️ Attaques & maîtrise</h2>' +
    rows.map(function(move,index) {
      const key = ["Z","X","C","V","F"][index] || "—";
      return '<div class="move"><h3><span class="key">' + key + '</span>' + move[0] +
        '</h3><div class="mastery">Maîtrise requise : ' + move[1] + '</div></div>';
    }).join('') +
    '<p class="muted">Seuils restaurés depuis la version précédente du wiki ; vérifie-les en jeu après les mises à jour.</p>';
  const existing = root.querySelector(".detail-grid > div > .box");
  if (existing) existing.replaceWith(panel);
  else root.appendChild(panel);
}

const openFruitBeforeMasteryRestore = openFruit;
openFruit = function(name) {
  openFruitBeforeMasteryRestore(name);
  renderRestoredMastery(name);
};
const openLegacyBeforeMasteryRestore = openLegacy;
openLegacy = function(name) {
  openLegacyBeforeMasteryRestore(name);
  renderRestoredMastery(name);
};
