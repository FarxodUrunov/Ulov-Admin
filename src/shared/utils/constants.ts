export const defaultLocale = 'ru'

export const localeOptions = <const>[
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Russian' },
  { id: 'uz', name: 'Uzbek' }
]

export const yMapSettings = {
  apiKey: import.meta.env.VITE_APP_YANDEX_MAPS_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  debug: false,
  version: '2.1'
}
