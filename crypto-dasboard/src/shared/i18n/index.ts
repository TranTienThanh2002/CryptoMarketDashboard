import { appStore } from '../../app/store/app.store';
import { translations, type TranslationKey } from './translations';

export const t = (key: TranslationKey): string => {
  const language = appStore().settings.language;
  return translations[language][key] ?? translations.en[key];
};