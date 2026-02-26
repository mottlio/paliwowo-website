'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
const SUPPORTED_LANGS = ['pl', 'en', 'ua'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && SUPPORTED_LANGS.includes(value as Lang);

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    heroTitle: 'The best fuel price near you — every time.',
    heroSubtitle:
      'Prices and discounts across stations in your area, powered by smart estimates and drivers like you who search for a good deal and share it with others. Join in and help everyone save.',
    heroTrust: 'Launching in Warsaw first. Rolling out across Poland soon.',
    heroCta1: 'Get the app',
    heroCta2: 'How it works',
    f1Title: 'Compare nearby stations',
    f1Body: 'See fuel prices around you and quickly identify better deals.',
    f2Title: 'Include discounts',
    f2Body: 'Compare real prices with loyalty programs and retailer promotions.',
    f3Title: 'Built for fast reporting',
    f3Body: 'Contribute prices with minimal effort while on the move.',
    howTitle: 'How it works',
    step1: 'Check prices near you',
    step2: 'Add / confirm a price in seconds',
    step3: 'Everyone saves money',
    contribTitle: 'Become a paliwowo contributor',
    contribBody:
      'Join early contributors and help build the most useful fuel-price community in Poland.',
    contribB1: 'Report prices from your local stations',
    contribB2: 'Improve data quality with quick corrections',
    contribB3: 'Help other drivers make better fuel decisions',
    contribCta: 'I want to contribute',
    ctaHeadline: 'Be first to know when paliwowo launches',
    ctaPlaceholder: 'Your email address',
    ctaButton: 'Notify me',
    ctaSuccess: "You're on the list! We'll notify you when paliwowo launches.",
    ctaPrivacy: 'No spam. Unsubscribe anytime.',
    soonSuffix: 'soon',
    footerTagline: 'Community-powered fuel prices for Poland.',
    footerCopy: '© paliwowo — coming soon',
  },
  pl: {
    heroTitle: 'Najlepsze ceny paliw w Twojej okolicy — za każdym razem.',
    heroSubtitle:
      'Porównuj ceny i rabaty na stacjach w Twoim zasięgu dzięki inteligentnym prognozom i kierowcom takim jak Ty, którzy szukają okazji i dzielą się nimi z innymi. Dołącz do nas i pomóż wszystkim oszczędzać.',
    heroTrust: 'Startujemy w Warszawie. Już wkrótce w całej Polsce.',
    heroCta1: 'Pobierz aplikację',
    heroCta2: 'Jak to działa',
    f1Title: 'Porównuj stacje w pobliżu',
    f1Body: 'Sprawdzaj ceny paliw dookoła i szybko znajdź korzystniejszą opcję.',
    f2Title: 'Uwzględniaj rabaty',
    f2Body: 'Porównuj realne ceny z programami lojalnościowymi i promocjami stacji.',
    f3Title: 'Szybkie raportowanie',
    f3Body: 'Dodawaj ceny przy minimalnej liczbie kroków, także w ruchu.',
    howTitle: 'Jak to działa',
    step1: 'Sprawdź ceny w pobliżu',
    step2: 'Dodaj / potwierdź cenę w kilka sekund',
    step3: 'Wszyscy oszczędzają',
    contribTitle: 'Zostań współtwórcą paliwowo',
    contribBody:
      'Dołącz do pierwszych współtwórców i pomóż budować najbardziej użyteczną społeczność paliwową w Polsce.',
    contribB1: 'Dodawaj ceny z lokalnych stacji',
    contribB2: 'Poprawiaj jakość danych szybkimi korektami',
    contribB3: 'Pomagaj kierowcom podejmować lepsze decyzje',
    contribCta: 'Chcę współtworzyć',
    ctaHeadline: 'Bądź pierwszy, gdy paliwowo wystartuje',
    ctaPlaceholder: 'Twój adres e-mail',
    ctaButton: 'Powiadom mnie',
    ctaSuccess: 'Jesteś na liście! Powiadomimy Cię gdy paliwowo wystartuje.',
    ctaPrivacy: 'Bez spamu. Możesz zrezygnować w dowolnym momencie.',
    soonSuffix: 'wkrótce',
    footerTagline: 'Ceny paliw tworzone przez społeczność kierowców.',
    footerCopy: '© paliwowo — wkrótce',
  },
  ua: {
    heroTitle: 'Найкраща ціна на пальне поруч із вами — щоразу.',
    heroSubtitle:
      'Ціни та знижки на станціях у вашому районі, підсилені розумними прогнозами та водіями, як ви, які шукають вигідні пропозиції й діляться ними з іншими. Долучайтеся й допоможіть усім економити.',
    heroTrust: 'Спершу стартуємо у Варшаві. Незабаром по всій Польщі.',
    heroCta1: 'Завантажити застосунок',
    heroCta2: 'Як це працює',
    f1Title: 'Порівнюйте станції поруч',
    f1Body: 'Переглядайте ціни на пальне поблизу й швидко знаходьте вигідніші пропозиції.',
    f2Title: 'Враховуйте знижки',
    f2Body: 'Порівнюйте реальні ціни з урахуванням програм лояльності та акцій мереж.',
    f3Title: 'Створено для швидких оновлень',
    f3Body: 'Додавайте ціни з мінімальними діями навіть у дорозі.',
    howTitle: 'Як це працює',
    step1: 'Перевіряйте ціни поруч',
    step2: 'Додавайте або підтверджуйте ціну за кілька секунд',
    step3: 'Усі економлять',
    contribTitle: 'Станьте співтворцем paliwowo',
    contribBody:
      'Долучайтеся до перших учасників і допоможіть створити найкориснішу паливну спільноту в Польщі.',
    contribB1: 'Додавайте ціни з локальних станцій',
    contribB2: 'Покращуйте дані швидкими виправленнями',
    contribB3: 'Допомагайте іншим водіям приймати вигідні рішення',
    contribCta: 'Хочу долучитися',
    ctaHeadline: 'Будьте першими, хто дізнається про запуск paliwowo',
    ctaPlaceholder: 'Ваша електронна адреса',
    ctaButton: 'Повідомте мене',
    ctaSuccess: 'Ви в списку! Повідомимо, щойно paliwowo запуститься.',
    ctaPrivacy: 'Без спаму. Можна відписатися будь-коли.',
    soonSuffix: 'незабаром',
    footerTagline: 'Ціни на пальне для Польщі, які створює спільнота.',
    footerCopy: '© paliwowo — невдовзі',
  },
} as const;

