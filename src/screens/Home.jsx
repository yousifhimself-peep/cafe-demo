import { useStore } from '../store';
import { go } from '../router';
import { cafe, categories, menu } from '../data/menu';
import { Money, ProductArt, Wordmark, asset, catIcon, itemCount, PausedBanner, SoldOut } from '../components/ui';
import { MagnifyingGlass, MapPin, Clock, Phone, Storefront, Moped, CaretDown, Plus, ArrowRight, Globe, Coffee, InstagramLogo } from '../components/icons';
import { useState } from 'react';
import ModeSheet from '../components/ModeSheet';

// Open/closed from the hours in the café's "Working hours" highlight.
export function openStatus(now = new Date()) {
  const { open, close } = cafe.hours(now.getDay());
  const h = now.getHours() + now.getMinutes() / 60;
  return { isOpen: h >= open && h < close, open, close };
}
const fmtHour = (h, ar) => {
  const hr = h % 12 || 12;
  const pm = h % 24 >= 12;
  return ar ? `${hr} ${pm ? 'م' : 'ص'}` : `${hr} ${pm ? 'PM' : 'AM'}`;
};

// Categories without a photo get a plain brand-colour tile.
const categoryPhoto = { hot: 'menu/_hot.jpg', cold: 'menu/_cold.jpg', bakery: 'menu/_bakery.jpg', dessert: 'menu/_dessert.jpg' };

