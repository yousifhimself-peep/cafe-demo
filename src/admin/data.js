// Admin / Staff Portal data helpers.
// Real orders come from the customer app (KEYS.orders). Sample orders are generated
// so the board and reports look alive in a demo; they are always labelled "Sample".
import { menu, byId, sampleOptions } from '../data/menu';
import { unitPrice } from '../store';
import { read, write } from '../shared/storage';

export const SAMPLES_KEY = 'cafe-staff-samples';
export const STATUSES = ['new', 'preparing', 'ready', 'completed'];

// Small seeded RNG so the sample data is stable between reloads.
function rng(seed) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

const popular = ['spanish', 'iced-matcha', 'todays-hot', 'latte', 'wattar', 'cookies', 'pistachio', 'cappuccino', 'halloumi', 'v60', 'kunafa', 'iced-latte', 'flat-white', 'tiramisu', 'cold-brew'];

export function makeSamples(now = Date.now()) {
  const r = rng(20260925);
  const orders = [];
  const pick = () => byId[popular[Math.floor(Math.pow(r(), 1.6) * popular.length)]];
  const make = (at, status, i) => {
    const lines = [];
    const n = 1 + Math.floor(r() * 3);
    for (let k = 0; k < n; k++) {
      const p = pick();
      const choice = {};
      if (p.sizes) choice.size = r() > 0.5 ? 'large' : 'small';
      if (p.options?.includes('milk')) choice.milk = r() > 0.8 ? 'oat' : 'regular';
      if (p.options?.includes('ice')) choice.ice = r() > 0.85 ? 'light' : 'regular';
      if (p.options?.includes('shot')) choice.shot = r() > 0.85;
      if (lines.some((l) => l.id === p.id)) continue;
      const qty = r() > 0.8 ? 2 : 1;
      lines.push({ key: p.id + k, id: p.id, choice, qty, unit: unitPrice(p, choice) });
    }
    const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    const roll = r();
    const mode = roll > 0.8 ? 'delivery' : 'pickup';
    const fee = mode === 'delivery' ? 8 : 0;
    return {
      id: 'A-' + (2100 + i), at, lines, subtotal, fee, total: subtotal + fee, mode, status, sample: true,
      pay: ['applepay', 'mada', 'cash'][Math.floor(r() * 3)], when: 'asap',
      curbside: mode === 'pickup' && roll > 0.55 ? ['White Camry · 4821', 'Black Tahoe · 1190', 'Grey Accent · 7734'][Math.floor(r() * 3)] : null,
      table: mode === 'pickup' && roll < 0.25 ? String(1 + Math.floor(roll * 48)) : null,
      address: mode === 'delivery' ? 'Sample address' : null,
      note: r() > 0.85 ? ['Less sugar please', 'Extra hot', 'No ice in one of them'][Math.floor(r() * 3)] : '',
    };
  };

  // History across the last 24 hours, only inside opening hours (6 AM – midnight).
  let i = 0;
  for (let m = 24 * 60; m > 40; m -= 9 + Math.floor(r() * 28)) {
    const at = now - m * 60000;
    const h = new Date(at).getHours();
    if (h < 6) continue;
    orders.push(make(at, r() > 0.04 ? 'completed' : 'cancelled', i++));
  }
  // A few live ones so every column of the board has something in it.
  [[31, 'ready'], [18, 'preparing'], [9, 'preparing'], [4, 'new'], [1, 'new']].forEach(([min, status]) => orders.push(make(now - min * 60000, status, i++)));
  return orders.reverse();
}

export function loadSamples() {
  let s = read(SAMPLES_KEY, null);
  if (!s) { s = makeSamples(); write(SAMPLES_KEY, s); }
  return s;
}

export function describe(line, t) {
  const p = byId[line.id];
  if (!p) return '';
  const parts = [];
  const size = p.sizes?.find((s) => s.id === line.choice?.size);
  if (size) parts.push(t(size.en, size.ar));
  const milk = sampleOptions.milk.choices.find((c) => c.id === line.choice?.milk);
  if (milk && milk.id !== 'regular') parts.push(t(milk.en + ' milk', 'حليب ' + milk.ar));
  if (line.choice?.ice === 'light') parts.push(t('Light ice', 'ثلج خفيف'));
  if (line.choice?.shot) parts.push(t('Extra shot', 'شوت إضافي'));
  for (const g of ['addons', 'remove']) {
    for (const id of line.choice?.[g] || []) {
      const c = sampleOptions[g].choices.find((x) => x.id === id);
      if (c) parts.push(g === 'addons' ? t('+ ' + c.en, '+ ' + c.ar) : t(c.en, c.ar));
    }
  }
  return parts.join(' · ');
}

export const payLabel = (pay, mode, t) => ({
  applepay: 'Apple Pay',
  mada: t('mada / card', 'مدى / بطاقة'),
  cash: mode === 'pickup' ? t('Pay at café', 'الدفع بالكافيه') : t('Cash on delivery', 'الدفع عند الاستلام'),
}[pay] || '—');

export function ago(at, now, t) {
  const m = Math.max(0, Math.round((now - at) / 60000));
  if (m < 1) return t('just now', 'الآن');
  if (m < 60) return t(`${m} min ago`, `قبل ${m} د`);
  const h = Math.floor(m / 60);
  return t(`${h} h ago`, `قبل ${h} س`);
}

export { menu, byId };
