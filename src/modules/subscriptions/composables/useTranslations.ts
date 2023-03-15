import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        addTariff: 'Add tariff',
        tariffName: 'Tariff name',
        featureName: 'Feature name',
        feature: 'Feature',
        free: 'Free',
        numberOfCars: 'Кол-во авто'
      },
      ru: {
        addTariff: 'Add tariff',
        tariffName: 'Tariff name',
        featureName: 'Feature name',
        feature: 'Feature',
        free: 'Free',
        numberOfCars: 'Кол-во авто'
      },
      uz: {
        addTariff: 'Add tariff',
        tariffName: 'Tariff name',
        featureName: 'Feature name',
        feature: 'Feature',
        free: 'Free',
        numberOfCars: 'Кол-во авто'
      }
    }
  })
}
