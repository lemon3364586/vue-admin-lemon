import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import { useAppStore } from '@/stores/modules/app';
import en from './lang/en';
import zh from './lang/zh';

async function createI18nOptions(): Promise<I18nOptions> {
  const { language } = useAppStore();
  return {
    legacy: false,
    locale: language,
    fallbackLocale: 'en',
    messages: {
      en,
      zh
    }
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  const i18n = createI18n(options) as I18n;
  app.use(i18n);
}

export default setupI18n;
