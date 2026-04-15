import { orchestrator } from 'satcheljs';
import { toggleFavoriteSymbol } from '../actions/market.actions';
import { setLanguage, setTheme } from '../actions/settings.actions';
import { storage } from '../../shared/utils/storage';
import { STORAGE_KEYS } from '../../shared/constants/settings';
import { appStore } from '../store/app.store';

orchestrator(toggleFavoriteSymbol, () => {
  const favorites = appStore().market.favorites;
  storage.set(STORAGE_KEYS.FAVORITES, favorites);
});

orchestrator(setLanguage, ({ language }) => {
  storage.set(STORAGE_KEYS.LANGUAGE, language);
});

orchestrator(setTheme, ({ theme }) => {
  storage.set(STORAGE_KEYS.THEME, theme);
  document.documentElement.setAttribute('data-theme', theme);
});