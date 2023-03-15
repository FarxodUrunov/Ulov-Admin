import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        changeData: 'Изменить данные',
        uploadAvatar: 'Загрузите аватар',
        addRole: 'Добавить роль',
        addNewRole: 'Добавить новый роль',
        permissions: 'Разрешения',
        noPermissionsFound: 'No Permissions Found',
        create: 'Создать',
        delete: 'Удалить',
        read: 'Читать',
        write: 'Записывать'
      },
      ru: {
        changeData: 'Изменить данные',
        uploadAvatar: 'Загрузите аватар',
        addRole: 'Добавить роль',
        addNewRole: 'Добавить новый роль',
        permissions: 'Разрешения',
        noPermissionsFound: 'No Permissions Found',
        create: 'Создать',
        delete: 'Удалить',
        read: 'Читать',
        write: 'Записывать'
      },
      uz: {
        changeData: 'Изменить данные',
        uploadAvatar: 'Загрузите аватар',
        addRole: 'Добавить роль',
        addNewRole: 'Добавить новый роль',
        permissions: 'Разрешения',
        noPermissionsFound: 'No Permissions Found',
        create: 'Создать',
        delete: 'Удалить',
        read: 'Читать',
        write: 'Записывать'
      }
    }
  })
}