type Translations = (typeof T)[Lang];

// ─── useLanguage ──────────────────────────────────────────────────────────────
function useLanguage(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (isLang(saved)) {
      setLangState(saved);
      document.documentElement.lang = saved;
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1800);

    fetch('https://ipapi.co/json/', { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: { country_code?: string }) => {
        const detected: Lang =
          d?.country_code === 'PL' ? 'pl' : d?.country_code === 'UA' ? 'ua' : 'en';
        setLangState(detected);
        document.documentElement.lang = detected;
        localStorage.setItem('lang', detected);
      })
      .catch(() => {
        const browserLang = (navigator.language || '').toLowerCase();
        const fallback: Lang = browserLang.startsWith('pl')
          ? 'pl'
          : browserLang.startsWith('uk') || browserLang.startsWith('ua')
            ? 'ua'
            : 'en';
        setLangState(fallback);
        document.documentElement.lang = fallback;
        localStorage.setItem('lang', fallback);
      })
      .finally(() => clearTimeout(timer));

    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  return [lang, setLang];
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({
  lang,
  setLang,
  t,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--blue-500)]/30 bg-[var(--blue-900)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow-500)]"
        >
          <Image
            src="/paliwowo_logo.png"
            alt="paliwowo logo"
            width={54}
            height={54}
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-[var(--white)]">paliwowo</span>
        </a>

        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-0.5 rounded-xl border border-[var(--blue-500)]/40 bg-[var(--blue-700)]/50 p-1"
          >
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-lg px-3 py-1 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow-500)] ${
                  lang === l
                    ? 'bg-[var(--yellow-500)] text-[var(--blue-900)]'
                    : 'text-[var(--blue-300)] hover:text-[var(--white)]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {(['App Store', 'Google Play'] as const).map((s) => (
              <button
                key={s}
                disabled
                aria-disabled="true"
                className="cursor-not-allowed rounded-xl border border-[var(--blue-500)]/40 bg-[var(--blue-700)]/40 px-3 py-1.5 text-xs font-medium text-[var(--blue-300)] opacity-60"
              >
                {s}
                {s === 'Google Play' && ` (${t.soonSuffix})`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── PhoneMockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: '400px', paddingBottom: '80px' }}>
      {/* Second phone — behind, offset to bottom-right */}
      <div className="absolute left-24 top-20 z-0 w-[260px] opacity-70 sm:w-[280px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-[var(--blue-500)]/40 bg-[var(--blue-900)] shadow-xl">
          <div className="flex items-center justify-between bg-[var(--blue-900)] px-5 pb-1 pt-3">
            <span className="text-[10px] font-semibold text-[var(--blue-300)]">9:41</span>
            <div className="h-3 w-16 rounded-full bg-[var(--blue-700)]" />
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[var(--blue-300)]" />
              <div className="h-2 w-2 rounded-full bg-[var(--blue-300)]" />
            </div>
          </div>
          <div className="relative h-[480px] w-full overflow-hidden">
            <Image
              src="/paliwowo_app_screenshot_2.PNG"
              alt="paliwowo app second screen"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex justify-center bg-[var(--blue-900)] py-2">
            <div className="h-1 w-24 rounded-full bg-[var(--blue-500)]/60" />
          </div>
        </div>
      </div>

      {/* First phone — on top */}
      <div className="relative z-10 w-[260px] sm:w-[280px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-[var(--blue-500)]/60 bg-[var(--blue-900)] shadow-2xl">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-[var(--blue-900)] px-5 pb-1 pt-3">
            <span className="text-[10px] font-semibold text-[var(--blue-300)]">9:41</span>
            <div className="h-3 w-16 rounded-full bg-[var(--blue-700)]" />
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[var(--blue-300)]" />
              <div className="h-2 w-2 rounded-full bg-[var(--blue-300)]" />
            </div>
          </div>
          {/* Screenshot */}
          <div className="relative h-[480px] w-full overflow-hidden">
            <Image
              src="/paliwowo_app_screenshot_1.PNG"
              alt="paliwowo app showing nearby fuel prices"
              fill
              className="object-cover object-top"
            />
          </div>
          {/* Home indicator */}
          <div className="flex justify-center bg-[var(--blue-900)] py-2">
            <div className="h-1 w-24 rounded-full bg-[var(--blue-500)]/60" />
          </div>
        </div>
        {/* Floating price pill */}
        <div className="absolute -right-6 top-16 rounded-2xl border border-[var(--yellow-500)]/30 bg-[var(--blue-700)] px-3 py-2 shadow-lg">
          <p className="text-[10px] font-medium text-[var(--blue-300)]">Orlen</p>
          <p className="text-base font-bold text-[var(--yellow-500)]">6.89 zł</p>
        </div>
        {/* Floating discount badge */}
        <div className="absolute -left-6 bottom-24 rounded-2xl border border-[var(--blue-500)]/40 bg-[var(--blue-700)] px-3 py-2 shadow-lg">
          <p className="text-[10px] font-medium text-[var(--blue-300)]">Karta Żabki</p>
          <p className="text-sm font-bold text-green-400">−0.20 zł/l</p>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ t }: { t: Translations }) {
  return (
    <section id="hero" className="relative min-h-[85vh] overflow-hidden">
      <Image
        src="/paliwowo_background_image.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-900)]/95 via-[var(--blue-700)]/85 to-[var(--blue-500)]/60" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,28,64,0.75)_100%)]" />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--white)] sm:text-5xl lg:text-[3.25rem]">
            {t.heroTitle}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-[var(--blue-100)]/90">
            {t.heroSubtitle}
          </p>
          <p className="text-sm font-semibold text-[var(--yellow-300)]">{t.heroTrust}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#cta"
              className="rounded-2xl bg-[var(--yellow-500)] px-6 py-3 text-sm font-bold text-[var(--blue-900)] transition-all duration-150 hover:bg-[var(--yellow-300)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--blue-900)]"
            >
              {t.heroCta1}
            </a>
            <a
              href="#how"
              className="rounded-2xl border border-[var(--blue-100)]/30 bg-[var(--white)]/10 px-6 py-3 text-sm font-bold text-[var(--white)] backdrop-blur-sm transition-all duration-150 hover:bg-[var(--white)]/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--blue-900)]"
            >
              {t.heroCta2}
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const ICONS = [MapPinIcon, PercentIcon, ZapIcon];

