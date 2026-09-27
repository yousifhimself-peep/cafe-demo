import { useStore } from '../store';
import { cafe } from '../data/menu';
import Sheet from './Sheet';
import { SampleTag } from './ui';
import { Storefront, Moped, Check } from './icons';

export default function ModeSheet({ onClose }) {
  const { t, mode, setMode } = useStore();
  const pick = (m) => { setMode(m); onClose(); };
  const Option = ({ id, icon: Icon, title, body, tag }) => (
    <button onClick={() => pick(id)} aria-pressed={mode === id} className={'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-start transition ' + (mode === id ? 'border-forest bg-forest/5' : 'border-transparent bg-white')}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper text-forest"><Icon size={24} /></span>
      <span className="flex-1">
        <span className="flex items-center gap-2 font-semibold">{title}{tag}</span>
        <span className="mt-0.5 block text-sm text-ink/55">{body}</span>
      </span>
      {mode === id && <Check size={20} weight="bold" className="text-forest" />}
    </button>
  );
  return (
    <Sheet onClose={onClose} label={t('How would you like it?', 'كيف تبي طلبك؟')}>
      <div className="space-y-3 px-5 pb-8 pt-5">
        <h2 className="mb-4 text-xl font-semibold">{t('How would you like it?', 'كيف تبي طلبك؟')}</h2>
        <Option id="pickup" icon={Storefront} title={t('Pickup', 'استلام')} body={t(cafe.address.en, cafe.address.ar)} />
        <Option id="delivery" icon={Moped} title={t('Delivery', 'توصيل')} body={t('Straight to your door', 'لباب بيتك')} tag={<SampleTag />} />
      </div>
    </Sheet>
  );
}
