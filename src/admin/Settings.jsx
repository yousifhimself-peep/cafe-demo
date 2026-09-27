import { useState } from 'react';
import { useAdmin } from './AdminApp';
import { makeSamples } from './data';
import { prepEstimates } from '../shared/storage';
import { Pause, Play, Clock, Timer, Users, ArrowCounterClockwise, Info } from '@phosphor-icons/react';

export default function Settings() {
  const { t, ar, store, setStore, setSamples, setAvailability, setAppOrders } = useAdmin();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const paused = !!store.paused;
  const prep = store.prep || 'normal';

  const reset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    setSamples(makeSamples());
    setAvailability({});
    setStore({});
    setAppOrders((list) => list.map(({ status, updatedAt, ...o }) => o)); // eslint-disable-line no-unused-vars
    setConfirmReset(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t('Store settings', 'إعدادات المتجر')}</h1>
      <p className="mt-1 text-sm text-ink/55">{t('Changes apply to the customer app immediately.', 'التغييرات تنطبق على تطبيق العملاء فورًا.')}</p>

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className={'grid h-12 w-12 shrink-0 place-items-center rounded-xl ' + (paused ? 'bg-wine text-cream' : 'bg-forest text-cream')}>
            {paused ? <Pause size={24} weight="fill" /> : <Play size={24} weight="fill" />}
          </span>
          <div className="flex-1">
            <h2 className="font-semibold">{t('Accept online orders', 'استقبال الطلبات أونلاين')}</h2>
            <p className="text-sm text-ink/55">{paused ? t('Paused — customers can browse but not check out.', 'متوقف — العملاء يتصفحون فقط بدون طلب.') : t('On — customers can order ahead.', 'مفعّل — العملاء يقدرون يطلبون.')}</p>
          </div>
          <button role="switch" aria-checked={!paused} aria-label={t('Accept online orders', 'استقبال الطلبات أونلاين')} onClick={() => setStore((s) => ({ ...s, paused: !s.paused }))}
            className={'relative h-8 w-14 shrink-0 rounded-full transition ' + (!paused ? 'bg-forest' : 'bg-ink/20')}>
            <span className={'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ' + (!paused ? 'start-7' : 'start-1')} />
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold"><Timer size={20} className="text-forest" />{t('How busy are we?', 'مستوى الضغط')}</h2>
        <p className="text-sm text-ink/55">{t('Sets the pickup estimate customers see at checkout.', 'يحدد وقت الاستلام المتوقع اللي يشوفه العميل.')}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3" role="radiogroup">
          {[['normal', t('Normal', 'عادي')], ['busy', t('Busy', 'مشغول')], ['very-busy', t('Very busy', 'مشغول جدًا')]].map(([id, label]) => (
            <button key={id} role="radio" aria-checked={prep === id} onClick={() => setStore((s) => ({ ...s, prep: id }))}
              className={'rounded-xl border-2 p-3 text-start transition ' + (prep === id ? 'border-forest bg-forest/5' : 'border-ink/10 hover:bg-paper')}>
              <span className="block font-semibold">{label}</span>
              <span className="text-xs text-ink/55">{ar ? prepEstimates[id].ar : prepEstimates[id].en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold"><Clock size={20} className="text-forest" />{t('Opening hours', 'ساعات العمل')}</h2>
        <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-ink/60">{t('Saturday – Thursday', 'السبت – الخميس')}</dt><dd className="text-end font-medium tabular-nums">{t('6 AM – 12 AM', '٦ص – ١٢م')}</dd>
          <dt className="text-ink/60">{t('Friday', 'الجمعة')}</dt><dd className="text-end font-medium tabular-nums">{t('8 AM – 12 AM', '٨ص – ١٢م')}</dd>
        </dl>
        <p className="mt-3 text-xs text-ink/45">{t('From the café’s “Working hours” Instagram highlight. Editing comes in the full build.', 'من هايلايت “أوقات العمل” في إنستقرام. التعديل ضمن النسخة الكاملة.')}</p>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold"><Users size={20} className="text-forest" />{t('Staff accounts', 'حسابات الموظفين')}</h2>
        <p className="mt-1 text-sm text-ink/55">{t('In the full build each barista gets their own login, and managers control who can see sales and settings.', 'في النسخة الكاملة لكل باريستا حساب خاص، والمدير يحدد مين يشوف المبيعات والإعدادات.')}</p>
      </section>

      <section className="mt-4 rounded-2xl border border-wine/15 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">{t('Demo data', 'بيانات التجربة')}</h2>
        <p className="mt-1 text-sm text-ink/55">{t('Regenerates sample orders, restocks every item, resumes ordering and clears staff statuses on app orders.', 'يعيد إنشاء الطلبات التجريبية ويرجّع كل الأصناف ويفعّل الطلب ويمسح حالات الطلبات.')}</p>
        <button onClick={reset} onBlur={() => setConfirmReset(false)}
          className={'mt-4 flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ' + (confirmReset ? 'bg-wine text-cream' : 'bg-paper text-wine')}>
          <ArrowCounterClockwise size={17} />{confirmReset ? t('Click again to confirm', 'اضغط مرة ثانية للتأكيد') : t('Reset demo data', 'إعادة ضبط بيانات التجربة')}
        </button>
        {resetDone && <p role="status" className="mt-2 text-sm text-forest">{t('Demo data reset.', 'تمت إعادة الضبط.')}</p>}
      </section>

      <p className="mt-4 flex gap-2 text-xs text-ink/50"><Info size={15} className="mt-px shrink-0" />{t('Demo: settings are stored in this browser only.', 'تجربة: الإعدادات محفوظة في هذا المتصفح فقط.')}</p>
    </div>
  );
}
