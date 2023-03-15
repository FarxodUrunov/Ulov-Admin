import { type I18nScope, useI18n } from 'vue-i18n'

export const useTranslations = (props?: { scope?: I18nScope }) => {
  const { scope = 'global' } = props || {}

  return useI18n<UseI18nSchema, UseI18nLocale>({
    useScope: scope,
    messages: {
      en: {
        carService: 'Автосервис',
        towTruck: 'Эвакуатор',
        fuel: 'Топлива',
        carWash: 'Авто мойки',
        paymentMethod: 'Метод оплаты',
        vehicleType: 'Тип транспортного средства',
        fuelGrade: 'Марка топлива',
        quantity: 'Количество',
        carWashType: 'Тип автомойки',
        changeData: 'Изменить данные',
        callTime: 'Время вызова',
        arrivalTime: 'Время прибытия'
      },
      ru: {
        carService: 'Автосервис',
        towTruck: 'Эвакуатор',
        fuel: 'Топлива',
        carWash: 'Авто мойки',
        paymentMethod: 'Метод оплаты',
        vehicleType: 'Тип транспортного средства',
        fuelGrade: 'Марка топлива',
        quantity: 'Количество',
        carWashType: 'Тип автомойки',
        changeData: 'Изменить данные',
        callTime: 'Время вызова',
        arrivalTime: 'Время прибытия'
      },
      uz: {
        carService: 'Автосервис',
        towTruck: 'Эвакуатор',
        fuel: 'Топлива',
        carWash: 'Авто мойки',
        paymentMethod: 'Метод оплаты',
        vehicleType: 'Тип транспортного средства',
        fuelGrade: 'Марка топлива',
        quantity: 'Количество',
        carWashType: 'Тип автомойки',
        changeData: 'Изменить данные',
        callTime: 'Время вызова',
        arrivalTime: 'Время прибытия'
      }
    }
  })
}
