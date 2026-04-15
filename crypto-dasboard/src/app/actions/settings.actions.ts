import { action } from 'satcheljs';
import type { Language, ThemeMode } from '../../shared/types/settings.types';

export const hydrateFavorites = action(
  'hydrateFavorites',
  (favorites: string[]) => ({ favorites }),
);
export const setLanguage = action(
  'setLanguage',
  (language: Language) => ({ language }),
);

export const setTheme = action(
  'setTheme',
  (theme: ThemeMode) => ({ theme }),
);

export const hydrateLanguage = action(
  'hydrateLanguage',
  (language: Language) => ({ language }),
);

export const hydrateTheme = action(
  'hydrateTheme',
  (theme: ThemeMode) => ({ theme }),
);

export const setAvatar = action(
  "setAvatar",
  (avatar: string | null) => ({ avatar }),
);

export const hydrateAvatar = action(
  "hydrateAvatar",
  (avatar: string | null) => ({ avatar }),
);