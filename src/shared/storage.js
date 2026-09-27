// localStorage shared by the customer app and the Admin / Staff Portal (same origin).
// Demo only: a real build would replace this with a backend + realtime updates.
import { useEffect, useState } from 'react';

export const KEYS = {
  orders: 'cafe-orders',             // orders placed in the customer app (+ `status` set by staff)
  availability: 'cafe-availability', // { [productId]: false } for sold-out items
  store: 'cafe-store',               // { paused: boolean, prep: 'normal' | 'busy' | 'very-busy' }
};

export const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  window.dispatchEvent(new CustomEvent('cafe-storage', { detail: key })); // same-tab listeners
};

// State bound to a localStorage key; stays in sync across tabs (customer ↔ staff).
export function useShared(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));
  useEffect(() => {
    const sync = (e) => {
      const k = e.type === 'storage' ? e.key : e.detail;
      if (k === key || k === null) setValue(read(key, fallback));
    };
    window.addEventListener('storage', sync);
    window.addEventListener('cafe-storage', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('cafe-storage', sync); };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const set = (next) => {
    const v = typeof next === 'function' ? next(read(key, fallback)) : next;
    write(key, v);
    setValue(v);
  };
  return [value, set];
}

export const prepEstimates = {
  normal: { en: 'About 10–15 min', ar: 'تقريبًا ١٠–١٥ دقيقة' },
  busy: { en: 'About 20–30 min', ar: 'تقريبًا ٢٠–٣٠ دقيقة' },
  'very-busy': { en: 'About 30–45 min', ar: 'تقريبًا ٣٠–٤٥ دقيقة' },
};
