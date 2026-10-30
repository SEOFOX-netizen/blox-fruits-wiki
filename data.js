// Données du wiki Blox Fruits FR : fruits, fiches, guides et maîtrises.
const raw = [
["Rocket","Commun","Naturel","🚀",5000,50],["Spin","Commun","Naturel","🌀",7500,75],["Blade","Commun","Naturel","🗡️",30000,100],["Spring","Commun","Naturel","🌱",60000,180],["Bomb","Commun","Naturel","💣",80000,220],["Smoke","Commun","Élémentaire","💨",100000,250],["Spike","Commun","Naturel","📌",180000,380],
["Flame","Peu commun","Élémentaire","🔥",250000,550],["Ice","Peu commun","Élémentaire","🧊",350000,750],["Sand","Peu commun","Élémentaire","🏜️",420000,850],["Dark","Peu commun","Élémentaire","🌑",500000,950],["Eagle","Peu commun","Bête","🦅",550000,975],["Diamond","Peu commun","Naturel","💎",600000,1000],
["Light","Rare","Élémentaire","✨",650000,1100],["Rubber","Rare","Naturel","🟠",750000,1200],["Ghost","Rare","Naturel","👻",940000,1275],["Magma","Rare","Élémentaire","🌋",960000,1300],
["Quake","Légendaire","Naturel","🌐",1000000,1500],["Buddha","Légendaire","Bête","🧘",1200000,1650],["Love","Légendaire","Naturel","💗",1300000,1700],["Creation","Légendaire","Naturel","🧱",1400000,1750],["Spider","Légendaire","Naturel","🕸️",1500000,1800],["Sound","Légendaire","Naturel","🎵",1700000,1900],["Phoenix","Légendaire","Bête","🪽",1800000,2000],["Portal","Légendaire","Naturel","🌀",1900000,2000],["Lightning","Légendaire","Élémentaire","⚡",2100000,2100],["Pain","Légendaire","Naturel","👋",2300000,2200],["Blizzard","Légendaire","Élémentaire","🌨️",2400000,2250],
["Gravity","Mythique","Naturel","🪐",2500000,2300],["Mammoth","Mythique","Bête","🦣",2700000,2350],["T-Rex","Mythique","Bête","🦖",2700000,2350],["Dough","Mythique","Élémentaire","🍩",2800000,2400],["Shadow","Mythique","Naturel","🌘",2900000,2425],["Venom","Mythique","Naturel","🐍",3000000,2450],["Gas","Mythique","Élémentaire","☁️",3200000,2500],["Spirit","Mythique","Naturel","👼",3400000,2550],["Tiger","Mythique","Bête","🐅",5000000,3000],["Yeti","Mythique","Bête","❄️",5000000,3000],["Kitsune","Mythique","Bête","🦊",8000000,4000],["Control","Mythique","Naturel","🔮",9000000,4000],["Dragon","Mythique","Bête","🐉",15000000,5000],
["Magnet","Mythique","Naturel","🧲",6000000,3500]
];
const fruits=raw.map(([name,rarity,type,emoji,beli,robux])=>({name,rarity,type,emoji,beli,robux}));
const legacy=[
{name:"Leopard",rarity:"Mythique",type:"Bête",emoji:"🐆",beli:5000000,robux:null,note:"Fiche héritée / disponibilité à vérifier."},
{name:"Dragon (Classic)",rarity:"Mythique",type:"Bête",emoji:"🐲",beli:3500000,robux:null,note:"Ancienne version du fruit Dragon."},
{name:"Soul",rarity:"Mythique",type:"Naturel",emoji:"💀",beli:3400000,robux:null,note:"Ancien nom associé à Spirit."},
{name:"Door",rarity:"Rare",type:"Naturel",emoji:"🚪",beli:950000,robux:null,note:"Fruit retiré / ancien."},
{name:"Barrier",rarity:"Rare",type:"Naturel",emoji:"🛡️",beli:800000,robux:null,note:"Fruit retiré / ancien."},
{name:"Revive",rarity:"Peu commun",type:"Naturel",emoji:"👻",beli:550000,robux:null,note:"Ancien nom associé à Ghost."},
{name:"Falcon",rarity:"Peu commun",type:"Bête",emoji:"🦅",beli:300000,robux:null,note:"Ancien nom associé à Eagle."},
{name:"Chop",rarity:"Commun",type:"Naturel",emoji:"✂️",beli:30000,robux:null,note:"Ancien nom associé à Blade."},
{name:"Kilo",rarity:"Commun",type:"Naturel",emoji:"⚖️",beli:5000,robux:null,note:"Fruit retiré."},
{name:"Meme",rarity:"Mythique",type:"Naturel",emoji:"🗿",beli:null,robux:null,note:"Non standard / disponibilité à vérifier."},
{name:"Meme (Admin)",rarity:"Admin",type:"Spécial",emoji:"🧪",beli:null,robux:null,note:"Non disponible normalement aux joueurs."},
{name:"Rogue",rarity:"Spécial",type:"Spécial",emoji:"❔",beli:null,robux:null,note:"Hors boutique / disponibilité à vérifier."}
];
// Détails précis inclus ici seulement quand cette base a une référence claire.
// Pour les autres fruits, les touches et Mastery ne sont pas inventées.
const detail={
"Dough":{intro:"Fruit axé sur les attaques de pâte, les prises et les combos. Il possède un éveil via un raid spécial.",awaken:"Oui — éveil spécial",moves:[
["Z","Fried Dough","À vérifier","Projectile de pâte ; vérifie le seuil exact de maîtrise dans la version actuelle."],
["X","Sticky Dough","À vérifier","Attaque de pâte qui immobilise ou attrape l'adversaire selon le mouvement."],
["C","Caractéristiques à vérifier","À vérifier","Nom, effet et seuil à confirmer dans le jeu."],
["V","Caractéristiques à vérifier","À vérifier","Nom, effet et seuil à confirmer dans le jeu."],
["F","Scorching Donut","À vérifier","Capacité de déplacement liée à la pâte."]
],guide:["Prépare le Sweet Chalice : les éléments nécessaires comprennent le God's Chalice et 10 Conjured Cocoa, à échanger auprès du Sweet Crafter.","Les étapes liées à Cake Land et Drip Mama servent à déclencher le combat du Dough King ; vérifie les prérequis exacts dans le jeu.","Vaincre le Dough King est lié à l'accès à la progression du raid Dough.","Termine les raids et dépense les fragments pour éveiller les capacités une par une."],cost:"Éveil complet : 18 500 fragments (valeur de référence à revérifier).",note:"L'invocation du Dough King et l'accès au raid d'éveil sont des étapes liées mais distinctes."},
"Phoenix":{intro:"Fruit Bête centré sur la transformation, le vol et le soutien par les flammes de régénération.",awaken:"Oui — raid Phoenix spécial",moves:[
["Z","Cannon","À vérifier","Attaque de base à distance."],["X","Regeneration Flames","À vérifier","Flammes de régénération et soutien."],["C","Swift Flight","À vérifier","Déplacement aérien."],["V","Transformation","À vérifier","Transformation Phoenix selon la version."],["F","Flight","À vérifier","Capacité de vol."]
],guide:["Atteins 400 de maîtrise sur Phoenix pour pouvoir acheter ton propre jeton de raid auprès du Sick Scientist à Sea of Treats.","Le jeton coûte 1 000 fragments ou peut être acheté avec un fruit physique remplissant le seuil de valeur demandé.","Tu peux aussi rejoindre le raid Phoenix organisé par un autre joueur : les 400 de maîtrise sont nécessaires pour acheter ton propre jeton, pas pour rejoindre un raid lancé par quelqu'un d'autre.","Termine le raid et dépense les fragments pour débloquer les mouvements éveillés."],cost:"Éveil complet : 18 500 fragments. Référence : Z 500, F 2 000, X 3 000, C 4 000, M1 4 000, V 5 000 fragments.",note:"Le seuil de 400 de maîtrise concerne l'achat du jeton personnel."},
"Pain":{intro:"Fruit Naturel de combat axé sur les impacts et les attaques de portée.",awaken:"Pas d'éveil V2 classique indiqué dans cette fiche.",moves:[
["M1","Attaque normale","À vérifier","Nom et valeurs à vérifier en jeu."],["Z","Fury Jab","À vérifier","Attaque de combat ; détails exacts à vérifier."],["X","Rage Release","À vérifier","Détails à confirmer."],["C","Agony Nuke","À vérifier","Détails à confirmer."],["V","Torment Warp","À vérifier","Détails à confirmer."],["F","Capacité de mobilité","À vérifier","Détails à confirmer."]
],guide:["Pain ne suit pas simplement le système d'éveil V2 classique.","Des guides communautaires décrivent des objectifs d'amélioration dédiés via l'Admin Panel.","Les objectifs rapportés impliquent différents seuils de maîtrise et défis spécifiques ; consulte l'interface en jeu avant de te lancer."],cost:"Coûts et conditions à confirmer dans la version actuelle.",note:"Ne confonds pas les améliorations spécifiques et l'éveil standard par raid."},
"Gravity":{intro:"Fruit Naturel utilisant la gravité et des attaques de zone inspirées des météores.",awaken:"Pas d'éveil V2 classique indiqué dans cette fiche.",moves:[
["M1","Attaque normale","À vérifier","Détails exacts à vérifier."],["Z","Singularity","À vérifier","Attaque associée à la gravité."],["X","Orbital Chain","À vérifier","Détails exacts à vérifier."],["C","Gravitational Prison","À vérifier","Contrôle de zone ; détails exacts à vérifier."],["V","Asteroid Crash","À vérifier","Attaque de type météore."],["F","Shooting Star","À vérifier","Détails exacts à vérifier."]
],guide:["Gravity ne suit pas le système d'éveil V2 standard dans cette fiche.","Des sources communautaires mentionnent des objectifs d'amélioration dédiés ; vérifie leur présence et leurs conditions dans la version actuelle.","Ne dépense pas de ressources avant d'avoir confirmé les conditions affichées dans le jeu."],cost:"Coût et objectifs à confirmer.",note:"Les informations sur les améliorations de Gravity sont sujettes à vérification."}
};

