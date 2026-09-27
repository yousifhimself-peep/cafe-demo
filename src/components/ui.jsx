import { Coffee, Snowflake, BreadIcon, Cake, ArrowLeft, Minus, Plus, Trash } from './icons';
import { useStore } from '../store';

export const catIcon = { hot: Coffee, cold: Snowflake, bakery: BreadIcon, dessert: Cake };

// "3 أصناف" / "15 صنفًا" / "1 item" / "2 items"
export const itemCount = (n, ar) => (ar ? (n === 1 ? 'صنف واحد' : n === 2 ? 'صنفان' : n <= 10 ? `${n} أصناف` : `${n} صنفًا`) : `${n} ${n === 1 ? 'item' : 'items'}`);

// Public files (photos) resolved against Vite's base, so the build also works from a sub-path like GitHub Pages.
export const asset = (path) => import.meta.env.BASE_URL + path;

export function Money({ value, className = '' }) {
  const { t, ar } = useStore();
  // New Saudi Riyal sign (U+20C1, open-source Saudi Riyal font). It sits to the left of the number in
  // both languages, so it comes after the number in RTL source order.
  const sign = <span className="riyal" aria-label={t('SAR', 'ريال')}>{'\u20C1'}</span>;
  return (
    <span className={'tabular-nums whitespace-nowrap ' + className}>
      {ar ? <>{value}&nbsp;{sign}</> : <>{sign}&nbsp;{value}</>}
    </span>
  );
}

// Unbranded placeholder mark (cup + "CAFÉ") until the café's own logo is dropped in.
export function Wordmark({ className = '', light = false }) {
  return (
    <svg viewBox="0 0 132 40" role="img" aria-label="Café" direction="ltr" style={{ direction: 'ltr' }} className={className + (light ? ' text-cream' : ' text-forest')}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 15h22v9a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9z" />
        <path d="M27 18h2.5a4 4 0 0 1 0 8H27" />
        <path d="M12 5c-1.5 2 1.5 3 0 6M19 5c-1.5 2 1.5 3 0 6" />
      </g>
      <text x="44" y="29" fill="currentColor" fontFamily="Outfit Variable, sans-serif" fontSize="22" fontWeight="500" letterSpacing="5">CAFÉ</text>
    </svg>
  );
}

// Café photo, or a typographic tile when the café hasn't supplied one.
export function ProductArt({ product, size = 'md', className = '' }) {
  const { t } = useStore();
  const Icon = catIcon[product.category];
  if (product.photo) {
    // The shimmer sits underneath; the photo simply paints over it once decoded
    // (no load-event bookkeeping, which could miss lazily loaded images).
    return (
      <div className={'relative overflow-hidden bg-paper-2 ' + className}>
        <div className="absolute inset-0 shimmer" />
        <img
          src={asset('assets/' + (size === 'lg' ? product.photo : product.photo.replace('menu/', 'menu/thumbs/')))}
          alt={t(product.en, product.ar)}
          className="relative h-full w-full object-cover"
        />
      </div>
    );
  }
  if (size !== 'lg') {
    // Light tile for lists: paper background, category-coloured line icon.
    const accent = { hot: 'text-wine', cold: 'text-forest', bakery: 'text-[#9a7b4f]', dessert: 'text-wine-2' }[product.category];
    return (
      <div className={'relative flex items-center justify-center overflow-hidden bg-paper-2 ' + accent + ' ' + className}>
        <StaffLines />
        <div className="relative flex flex-col items-center gap-1 px-2 text-center">
          <Icon size={size === 'sm' ? 24 : 34} weight="thin" />
          {size === 'md' && <span className="font-ar text-[13px] leading-tight text-ink/60">{product.ar}</span>}
        </div>
      </div>
    );
  }
  const tone = {
    hot: 'bg-wine text-cream',
    cold: 'bg-forest text-cream',
    bakery: 'bg-sand text-ink',
    dessert: 'bg-rose text-wine',
  }[product.category];
  return (
    <div className={'relative flex items-center justify-center overflow-hidden ' + tone + ' ' + className}>
      <StaffLines />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <Icon size={54} weight="thin" />
        <span className="font-ar text-3xl leading-tight">{product.ar}</span>
        <span className="text-[11px] uppercase tracking-[0.25em] opacity-70">{t('Photo coming soon', 'الصورة قريبًا')}</span>
      </div>
    </div>
  );
}

