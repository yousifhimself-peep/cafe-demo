import { useState } from 'react';
import { useAdmin } from './AdminApp';
import { categories } from '../data/menu';
import { menu } from './data';
import { MagnifyingGlass, Info, ArrowCounterClockwise } from '@phosphor-icons/react';

export default function MenuAdmin() {
  const { t, availability, setAvailability } = useAdmin();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const isOn = (id) => availability[id] !== false;
  const toggle = (id) => setAvailability((a) => {
    const next = { ...a };
    if (next[id] === false) delete next[id]; else next[id] = false;
    return next;
  });
  const soldOut = menu.filter((p) => !isOn(p.id));
  const query = q.trim().toLowerCase();
  const list = menu.filter((p) => (cat === 'all' || p.category === cat) && (p.en + ' ' + p.ar).toLowerCase().includes(query));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{t('Menu & stock', 'المنيو والتوفر')}</h1>
          <p className="mt-1 text-sm text-ink/55">{t('Switch an item off when it runs out — customers see “Sold out” right away.', 'أوقف الصنف لما يخلص — يظهر للعملاء “نفد” مباشرة.')}</p>
        </div>
        {soldOut.length > 0 && (
          <button onClick={() => setAvailability({})} className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-forest shadow-sm hover:bg-paper-2">
            <ArrowCounterClockwise size={17} /> {t(`Restock all (${soldOut.length})`, `إرجاع الكل (${soldOut.length})`)}
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-forest/30">
          <MagnifyingGlass size={18} className="text-forest" />
          <span className="sr-only">{t('Search items', 'ابحث عن صنف')}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search items', 'ابحث عن صنف')} className="min-w-0 flex-1 bg-transparent outline-none" />
        </label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {[{ id: 'all', en: 'All', ar: 'الكل' }, ...categories].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
              className={'h-11 shrink-0 rounded-xl px-4 text-sm font-medium ' + (cat === c.id ? 'bg-forest text-cream' : 'bg-white text-ink/70 shadow-sm')}>{t(c.en, c.ar)}</button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-paper-2/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">{t('Item', 'الصنف')}</th>
              <th className="hidden px-4 py-3 text-start font-semibold sm:table-cell">{t('Category', 'القسم')}</th>
              <th className="px-4 py-3 text-end font-semibold">{t('Price', 'السعر')}</th>
              <th className="px-4 py-3 text-end font-semibold">{t('Available', 'متوفر')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {list.map((p) => {
              const on = isOn(p.id);
              const c = categories.find((x) => x.id === p.category);
              return (
                <tr key={p.id} className={on ? '' : 'bg-wine/[0.03]'}>
                  <td className="px-4 py-3">
                    <span className={'block font-medium ' + (on ? '' : 'text-ink/50 line-through decoration-wine/40')}>{t(p.en, p.ar)}</span>
                    <span className="font-ar text-xs text-ink/45">{t(p.ar, p.en)}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-ink/60 sm:table-cell">{t(c.en, c.ar)}</td>
                  <td className="px-4 py-3 text-end tabular-nums">{p.sizes ? p.sizes.map((s) => s.price).join(' / ') : p.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {!on && <span className="hidden text-xs font-semibold uppercase tracking-wider text-wine sm:inline">{t('Sold out', 'نفد')}</span>}
                      <button role="switch" aria-checked={on} aria-label={t(`${p.en} available`, `${p.ar} متوفر`)} onClick={() => toggle(p.id)}
                        className={'relative h-7 w-12 shrink-0 rounded-full transition ' + (on ? 'bg-forest' : 'bg-ink/20')}>
                        <span className={'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ' + (on ? 'start-6' : 'start-1')} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!list.length && <p className="p-10 text-center text-sm text-ink/50">{t('No items match your search.', 'لا توجد أصناف مطابقة.')}</p>}
      </div>

      <p className="mt-4 flex gap-2 text-xs text-ink/50">
        <Info size={15} className="mt-px shrink-0" />
        {t('Sample prices in Saudi Riyal. Editing prices, photos and new items would come in the full build.', 'أسعار تجريبية بالريال السعودي. تعديل الأسعار والصور وإضافة أصناف ضمن النسخة الكاملة.')}
      </p>
    </div>
  );
}