const guideData=[
["Dough","🍩","Sweet Chalice, Dough King et raid Dough",["Les guides communautaires associent le Sweet Chalice au God's Chalice et à 10 Conjured Cocoa via le Sweet Crafter.","Les étapes de Cake Land et Drip Mama concernent l'invocation du Dough King.","Le combat du Dough King est lié à l'accès au raid spécial Dough.","Après avoir obtenu l'accès au raid, termine-le pour gagner des fragments et éveiller les capacités.","Vérifie les prérequis exacts et les objets demandés en jeu : ces étapes peuvent changer." ]],
["Phoenix","🪽","Maîtrise 400 et jeton de raid Phoenix",["Atteins 400 de maîtrise pour acheter ton propre jeton Phoenix au Sick Scientist à Sea of Treats.","Le jeton coûte 1 000 fragments ou peut demander un fruit physique répondant au seuil de valeur en jeu.","Tu peux rejoindre un raid hébergé par un autre joueur sans acheter ton propre jeton.","Termine le raid puis dépense les fragments pour débloquer les capacités éveillées." ]],
["Pain","👋","Fiche spéciale : vérifie les améliorations actuelles",["Pain n'a pas un éveil V2 classique répertorié ici.","Les objectifs d'amélioration cités par certaines sources communautaires peuvent changer ; vérifie l'Admin Panel et les conditions affichées en jeu.","N'ajoute pas de coûts ou de quêtes exacts sans source récente."]],
["Gravity","🪐","Fiche spéciale : vérifie les améliorations actuelles",["Gravity n'a pas un éveil V2 classique répertorié ici.","Vérifie les objectifs, seuils de maîtrise et matériaux dans la version actuelle du jeu.","Les noms de capacités et leurs effets peuvent être modifiés par les mises à jour."]],
["Éveils en général","💠","Raids, fragments et mouvements éveillés",["Tous les fruits ne peuvent pas être éveillés.","Pour un fruit éligible, l'éveil passe généralement par un raid adapté et des fragments.","Certains fruits ont une progression ou des conditions spéciales.","Avant d'utiliser tes fragments, consulte les coûts actuels et l'ordre des mouvements dans le jeu."]]
];
document.getElementById('guideGrid').innerHTML=guideData.map((g,i)=>`<button class="box guidecard" onclick="showGuide(${i})"><span class="bigemoji">${g[1]}</span><h3>${g[0]}</h3><p class="muted">${g[2]}</p></button>`).join('');

