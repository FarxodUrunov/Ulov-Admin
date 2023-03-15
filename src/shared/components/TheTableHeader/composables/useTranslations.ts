import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        sorting: 'Сортировка',
        sort: {
          asc: 'По А-Я',
          desc: 'По Я-А',
          byRegistration: 'По Регистрации',
          today: 'Сегодня',
          thisWeek: 'На этой неделе',
          thisMonth: 'Этот месяц'
        }
      },
      ru: {
        sorting: 'Сортировка',
        sort: {
          asc: 'По А-Я',
          desc: 'По Я-А',
          byRegistration: 'По Регистрации',
          today: 'Сегодня',
          thisWeek: 'На этой неделе',
          thisMonth: 'Этот месяц'
        }
      },
      uz: {
        sorting: 'Сортировка',
        sort: {
          asc: 'По А-Я',
          desc: 'По Я-А',
          byRegistration: 'По Регистрации',
          today: 'Сегодня',
          thisWeek: 'На этой неделе',
          thisMonth: 'Этот месяц'
        }
      }
    }
  })
}
