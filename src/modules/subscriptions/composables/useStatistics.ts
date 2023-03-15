import { ref, computed, watchEffect } from 'vue'
import type { FilterType } from '@/shared/components/TheTableHeader/types'

export const useStatistics = () => {
  // Statistics Card data
  const data = ref<
    {
      id: number
      active: boolean
      title: string
      number: number
      percent: number
      status: 'arrowGrowth' | 'arrowDescend' | 'arrowUnchanged'
      statistics: number[]
    }[]
  >([
    {
      id: 1,
      active: false,
      title: 'Доходность сервисов',
      number: 10254,
      percent: 42,
      status: 'arrowGrowth',
      statistics: [100, 970, 410, 200, 790, 150, 970, 410, 200, 790, 150, 900]
    },
    {
      id: 2,
      active: false,
      title: 'Количество автосервисы',
      number: 254,
      percent: 25,
      status: 'arrowDescend',
      statistics: [100, 370, 810, 200, 490, 50, 970, 410, 200, 790, 150, 900]
    },
    {
      id: 3,
      active: false,
      title: 'Обслуживаемые автомобили',
      number: 1024,
      percent: 0,
      status: 'arrowUnchanged',
      statistics: [200, 70, 1010, 500, 90, 650, 970, 10, 800, 190, 450, 900]
    },
    {
      id: 4,
      active: false,
      title: 'Филиали автосервиса',
      number: 1254,
      percent: 12,
      status: 'arrowGrowth',
      statistics: [100, 870, 10, 600, 90, 1050, 470, 710, 200, 990, 150, 900]
    }
  ])

  // MultiSelect data

  const numberItems = [
    { id: 1, name: 'John ' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Jack' }
  ]
  const subscriptionItems = [
    { id: 4, name: 'Maria ' },
    { id: 5, name: 'Sofia ' },
    { id: 6, name: 'Bebegim' }
  ]
  const genderItems = [
    { id: 7, name: 'Nazli' },
    { id: 8, name: 'Elif' },
    { id: 9, name: 'Polat' }
  ]
  const regionItems = [
    { id: 1, name: 'John ' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Jack' }
  ]

  //   The-table-header reactive
  const appliedFilters = ref<FilterType[]>([])
  const sortValue = ref<string | number>('')

  //   MultiSelect reactive
  const numberOfCars = ref<number[]>([])
  const subscriptions = ref<number[]>([])
  const gender = ref<number[]>([])
  const region = ref<number[]>([])

  const numberOfCarsSelected = ref<FilterType[]>([])
  const subscriptionsSelected = ref<FilterType[]>([])
  const genderSelected = ref<FilterType[]>([])
  const regionSelected = ref<FilterType[]>([])

  // Chart
  const categories = [
    'months.january',
    'months.february',
    'months.march',
    'months.april',
    'months.may',
    'months.june',
    'months.july',
    'months.august',
    'months.september',
    'months.october',
    'months.november',
    'months.december'
  ]

  const dataChart = computed(() => {
    const activeItem = data.value.find((item) => item.active)
    if (activeItem) return activeItem.statistics
    return data.value[0].statistics
  })

  // Statistics card function

  const onClick = (id: number) => {
    data.value.map((item) => {
      if (item.id === id) {
        item.active = true
      } else {
        item.active = false
      }
    })
  }

  // MultiSelect function

  const handleSelect = (event: any, act: string) => {
    if (act === 'numberOfCars') {
      numberOfCarsSelected.value = event
    } else if (act === 'subscription') {
      subscriptionsSelected.value = event
    } else if (act === 'gender') {
      genderSelected.value = event
    } else {
      regionSelected.value = event
    }
  }

  //   The-table-header function

  const handleFiltersApply = () => {
    console.log('apply filters')
  }

  const handleFilterDelete = (id: number) => {
    numberOfCars.value = numberOfCars.value.filter((item) => id !== item)
    subscriptions.value = subscriptions.value.filter((item) => id !== item)
    gender.value = gender.value.filter((item) => id !== item)
    region.value = region.value.filter((item) => id !== item)
  }

  const handleFiltersReset = () => {
    numberOfCars.value = []
    subscriptions.value = []
    gender.value = []
    region.value = []
  }

  watchEffect(() => {
    appliedFilters.value = [
      ...numberOfCarsSelected.value,
      ...subscriptionsSelected.value,
      ...genderSelected.value,
      ...regionSelected.value
    ]
  })

  return {
    sortValue,
    appliedFilters,
    numberOfCars,
    numberItems,
    subscriptions,
    subscriptionItems,
    gender,
    genderItems,
    region,
    regionItems,
    data,
    dataChart,
    categories,
    handleFiltersApply,
    handleFilterDelete,
    handleFiltersReset,
    handleSelect,
    onClick
  }
}
