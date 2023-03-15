import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        login: 'Вход',
        rememberMe: 'Запомните меня',
        forgotPassword: 'Забыли пароль?',
        passwordReset: 'Сброс пароля',
        passwordResetDescription:
          'Для сброса пароля на ваш номер телефона придет SMS-сообщение, через которое вы сможете обновить пароль.',
        confirmation: 'Подтверждение',
        confirmationDescription: 'Введите SMS-код, который мы отправили вам на номер телефона',
        resendSMS: 'Отправить SMS повторно',
        enterNewPassword: 'Введите новый пароль'
      },
      ru: {
        login: 'Вход',
        rememberMe: 'Запомните меня',
        forgotPassword: 'Забыли пароль?',
        passwordReset: 'Сброс пароля',
        passwordResetDescription:
          'Для сброса пароля на ваш номер телефона придет SMS-сообщение, через которое вы сможете обновить пароль.',
        confirmation: 'Подтверждение',
        confirmationDescription: 'Введите SMS-код, который мы отправили вам на номер телефона',
        resendSMS: 'Отправить SMS повторно',
        enterNewPassword: 'Введите новый пароль'
      },
      uz: {
        login: 'Вход',
        rememberMe: 'Запомните меня',
        forgotPassword: 'Забыли пароль?',
        passwordReset: 'Сброс пароля',
        passwordResetDescription:
          'Для сброса пароля на ваш номер телефона придет SMS-сообщение, через которое вы сможете обновить пароль.',
        confirmation: 'Подтверждение',
        confirmationDescription: 'Введите SMS-код, который мы отправили вам на номер телефона',
        resendSMS: 'Отправить SMS повторно',
        enterNewPassword: 'Введите новый пароль'
      }
    }
  })
}
