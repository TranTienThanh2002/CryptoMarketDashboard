import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { setTheme } from "../../../app/actions/settings.actions";
import { t } from "../../../shared/i18n";

export const ThemeToggle = observer(() => {
  const store = appStore();
  const currentTheme = store.settings.theme;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[var(--muted)]">{t("theme")}:</span>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          currentTheme === "dark"
            ? "bg-sky-500 text-white"
            : "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
        }`}
      >
        {t("dark")}
      </button>

      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          currentTheme === "light"
            ? "bg-sky-500 text-white"
            : "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
        }`}
      >
        {t("light")}
      </button>
    </div>
  );
});
