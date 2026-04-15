import "./app/store/app.bootstrap";
import { useEffect } from "react";
import { DashboardPage } from "./modules/market/pages/DashboardPage";
import { storage } from "./shared/utils/storage";
import { STORAGE_KEYS } from "./shared/constants/settings";
import {
  hydrateAvatar,
  hydrateFavorites,
  hydrateLanguage,
  hydrateTheme,
} from "./app/actions/settings.actions";
import type { Language, ThemeMode } from "./shared/types/settings.types";
import { t } from "./shared/i18n";
import { appStore } from "./app/store/app.store";
import { observer } from "mobx-react-lite";
import { HeaderAvatar } from "./modules/settings/components/HeaderAvatar";

export const App = observer(() => {
  const store = appStore();
  const avatar = store.settings.avatar;

  useEffect(() => {
    const favorites = storage.get<string[]>(STORAGE_KEYS.FAVORITES, []);
    const language = storage.get<Language>(STORAGE_KEYS.LANGUAGE, "en");
    const theme = storage.get<ThemeMode>(STORAGE_KEYS.THEME, "dark");
    const avatar = storage.get<string | null>(STORAGE_KEYS.AVATAR, null);

    hydrateFavorites(favorites);
    hydrateLanguage(language);
    hydrateTheme(theme);
    hydrateAvatar(avatar);

    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">{t("appTitle")}</h1>
          </div>

          <HeaderAvatar />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <DashboardPage />
      </main>
    </div>
  );
});
