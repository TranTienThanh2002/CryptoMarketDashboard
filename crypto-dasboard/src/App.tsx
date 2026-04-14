import { useEffect } from "react";
import "./app/store/app.bootstrap";
import { DashboardPage } from "./modules/market/pages/DashboardPage";
import { storage } from "./shared/utils/storage";
import type { Language } from "./shared/types/settings.types";
import { STORAGE_KEYS } from "./shared/constants/settings";
import { hydrateFavorites, hydrateLanguage } from "./app/actions/settings.actions";

export function App() {
  useEffect(() => {
    const favorites = storage.get<string[]>(STORAGE_KEYS.FAVORITES, []);
    const language = storage.get<Language>(STORAGE_KEYS.LANGUAGE, "en");

    hydrateFavorites(favorites);
    hydrateLanguage(language);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Crypto Dashboard</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <DashboardPage />
      </main>
    </div>
  );
}
