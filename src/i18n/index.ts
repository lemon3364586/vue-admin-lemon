import { createI18n } from 'vue-i18n';
import pinia from '@/stores';
import { useAppStore } from '@/stores/modules/app';
import en from './lang/en';
import zh from './lang/zh';

const messages = {
  en,
  zh
};

const { language } = useAppStore(pinia);
const i18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: 'en',
  messages
});

export default i18n;
