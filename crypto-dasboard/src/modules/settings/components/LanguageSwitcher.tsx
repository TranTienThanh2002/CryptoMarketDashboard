import { observer } from 'mobx-react-lite';
import { appStore } from '../../../app/store/app.store';
import { setLanguage } from '../../../app/actions/settings.actions';
import { t } from '../../../shared/i18n';

export const LanguageSwitcher = observer(() => {
  const store = appStore();
  const currentLanguage = store.settings.language;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-300">{t('language')}:</span>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          currentLanguage === 'en'
            ? 'bg-sky-500 text-white'
            : 'border border-white/10 bg-white/5 text-slate-300'
        }`}
      >
        {t('english')}
      </button>

      <button
        type="button"
        onClick={() => setLanguage('vi')}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          currentLanguage === 'vi'
            ? 'bg-sky-500 text-white'
            : 'border border-white/10 bg-white/5 text-slate-300'
        }`}
      >
        {t('vietnamese')}
      </button>
    </div>
  );
});