// Seuils de maîtrise restaurés depuis la version précédente du wiki.
const restoredMasteryLevels = {
  Rocket:[["Air Slash",1],["Rocket Crash",20],["Blast Off",50],["Nuclear Missile",75]],
  Spin:[["Razor Wind",1],["Whirlwind",25],["Spinning Flight",50],["Helicopter Bomb",90]],
  Chop:[["Tackle",1],["Chop Fists",20],["Split Car",50],["Festival",75]],
  Spring:[["Spring Snipe",1],["Spring Cannon",20],["Spring Leap",60],["Spring Emperor",80]],
  Bomb:[["Target Bomb",1],["Explosive Jump",25],["Bomb Grab",30],["Self Destruct",50],["Land Mines",125]],
  Smoke:[["Smoke Slam",1],["Smoke Cloud",20],["Smoke Bomber",50],["Smoke Flight",10]],
  Spike:[["Spike Rush",1],["Spike Ball",15],["Spike Throw",30],["Spike Barrage",75]],
  Flame:[["Fire Bullet",1],["Fire Burst",25],["Fire Vortex",50],["Flame Destroyer",100],["Rocket Flight",10]],
  Falcon:[["Plume Slash",1],["Wind Burst",20],["Falcon Flight",50],["Bone Crusher",80]],
  Ice:[["Ice Spears",1],["Ice Surge",25],["Glacial Surge",50],["Ice Bird",100],["Ice Skating",1]],
  Sand:[["Desert Blade",1],["Sand Tomb",40],["Sand Whirlwind",80],["Sand Storm",120],["Sand Flight",15]],
  Dark:[["Dark Matter",1],["Black Hole",40],["Dark Vortex",80],["Gothic Attraction",110]],
  Diamond:[["Hardness",1],["Diamond Hail",1],["Diamond Refraction",110]],
  Light:[["Light Ray",1],["Reflection Kick",40],["Sky Beam",90],["Hand of Justice",110],["Light Speed Warp",110]],
  Rubber:[["Pistol",1],["Bazooka",30],["Gatling",80],["Transformation",100]],
  Magma:[["Magma Clap",1],["Volcanic Assault",45],["Great Magma Hound",95],["Volcanic Eruption",140],["Magma Floor",10]],
  Ghost:[["Shiver",1],["Spectral Gryphon",50],["Ghost Busters",100],["Crying Soul",150],["Resurrection",1]],
  Barrier:[["Barrier Towers",1],["Barrier Stairs",60],["Barrier Trap",90],["Barrier Dome",125]],
  Quake:[["Quake Punch",1],["Wave Shock",50],["Evacuation",100],["Spatial Shock",150]],
  Buddha:[["Transform",1],["Impact",1],["Shifting Vortex",100],["Light of Annihilation",200],["Twilight Leap",1]],
  Love:[["Heart Shot",1],["Heart Servo",50],["Heart Beam",100],["Love Meteor",150],["Besto Friendo",250]],
  Spider:[["Slingshot",1],["Multi-String Attack",40],["Overheated Sniper",80],["Ultimate Thread",120],["Highway to Hell",15]],
  Sound:[["Melody Waves",1],["Sound Buffet",50],["Fortissimo",100],["Symphony of Destruction",150],["Glorious Symphony",250]],
  Phoenix:[["Cannon",1],["Regeneration Flames",45],["Fast Kick",95],["Full Transformation",150],["Flight",30]],
  Portal:[["Portal Dash",1],["Parallel Escape",50],["Quantum Rift",100],["Dimensional Rift",200],["World Warp",300]],
  Rumble:[["Thunderclap",1],["Thunder Bomb",40],["Lightning Dragon",90],["Thunderstorm",130],["Lightning Flash",30]],
  Pain:[["Heavy Paw",1],["Paw Sizzle",50],["Repel",100],["Torture Room",150]],
  Blizzard:[["Snowstorm",1],["Blizzard Domain",40],["Avalanche",90],["Glacier Slam",160]],
  Gravity:[["Gravity Push",1],["Gravity Obeisance",50],["Meteor Pitch",100],["Meteors Rain",150],["Boulder Flight",25]],
  Mammoth:[["Ancient Cutter",1],["True Prehistoric Punt",50],["Colossal Crusher",100],["Transformation",150],["Stampede",300]],
  Shadow:[["Somber Whirlwind",1],["Shade Nest",50],["Nightmare Leech",100],["Corvids Crow",150],["Shadow Umbrage",200]],
  Venom:[["Poison Daggers",1],["Serpent Wrath",50],["Toxic Fog",100],["Transformation",200],["Noxious Shot",300]],
  Control:[["Control Area",1],["Levitate",1],["Echo Knife",150],["Gamma Rush",250],["Teleport",250]],
  Spirit:[["Frost / Inferno Blades",1],["Wrath of God",75],["Glacial Corpse",150],["End of Times",250]],
  Dragon:[["Dragon Beam",1],["Dragon Flight",75],["Dragon Claw",150],["Fire Shower",250],["Transformation",350]],
  "T-Rex":[["Tail Swipe",1],["Predatory Screech",50],["Hunter’s Chase",100],["Reptilian Fury",150],["Gigantic Transformation",250]],
  Dough:[["Fried Dough",1],["Roller Dough",50],["Sticky Dough",100],["Carved Dough",200],["Restless Dough Barrage",300]],
  Leopard:[["Finger Revolver",1],["Spiraling Kick",80],["Body Flicker",130],["Leonine Fury",200],["Transformation",300]],
  Kitsune:[["Accursed Enchantment",1],["Tails of Fury",150],["Swift Shimmer",200],["Fox Fire Disruption",250],["Transformation",300]]
};
restoredMasteryLevels.Blade = restoredMasteryLevels.Chop;
restoredMasteryLevels.Eagle = restoredMasteryLevels.Falcon;
restoredMasteryLevels.Lightning = restoredMasteryLevels.Rumble;
