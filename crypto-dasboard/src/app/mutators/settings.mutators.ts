import { mutator } from 'satcheljs';
import { appStore } from '../store/app.store';
import {
    hydrateAvatar,
  hydrateLanguage,
  hydrateTheme,
  setAvatar,
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
mutator(setAvatar, ({ avatar }) => {
  store.settings.avatar = avatar;
});

mutator(hydrateAvatar, ({ avatar }) => {
  store.settings.avatar = avatar;
});