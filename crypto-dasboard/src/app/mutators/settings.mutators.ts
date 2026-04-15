import { mutator } from 'satcheljs';
import { appStore } from '../store/app.store';
import {
  hydrateLanguage,
  hydrateTheme,
  setLanguage,
  setTheme,
} from '../actions/settings.actions';

const store = appStore();

mutator(setLanguage, ({ language }) => {
  store.settings.language = language;
});

mutator(hydrateLanguage, ({ language }) => {
  store.settings.language = language;
});

mutator(setTheme, ({ theme }) => {
  store.settings.theme = theme;
});
mutator(hydrateTheme, ({ theme }) => {
  store.settings.theme = theme;
});