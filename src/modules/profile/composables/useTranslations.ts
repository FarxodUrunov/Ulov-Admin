import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        changeData: 'Изменить данные',
        addTariff: 'Добавить тарыф',
        tariffName: 'Название тарыфа',
        featureName: 'Название возможности',
        feature: 'Возможности',
        uploadAvatar: 'Загрузить аватар'
      },
      ru: {
        changeData: 'Изменить данные',
        addTariff: 'Добавить тарыф',
        tariffName: 'Название тарыфа',
        featureName: 'Название возможности',
        feature: 'Возможности',
        uploadAvatar: 'Загрузить аватар'
      },
      uz: {
        changeData: 'Изменить данные',
        addTariff: 'Добавить тарыф',
        tariffName: 'Название тарыфа',
        featureName: 'Название возможности',
        feature: 'Возможности',
        uploadAvatar: 'Загрузить аватар'
      }
    }
  })
}
