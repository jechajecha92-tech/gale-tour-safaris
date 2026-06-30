/* Gale Tour and Safaris — shared behaviour for all pages
   ------------------------------------------------------------------
   Activity data lives here so it can be rendered on excursions.html
   (and any future page). Each entry:
   [ name, description, category, lucide-icon, duration, image-search-tags ]
   Images are pulled live from LoremFlickr by keyword. To use your own
   photos, drop a file in assets/ and replace the image URL with e.g.
   "assets/nakupenda.jpg". */
const ACTIVITIES = [
  ["Nakupenda Island Tour","Relaxing private-boat trip to the Nakupenda sandbank with snorkelling and a fresh seafood lunch.","water","waves","5 hrs · 10:00–15:00","sandbank,beach"],
  ["Prison Island Tour","Private boat to Changuu Island to meet giant land tortoises and tour the historic colonial prison houses.","culture","turtle","3 hrs","zanzibar,tortoise"],
  ["Spice Tour","Walk the spice farms with a professional English-speaking guide and discover how Zanzibar's spices are grown.","culture","leaf","2 hrs","spices,market"],
  ["Stone Town Tour","Guided walk through Darajani street, the local spice market and Freddie Mercury's birthplace with a local guide.","culture","landmark","2 hrs","stonetown,zanzibar"],
  ["Blue Lagoon Snorkeling","Private-boat snorkelling at the Pingwe blue lagoon among countless starfish and sea cucumbers.","water","fish","3 hrs","lagoon,snorkeling"],
  ["Mnemba Snorkeling","Private boat from Matemwe to Mnemba Atoll to swim with dolphins, snorkel the reef and enjoy a seafood lunch.","water","fish","Half / full day","coral,reef"],
  ["Dolphins Tour Kizimkazi","Private-boat dolphin swim in the calm southern waters of Kizimkazi village.","water","waves","3 hrs","dolphin,sea"],
  ["Aslam Cave Kizimkazi","Discover the freshwater turtle cave at Kizimkazi on the island's south coast.","adventure","mountain","1 hr","cave,water"],
  ["Kuza Cave Jambiani","Swim for 30 minutes in the sacred freshwater cave, then enjoy local drumming with the community.","adventure","droplets","1 hr","cave,swimming"],
  ["Maalum Cave Paje","Swim in a breathtaking natural rock pool and enjoy tasty local food in Paje.","water","droplets","1 hr","cave,pool"],
  ["Pungume Island Snorkeling","Remote island for swimming, superb snorkelling and relaxing on a vast sandbank.","water","fish","Full day","island,beach"],
  ["Horse Riding Nungwi","Gallop along Zanzibar's northern shores at Nungwi beach.","adventure","footprints","","beach,horse"],
  ["Jet Ski Kendwa","Thrilling jet-ski rides on the ocean off Kendwa beach.","adventure","gauge","30 min – 1 hr","jetski,sea"],
  ["Sunset Dhow Kendwa","Sail together at golden hour and share local drumming with local people.","water","sailboat","1 hr","dhow,sunset"],
  ["Sunset at Michamvi Kae","The island's best spot to watch the sun set over the bay at Kae beach.","adventure","sunset","","sunset,beach"],
  ["Village Tour Makunduchi","Authentic Zanzibari village life experience.","culture","home","","africa,village"],
  ["Mtende Secret Beach","Hidden paradise beach off the beaten path.","adventure","palmtree","","beach,tropical"],
  ["Jozani Forest & Monkeys","Spot rare Red Colobus monkeys in the wild.","adventure","trees","","monkey,forest"],
  ["The Rock Restaurant Dongwe","Iconic dining on a rock in the ocean.","culture","utensils","","ocean,restaurant"],
  ["Quad & Buggy Riding","Off-road adventure through the island.","adventure","car-front","","quad,sand"],
  ["Sailing Local Boat Jambiani","Ride a traditional outrigger ngalawa.","water","sailboat","","boat,sailing"],
  ["Cooking Class","Learn local Swahili cuisine in a village home.","culture","chef-hat","","cooking,spices"],
  ["Local Henna & Hair Plaiting","Traditional Zanzibari beauty arts.","culture","sparkles","","henna,hand"],
  ["Car Hiring & Self-Drive","Flexible car rental for independent exploring.","transport","car","","car,road"],
  ["Zanzibar Economic Activities Tour","Learn how locals farm and fish.","culture","wheat","","fishing,boat"],
  ["School & Madrassa Visit","Meaningful educational cultural exchange.","community","graduation-cap","","school,africa"],
  ["Providing for Poor Families","Community giving and support programme.","community","heart-handshake","","village,africa"],
  ["Orphans & Disabled Persons Visit","Compassionate community outreach.","community","heart","","children,africa"],
  ["Scooter & Motorbike Rental","Explore the island on two wheels.","transport","bike","","scooter,street"]
];
const CAT_LABEL = { water:"Water", culture:"Culture", adventure:"Adventure", community:"Community", transport:"Transport" };

