import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        servicesSettings: 'Настройки сервисов',
        downloadLogo: 'Загрузите лого сервиса',
        services: 'Сервисные услуги',
        subServices: 'Подуслуги',
        addService: 'Добавить сервис',
        cancelService: 'Отменить сервис',
        companyTypes: 'Типы компаний',
        serviceStatus: 'Статус сервиса',
        additionalInfo: 'Доп. информация',
        addCarPhotos: 'Добавьте фото автомобилие на момента прибытия',
        sparePartType: 'Тип запчастей/жидкости',
        nextMileage: 'Следующий пробег сервиса',
        mechanicName: 'Имя механика'
      },
      ru: {
        servicesSettings: 'Настройки сервисов',
        downloadLogo: 'Загрузите лого сервиса',
        services: 'Сервисные услуги',
        subServices: 'Подуслуги',
        addService: 'Добавить сервис',
        cancelService: 'Отменить сервис',
        companyTypes: 'Типы компаний',
        serviceStatus: 'Статус сервиса',
        additionalInfo: 'Доп. информация',
        addCarPhotos: 'Добавьте фото автомобилие на момента прибытия',
        sparePartType: 'Тип запчастей/жидкости',
        nextMileage: 'Следующий пробег сервиса',
        mechanicName: 'Имя механика'
      },
      uz: {
        servicesSettings: 'Настройки сервисов',
        downloadLogo: 'Загрузите лого сервиса',
        services: 'Сервисные услуги',
        subServices: 'Подуслуги',
        addService: 'Добавить сервис',
        cancelService: 'Отменить сервис',
        companyTypes: 'Типы компаний',
        serviceStatus: 'Статус сервиса',
        additionalInfo: 'Доп. информация',
        addCarPhotos: 'Добавьте фото автомобилие на момента прибытия',
        sparePartType: 'Тип запчастей/жидкости',
        nextMileage: 'Следующий пробег сервиса',
        mechanicName: 'Имя механика'
      }
    }
  })
}