function StaffLines() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {[18, 30, 42, 54].map((y) => (
        <path key={y} d={`M-5 ${y} C 25 ${y - 10}, 60 ${y + 14}, 105 ${y - 2}`} fill="none" stroke="currentColor" strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export function Stepper({ value, onChange, min = 0, small = false }) {
  const { t } = useStore();
  const s = small ? 'h-8 w-8' : 'h-11 w-11';
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-paper-2 p-1">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={t('Decrease', 'تقليل')}
        className={s + ' grid place-items-center rounded-full bg-white text-forest shadow-sm transition active:scale-90 disabled:opacity-40'}
      >
        {value === 1 && min === 0 ? <Trash size={small ? 15 : 18} /> : <Minus size={small ? 15 : 18} weight="bold" />}
      </button>
      <span className={'min-w-7 text-center font-semibold tabular-nums ' + (small ? 'text-sm' : 'text-base')} aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={t('Increase', 'زيادة')}
        className={s + ' grid place-items-center rounded-full bg-forest text-cream shadow-sm transition active:scale-90'}
      >
        <Plus size={small ? 15 : 18} weight="bold" />
      </button>
    </div>
  );
}

export function TopBar({ title, onBack, right }) {
  const { t } = useStore();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 bg-paper/90 px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)] backdrop-blur-md">
      {onBack && (
        <button onClick={onBack} aria-label={t('Back', 'رجوع')} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm active:scale-95">
          <ArrowLeft size={20} className="rtl:-scale-x-100" />
        </button>
      )}
      <h1 className="flex-1 text-lg font-semibold">{title}</h1>
      {right}
    </header>
  );
}

export function Empty({ icon: Icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center px-8 py-16 text-center">
      <div className="relative mb-6 grid h-28 w-28 place-items-center rounded-full bg-paper-2">
        <Icon size={46} weight="thin" className="text-forest" />
        <span className="absolute -end-1 top-3 h-3 w-3 rounded-full bg-wine" />
      </div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-64 text-sm leading-relaxed text-ink/60">{body}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}

export function SampleTag({ children }) {
  const { t } = useStore();
  return (
    <span className="inline-flex items-center rounded-full border border-wine/25 bg-wine/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-wine">
      {children || t('Sample', 'تجريبي')}
    </span>
  );
}

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={'flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 text-[15px] font-semibold text-cream shadow-[0_10px_24px_-12px_rgba(35,60,49,.8)] transition active:scale-[0.98] disabled:opacity-60 ' + className}
    >
      {children}
    </button>
  );
}

export function PausedBanner({ className = '' }) {
  const { t, paused } = useStore();
  if (!paused) return null;
  return (
    <div role="status" className={'flex items-start gap-3 rounded-2xl bg-wine px-4 py-3 text-sm text-cream ' + className}>
      <span className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-cream" />
      <span><strong>{t('Online ordering is paused', 'الطلب أونلاين متوقف مؤقتًا')}</strong><br />
        <span className="text-cream/80">{t('The café is catching up — you can browse and order again shortly.', 'الكافيه مشغول حاليًا — تقدر تتصفح وتطلب بعد شوي.')}</span></span>
    </div>
  );
}

export function SoldOut() {
  const { t } = useStore();
  return <span className="rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream">{t('Sold out', 'نفد')}</span>;
}

export function Skeleton({ className = '' }) {
  return <div className={'shimmer rounded-xl ' + className} />;
}