function Features({ t }: { t: Translations }) {
  const cards = [
    { title: t.f1Title, body: t.f1Body },
    { title: t.f2Title, body: t.f2Body },
    { title: t.f3Title, body: t.f3Body },
  ];
  return (
    <section id="features" className="bg-[var(--blue-900)] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={i}
                className="rounded-2xl border border-[var(--blue-500)]/30 bg-[var(--blue-700)]/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--blue-500)]/60 hover:shadow-xl hover:shadow-[var(--blue-900)]/50"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--yellow-500)]/15 text-[var(--yellow-500)]">
                  <Icon />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[var(--white)]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--blue-300)]">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── HowItWorks ───────────────────────────────────────────────────────────────
function HowItWorks({ t }: { t: Translations }) {
  const steps = [t.step1, t.step2, t.step3];
  return (
    <section id="how" className="bg-[var(--blue-700)] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-[var(--white)]">{t.howTitle}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--yellow-500)] text-xl font-extrabold text-[var(--yellow-500)]">
                {i + 1}
              </div>
              <p className="text-base font-medium text-[var(--blue-100)]">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contributor ──────────────────────────────────────────────────────────────
function Contributor({ t }: { t: Translations }) {
  return (
    <section id="contribute" className="bg-[var(--blue-900)] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-[var(--blue-500)]/30 bg-[var(--blue-700)]/40">
          <div className="h-1.5 w-full bg-[var(--yellow-500)]" />
          <div className="p-8 sm:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[var(--white)] sm:text-3xl">
              {t.contribTitle}
            </h2>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-[var(--blue-100)]/80">
              {t.contribBody}
            </p>
            <ul className="mb-8 space-y-3">
              {[t.contribB1, t.contribB2, t.contribB3].map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--yellow-500)]/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow-500)]" />
                  </span>
                  <span className="text-sm text-[var(--blue-100)]">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className="inline-block rounded-2xl bg-[var(--yellow-500)] px-6 py-3 text-sm font-bold text-[var(--blue-900)] transition-all duration-150 hover:bg-[var(--yellow-300)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--blue-700)]"
            >
              {t.contribCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FinalCTA ─────────────────────────────────────────────────────────────────
function FinalCTA({
  t,
  email,
  setEmail,
  submitted,
  setSubmitted,
}: {
  t: Translations;
  email: string;
  setEmail: (v: string) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  return (
    <section id="cta" className="bg-[var(--blue-700)] py-24">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <h2 className="mb-2 text-3xl font-bold text-[var(--white)] sm:text-4xl">
          {t.ctaHeadline}
        </h2>
        {submitted ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-4">
            <p className="text-sm font-medium text-green-300">{t.ctaSuccess}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder={t.ctaPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-2xl border border-[var(--blue-500)]/50 bg-[var(--blue-900)]/60 px-4 py-3 text-sm text-[var(--white)] placeholder-[var(--blue-300)] focus:border-[var(--yellow-500)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow-500)]/30"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[var(--yellow-500)] px-6 py-3 text-sm font-bold text-[var(--blue-900)] transition-all duration-150 hover:bg-[var(--yellow-300)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow-500)]"
            >
              {t.ctaButton}
            </button>
          </form>
        )}
        <p className="mt-4 text-xs text-[var(--blue-300)]">{t.ctaPrivacy}</p>
        <div className="mt-10 flex justify-center gap-3">
          {(['App Store', 'Google Play'] as const).map((s) => (
            <button
              key={s}
              disabled
              aria-disabled="true"
              className="cursor-not-allowed rounded-2xl border border-[var(--blue-500)]/40 bg-[var(--blue-900)]/60 px-5 py-2.5 text-sm font-medium text-[var(--blue-300)] opacity-60"
            >
              {s} ({t.soonSuffix})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ t }: { t: Translations }) {
  return (
    <footer className="border-t border-[var(--blue-500)]/20 bg-[var(--blue-900)] py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/paliwowo_logo.png"
            alt="paliwowo"
            width={32}
            height={32}
            className="rounded-lg opacity-80"
          />
          <span className="text-sm font-bold text-[var(--blue-100)]">paliwowo</span>
        </div>
        <p className="text-sm text-[var(--blue-300)]">{t.footerTagline}</p>
        <p className="text-xs text-[var(--gray-medium)]">{t.footerCopy}</p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const t = T[lang];

  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Features t={t} />
        <HowItWorks t={t} />
        <Contributor t={t} />
        <FinalCTA
          t={t}
          email={email}
          setEmail={setEmail}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      </main>
      <Footer t={t} />
    </>
  );
}
