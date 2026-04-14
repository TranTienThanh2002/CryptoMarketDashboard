import { observer } from 'mobx-react-lite';
import { appStore } from '../../../app/store/app.store';
import { setMarketSearchKeyword } from '../../../app/actions/market.actions';
import { t } from '../../../shared/i18n';

export const SearchBar = observer(() => {
  const store = appStore();

  return (
    <div className="mb-6">
      <input
        value={store.market.searchKeyword}
        onChange={(event) => {
          setMarketSearchKeyword(event.target.value);
        }}
        placeholder={t('searchPlaceholder')}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-500"
      />
    </div>
  );
});