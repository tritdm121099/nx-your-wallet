
export const appLanguages = ['en', 'vi'] as const;
export type AppLanguage = typeof appLanguages[number];

export interface LanguageOption {
  value: AppLanguage;
  label: string;
}