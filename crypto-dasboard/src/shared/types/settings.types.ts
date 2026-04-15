export type Language = 'en' | 'vi';
export type ThemeMode = 'light' | 'dark';

export interface UserSettings {
  language: Language;
  theme: ThemeMode;
  avatar: string | null;
}