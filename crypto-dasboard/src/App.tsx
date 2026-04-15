import "./app/store/app.bootstrap";
import { useEffect } from "react";
import { DashboardPage } from "./modules/market/pages/DashboardPage";
import { storage } from "./shared/utils/storage";
import { STORAGE_KEYS } from "./shared/constants/settings";
import {
  hydrateFavorites,
  hydrateLanguage,
  hydrateTheme,
} from "./app/actions/settings.actions";
import type { Language, ThemeMode } from "./shared/types/settings.types";
import { t } from "./shared/i18n";

export function App() {
  useEffect(() => {
    const favorites = storage.get<string[]>(STORAGE_KEYS.FAVORITES, []);
    const language = storage.get<Language>(STORAGE_KEYS.LANGUAGE, "en");
    const theme = storage.get<ThemeMode>(STORAGE_KEYS.THEME, "dark");

    hydrateFavorites(favorites);
    hydrateLanguage(language);
    hydrateTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">{t("appTitle")}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <DashboardPage />
      </main>
    </div>
  );
}
