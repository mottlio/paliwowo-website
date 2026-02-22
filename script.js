const T = {
  en: {
    heroTitle: 'Fuel prices and discounts nearby, powered by drivers',
    heroSub: 'paliwowo helps drivers in Poland compare fuel prices nearby, including loyalty-card discounts. Add prices quickly via voice, photo, or manual update and help the whole community save money.',
    f1Title: 'Compare nearby stations',
    f1Body: 'See fuel prices around you and quickly identify better deals.',
    f2Title: 'Include discounts',
    f2Body: 'Compare real prices with loyalty programs and retailer promotions.',
    f3Title: 'Built for fast reporting',
    f3Body: 'Contribute prices with minimal effort while on the move.',
    cTitle: 'Become a paliwowo contributor',
    cBody: 'Join early contributors and help build the most useful fuel-price community in Poland.',
    c1: 'Report prices from your local stations',
    c2: 'Improve data quality with quick corrections',
    c3: 'Help other drivers make better fuel decisions',
    cCta: 'I want to contribute',
    footer: '© paliwowo — coming soon'
  },
  pl: {
    heroTitle: 'Ceny paliw i rabaty w Twojej okolicy, tworzone przez kierowców',
    heroSub: 'paliwowo pomaga kierowcom w Polsce porównywać ceny paliw w pobliżu, także z uwzględnieniem rabatów i kart lojalnościowych. Dodawaj ceny szybko głosem, zdjęciem lub ręcznie i pomóż całej społeczności oszczędzać.',
    f1Title: 'Porównuj stacje w pobliżu',
    f1Body: 'Sprawdzaj ceny paliw dookoła i szybko znajdź korzystniejszą opcję.',
    f2Title: 'Uwzględniaj rabaty',
    f2Body: 'Porównuj realne ceny z programami lojalnościowymi i promocjami stacji.',
    f3Title: 'Szybkie raportowanie',
    f3Body: 'Dodawaj ceny przy minimalnej liczbie kroków, także w ruchu.',
    cTitle: 'Zostań współtwórcą paliwowo',
    cBody: 'Dołącz do pierwszych współtwórców i pomóż budować najbardziej użyteczną społeczność paliwową w Polsce.',
    c1: 'Dodawaj ceny z lokalnych stacji',
    c2: 'Poprawiaj jakość danych szybkimi korektami',
    c3: 'Pomagaj kierowcom podejmować lepsze decyzje',
    cCta: 'Chcę współtworzyć',
    footer: '© paliwowo — wkrótce'
  }
};

function applyLang(lang) {
  const x = T[lang] || T.en;
  document.documentElement.lang = lang;
  document.getElementById('t-hero-title').textContent = x.heroTitle;
  document.getElementById('t-hero-sub').textContent = x.heroSub;
  document.getElementById('t-f1-title').textContent = x.f1Title;
  document.getElementById('t-f1-body').textContent = x.f1Body;
  document.getElementById('t-f2-title').textContent = x.f2Title;
  document.getElementById('t-f2-body').textContent = x.f2Body;
  document.getElementById('t-f3-title').textContent = x.f3Title;
  document.getElementById('t-f3-body').textContent = x.f3Body;
  document.getElementById('t-c-title').textContent = x.cTitle;
  document.getElementById('t-c-body').textContent = x.cBody;
  document.getElementById('t-c-1').textContent = x.c1;
  document.getElementById('t-c-2').textContent = x.c2;
  document.getElementById('t-c-3').textContent = x.c3;
  document.getElementById('t-c-cta').textContent = x.cCta;
  document.getElementById('t-footer').textContent = x.footer;
  localStorage.setItem('lang', lang);
}

async function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 1800);
    const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
    clearTimeout(to);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code === 'PL') return 'pl';
    }
  } catch (_) {}
  return (navigator.language || '').toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

document.getElementById('lang-pl').addEventListener('click', () => applyLang('pl'));
document.getElementById('lang-en').addEventListener('click', () => applyLang('en'));

detectLang().then(applyLang);
