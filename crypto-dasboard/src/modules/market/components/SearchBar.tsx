import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { setMarketSearchKeyword } from "../../../app/actions/market.actions";
import { t } from "../../../shared/i18n";

export const SearchBar = observer(() => {
  const store = appStore();

  return (
    <div>
      <input
        value={store.market.searchKeyword}
        onChange={(event) => {
          setMarketSearchKeyword(event.target.value);
        }}
        placeholder={t("searchPlaceholder")}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-sky-500"
      />
    </div>
  );
});