function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ---------- Your own photos ----------
   Every activity automatically looks for its own photo at
       assets/img/<slug>.jpg
   where <slug> = the activity name in lowercase, words joined by "-",
   and "&" written as "and". Example: "Spice Tour" -> assets/img/spice-tour.jpg
   Just upload a file with that name (no code changes needed) and it appears.
   Until the file exists, the card shows a keyword stand-in, so it is never blank.
   The exact file name for every activity is listed in assets/img/README.md. */
function slug(name){
  return name.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

/* ---------- Render activity cards (only where a #cards grid exists) ---------- */
const cardsEl = document.getElementById('cards');
if (cardsEl) {
  cardsEl.innerHTML = ACTIVITIES.map(([name,desc,cat,icon,dur,tags], i) => {
    const fallback = `https://loremflickr.com/640/480/${tags}?lock=${i + 1}`;
    const src = `assets/img/${slug(name)}.jpg`;
    const onerr = ` onerror="this.onerror=null;this.src='${fallback}'"`;
    return `
    <article class="card reveal" data-cat="${cat}">
      <div class="card-figure">
        <img src="${src}"${onerr} alt="${escapeHtml(name)}, Zanzibar" width="640" height="480" loading="lazy" />
        <span class="card-icon"><svg data-lucide="${icon}"></svg></span>
        <span class="badge ${cat}"><span class="dot"></span>${CAT_LABEL[cat]}</span>
      </div>
      <div class="card-body">
        <h3>${escapeHtml(name)}</h3>
        ${dur ? `<span class="dur"><svg data-lucide="clock"></svg>${escapeHtml(dur)}</span>` : ``}
        <p>${escapeHtml(desc)}</p>
      </div>
    </article>`;
  }).join('');
}

/* ---------- Lucide icons ---------- */
function renderIcons(){ if (window.lucide) window.lucide.createIcons(); }
window.addEventListener('load', renderIcons);
document.addEventListener('DOMContentLoaded', renderIcons);

/* ---------- Theme toggle (JS variable, no storage) ---------- */
let userTheme = null; // null = follow system
const root = document.documentElement;
function systemDark(){ return window.matchMedia('(prefers-color-scheme: dark)').matches; }
function applyTheme(){
  const dark = userTheme ? userTheme === 'dark' : systemDark();
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
}
applyTheme();
const themeToggle = document.querySelector('[data-theme-toggle]');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentlyDark = root.getAttribute('data-theme') === 'dark';
    userTheme = currentlyDark ? 'light' : 'dark';
    applyTheme();
  });
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!userTheme) applyTheme(); });

/* ---------- Sticky nav shadow ---------- */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
}

/* ---------- Mobile menu ---------- */
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');
const closeNav = document.getElementById('closeNav');
function openMenu(){ mobileNav.classList.add('open'); mobileNav.setAttribute('aria-hidden','false'); hamburger.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
function closeMenu(){ mobileNav.classList.remove('open'); mobileNav.setAttribute('aria-hidden','true'); hamburger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
if (mobileNav && hamburger) {
  hamburger.addEventListener('click', openMenu);
  if (closeNav) closeNav.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ---------- Category filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.setAttribute('aria-pressed','false'));
    btn.setAttribute('aria-pressed','true');
    const f = btn.dataset.filter;
    let shown = 0;
    document.querySelectorAll('#cards .card').forEach(card => {
      const match = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hide', !match);
      if (match) shown++;
    });
    const count = document.getElementById('resultsCount');
    if (count) count.textContent = shown + (shown === 1 ? ' experience' : ' experiences');
  }));
}

/* ---------- Scroll reveal ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sibs = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
        const idx = sibs.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(idx, 6) * 60 + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- Contact form (non-functional demo) ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    if (note) {
      note.textContent = "Thanks! This is a demo form — please message us on WhatsApp at +255 777 454 658 and we'll reply right away.";
      note.style.color = 'var(--primary)';
    }
    e.target.reset();
  });
}
