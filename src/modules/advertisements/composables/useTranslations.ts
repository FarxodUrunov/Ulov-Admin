import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        editData: 'Изменить данные',
        topic: 'Тема',
        whom: 'Кому',
        location: 'Локация',
        carModel: 'Марка автомобиля',
        serviceName: 'Название автосервиси',
        from: 'От',
        to: 'До',
        adDuration: 'Период рекламы',
        url: 'Целевой URL',
        saveDraft: 'Сохранить как черновик',
        publish: 'Опубликовать',
        uploadCover: 'Загрузить обложку',
        uploadCoverHint: 'Загрузите изображение обложки для вашего рекламу.',
        uploadVideo: 'Загрузить видео',
        uploadVideoHint: 'Загрузите выдео для вашего рекламу.'
      },
      ru: {
        editData: 'Изменить данные',
        topic: 'Тема',
        whom: 'Кому',
        location: 'Локация',
        carModel: 'Марка автомобиля',
        serviceName: 'Название автосервиси',
        from: 'От',
        to: 'До',
        adDuration: 'Период рекламы',
        url: 'Целевой URL',
        saveDraft: 'Сохранить как черновик',
        publish: 'Опубликовать',
        uploadCover: 'Загрузить обложку',
        uploadCoverHint: 'Загрузите изображение обложки для вашего рекламу.',
        uploadVideo: 'Загрузить видео',
        uploadVideoHint: 'Загрузите выдео для вашего рекламу.'
      },
      uz: {
        editData: 'Изменить данные',
        topic: 'Тема',
        whom: 'Кому',
        location: 'Локация',
        carModel: 'Марка автомобиля',
        serviceName: 'Название автосервиси',
        from: 'От',
        to: 'До',
        adDuration: 'Период рекламы',
        url: 'Целевой URL',
        saveDraft: 'Сохранить как черновик',
        publish: 'Опубликовать',
        uploadCover: 'Загрузить обложку',
        uploadCoverHint: 'Загрузите изображение обложки для вашего рекламу.',
        uploadVideo: 'Загрузить видео',
        uploadVideoHint: 'Загрузите выдео для вашего рекламу.'
      }
    }
  })
}
