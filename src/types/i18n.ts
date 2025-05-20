import { InitOptions, Resource, ResourceLanguage, TFunction } from 'i18next';

export type I18nCallback = (error: Error | null, t: TFunction) => void;

// 轉換i18next的類型，使其適應我們的用例
export type I18nInitOptions = InitOptions;
export type I18nResource = Resource;
export type I18nResourceLanguage = ResourceLanguage;

// 簡化的翻譯資源類型
export interface TranslationResource {
  translation: Record<string, string>;
}

export interface I18nResources {
  [language: string]: TranslationResource;
}

export interface I18nConfig {
  resources: I18nResources;
  lng: string;
  fallbackLng: string;
  interpolation: {
    escapeValue: boolean;
  };
}
