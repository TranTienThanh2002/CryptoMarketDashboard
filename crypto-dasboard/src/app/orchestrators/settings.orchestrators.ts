import { orchestrator } from 'satcheljs';
import { hydrateFavorites, setLanguage, setTheme } from '../actions/settings.actions';
import { toggleFavoriteSymbol } from '../actions/market.actions';
import { storage } from '../../shared/utils/storage';
import { STORAGE_KEYS } from '../../shared/constants/settings';
import { appStore } from '../store/app.store';

orchestrator(hydrateFavorites, () => {
  // no-op
});

orchestrator(toggleFavoriteSymbol, () => {
  const favorites = appStore().market.favorites;
  storage.set(STORAGE_KEYS.FAVORITES, favorites);
});

orchestrator(setLanguage, ({ language }) => {
  storage.set(STORAGE_KEYS.LANGUAGE, language);
});

orchestrator(setTheme, ({ theme }) => {
  storage.set(STORAGE_KEYS.THEME, theme);
});