export default function Home() {
  const { t, ar, setLang, mode, setSheet, isAvailable } = useStore();
  const [modeOpen, setModeOpen] = useState(false);
  const status = openStatus();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('Good morning', 'صباح الخير') : hour < 18 ? t('Good afternoon', 'مساء الخير') : t('Good evening', 'مساء الخير');
  const featured = menu.filter((p) => p.featured).sort((a, b) => !!b.photo - !!a.photo);

  return (
    <div className="pb-40">
      {/* Header */}
      <header className="staff-lines relative overflow-hidden rounded-b-[32px] bg-forest px-5 pb-6 pt-[max(env(safe-area-inset-top),16px)] text-cream">
        <div className="flex items-center justify-between">
          <Wordmark light className="h-8 w-auto" />
          <button onClick={() => setLang(ar ? 'en' : 'ar')} className="flex h-9 items-center gap-1.5 rounded-full bg-cream/10 px-3 text-sm font-medium active:scale-95" aria-label={t('Switch to Arabic', 'Switch to English')}>
            <Globe size={16} /> {ar ? 'EN' : 'عربي'}
          </button>
        </div>

        <button onClick={() => setModeOpen(true)} className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-cream/10 p-3 text-start active:scale-[.99]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream text-forest">
            {mode === 'pickup' ? <Storefront size={20} weight="fill" /> : <Moped size={20} weight="fill" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] uppercase tracking-wider text-cream/60">{mode === 'pickup' ? t('Pickup from', 'الاستلام من') : t('Deliver to', 'التوصيل إلى')}</span>
            <span className="block truncate text-[15px] font-medium">
              {mode === 'pickup' ? t(cafe.address.en, cafe.address.ar) : t('Home · sample address', 'المنزل · عنوان تجريبي')}
            </span>
          </span>
          <CaretDown size={18} className="shrink-0 text-cream/70" />
        </button>

        <p className="mt-6 text-sm text-cream/70">{greeting} 🤎</p>
        <h1 className="mt-1 text-[28px] font-semibold leading-tight">{t('What are you craving today?', 'وش مزاجك اليوم؟')}</h1>

        <button onClick={() => go('menu?search=1')} className="mt-5 flex h-12 w-full items-center gap-3 rounded-2xl bg-cream px-4 text-start text-[15px] text-ink/45 shadow-lg">
          <MagnifyingGlass size={20} className="text-forest" />
          {t('Search latte, matcha, cookies…', 'ابحث: لاتيه، ماتشا، كوكيز…')}
        </button>
      </header>

      {/* Open status */}
      <div className="mx-5 -mt-0 mt-4 flex items-center gap-2 text-sm">
        <span className={'h-2 w-2 rounded-full ' + (status.isOpen ? 'bg-leaf' : 'bg-wine')} />
        <span className="font-medium">{status.isOpen ? t('Open now', 'مفتوح الآن') : t('Closed now', 'مغلق الآن')}</span>
        <span className="text-ink/50">
          · {status.isOpen ? t(`until ${fmtHour(status.close, false)}`, `حتى ${fmtHour(status.close, true)}`) : t(`opens ${fmtHour(status.open, false)}`, `يفتح ${fmtHour(status.open, true)}`)}
        </span>
      </div>

      <PausedBanner className="mx-5 mt-3" />

      {/* Hero */}
      <section className="mx-5 mt-4">
        <button onClick={() => go('menu')} className="relative block h-56 w-full overflow-hidden rounded-[28px] text-start">
          <img src={asset('assets/menu/_hero.jpg')} alt={t('Espresso in the sunlight', 'اسبريسو تحت الشمس')} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
            <p className="text-2xl font-semibold">{t('Ready when you are 🤎', 'جاهزة وقت ما توصل 🤎')}</p>
            <p className="mt-1 text-sm text-cream/80">{t('Order ahead and skip the wait.', 'اطلب مسبقًا واستلم طلبك بدون انتظار.')}</p>
          </div>
        </button>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <div className="flex items-end justify-between px-5">
          <h2 className="text-lg font-semibold">{t('Browse the menu', 'تصفح المنيو')}</h2>
          <button onClick={() => go('menu')} className="flex items-center gap-1 text-sm font-medium text-wine">
            {t('See all', 'عرض الكل')} <ArrowRight size={14} className="rtl:-scale-x-100" />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 px-5">
          {categories.map((c) => {
            const Icon = catIcon[c.id];
            const n = menu.filter((p) => p.category === c.id).length;
            return (
              <button key={c.id} onClick={() => go('menu?c=' + c.id)} className="group relative h-28 overflow-hidden rounded-3xl text-start active:scale-[.98]">
                {categoryPhoto[c.id] ? (
                  <img src={asset('assets/' + categoryPhoto[c.id])} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="staff-lines absolute inset-0 bg-wine"><Icon size={96} weight="thin" className="absolute -end-3 -top-3 text-cream/25 transition duration-500 group-hover:scale-105" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/5" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5 text-cream">
                  <span>
                    <span className="block text-[15px] font-semibold leading-tight">{t(c.en, c.ar)}</span>
                    <span className="text-[11px] text-cream/70">{itemCount(n, ar)}</span>
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/20 backdrop-blur"><Icon size={16} /></span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mt-8">
        <div className="px-5">
          <h2 className="text-lg font-semibold">{t('Our picks', 'اختياراتنا')}</h2>
          <p className="text-xs text-ink/50">{t('A few highlights from the menu', 'مختارات من المنيو')}</p>
        </div>
        <div className="no-scrollbar mt-3 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2">
          {featured.map((p) => (
            <article key={p.id} className="w-40 shrink-0 snap-start">
              <button onClick={() => setSheet(p.id)} className="block w-full text-start">
                <ProductArt product={p} className="h-44 w-40 rounded-3xl" />
                <h3 className="mt-2 flex items-center gap-1.5 text-[15px] font-medium"><span className="truncate">{t(p.en, p.ar)}</span>{!isAvailable(p.id) && <SoldOut />}</h3>
              </button>
              <div className="mt-0.5 flex items-center justify-between">
                <Money value={p.price} className="text-sm font-semibold text-wine" />
                <button onClick={() => setSheet(p.id)} disabled={!isAvailable(p.id)} aria-label={t('Add ' + p.en, 'أضف ' + p.ar)} className="disabled:invisible grid h-8 w-8 place-items-center rounded-full bg-forest text-cream active:scale-90">
                  <Plus size={16} weight="bold" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Loyalty (the café has a loyalty card; the in-app version is a concept) */}
      <section className="mx-5 mt-8 overflow-hidden rounded-3xl bg-wine p-5 text-cream">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-cream/60">{t('Loyalty card', 'بطاقة الولاء')}</p>
            <h2 className="mt-1 text-lg font-semibold">{t('Every cup counts', 'كل كوب يفرق')}</h2>
          </div>
          <span className="rounded-full border border-cream/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream/80">{t('Concept', 'فكرة')}</span>
        </div>
        <div className="mt-4 flex gap-2" aria-label={t('3 of 8 stamps (example)', '٣ من ٨ أختام (مثال)')}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={'grid aspect-square flex-1 place-items-center rounded-full border ' + (i < 3 ? 'border-cream bg-cream text-wine' : 'border-cream/30 text-cream/30')}>
              <Coffee size={14} weight={i < 3 ? 'fill' : 'regular'} />
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-cream/70">{t('Your stamps, right in the app — no card to carry. Reward rules to be set by the café.', 'أختامك داخل التطبيق بدون بطاقة. شروط المكافأة يحددها الكافيه.')}</p>
      </section>

      {/* Visit */}
      <section className="mx-5 mt-4 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">{t('Visit us', 'زورونا')}</h2>
        <ul className="mt-3 space-y-3 text-sm">
          <li className="flex gap-3"><MapPin size={20} className="shrink-0 text-wine" /><span>{t(cafe.address.en, cafe.address.ar)}<span className="block text-xs text-ink/50">{t(cafe.city.en, cafe.city.ar)}</span></span></li>
          <li className="flex gap-3"><Clock size={20} className="shrink-0 text-wine" /><span>{t('Sat–Thu · 6 AM – 12 AM', 'السبت – الخميس · ٦ص – ١٢م')}<span className="block">{t('Friday · 8 AM – 12 AM', 'الجمعة · ٨ص – ١٢م')}</span></span></li>
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={'tel:' + cafe.phone} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-paper text-sm font-medium text-forest"><Phone size={18} />{t('Call', 'اتصال')}</a>
          <a href={cafe.instagram} onClick={(e) => e.preventDefault()} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-paper text-sm font-medium text-forest"><InstagramLogo size={18} />Instagram</a>
        </div>
      </section>

      <p className="mx-5 mt-6 text-center text-[11px] leading-relaxed text-ink/40">
        {t('Design preview · sample menu & prices · orders are simulated', 'معاينة تصميم · منيو وأسعار تجريبية · الطلبات محاكاة')}
      </p>

      {modeOpen && <ModeSheet onClose={() => setModeOpen(false)} />}
    </div>
  );
}
