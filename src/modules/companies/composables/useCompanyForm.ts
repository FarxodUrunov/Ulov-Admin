import { computed, onMounted, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, array, boolean, number, object, string, tuple } from 'yup'
import { storeToRefs } from 'pinia'
import { imageSchema } from '@/shared/components/BaseUpload/types'
import { addressSchema } from '@/shared/components/BaseAddressPicker/types'
import { useCompanyStore } from '@/modules/companies/store/company'
import { useIinformationOfCompany } from '@/modules/companies/store/informationOfCompany'
import { isObject } from '@/shared/utils/index'

const serviceTypes = [
  { id: 'auto_service', name: 'Автосервисы' },
  { id: 'tow_truck', name: 'Эвакуаторы' },
  { id: 'auto_refueling', name: 'Авто заправки' },
  { id: 'carwash', name: 'Авто мойки' }
]

const paymentTypes = [
  { id: 'cash', name: 'Наличные' },
  { id: 'credit', name: 'Кредит' },
  { id: 'debit', name: 'Дебет' },
  { id: 'card', name: 'Карта' },
  { id: 'transfer', name: 'Передача' }
]

const statusTypes = [
  { id: 'active', name: 'Активный' },
  { id: 'pending', name: 'В ожидании' },
  { id: 'inactive', name: 'Неактивный' },
  { id: 'deleted', name: 'Удален' }
]

const weekDay = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export const useCompanyForm = () => {
  const store = useCompanyStore()
  const { btnCompanyType, createCompanyData, loading, companyOne } = storeToRefs(store)

  const infoStore = useIinformationOfCompany()
  const { fetchCompanyAll } = infoStore
  const { companyName } = storeToRefs(infoStore)

  const companyRequired = computed(() =>
    Object.keys(createCompanyData.value).length > 0 ? true : false
  )

  const isEdit = computed(() => (Object.keys(companyOne.value).length > 0 ? true : false))

  const formSchema = object({
    cover: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    name: string().required('formErrors.fieldRequired'),
    company_type: string().required('formErrors.fieldRequired'),
    type: string().required('formErrors.fieldRequired'),
    phone: string()
      .matches(/^[+]998[0-9]{9}$/, {
        message: 'formErrors.invalidPhoneNumber'
      })
      .length(13, 'formErrors.invalidPhoneNumber')
      .required('formErrors.fieldRequired'),
    address: addressSchema.default(undefined).required('formErrors.fieldRequired'),
    payment: array(string())
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired'),
    days: tuple([
      boolean(),
      boolean(),
      boolean(),
      boolean(),
      boolean(),
      boolean(),
      boolean()
    ]).required('formErrors.fieldRequired'),
    start_time: object({
      hours: number().required('formErrors.fieldRequired'),
      minutes: number().required('formErrors.fieldRequired'),
      seconds: number().required('formErrors.fieldRequired')
    }).required('formErrors.fieldRequired'),
    end_time: object({
      hours: number().required('formErrors.fieldRequired'),
      minutes: number().required('formErrors.fieldRequired'),
      seconds: number().required('formErrors.fieldRequired')
    }).required('formErrors.fieldRequired'),
    status: string().required('formErrors.fieldRequired'),
    name_select: number()
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<Partial<FormType>>({
    validationSchema: formSchema,
    initialValues: {
      payment: [],
      days: [false, false, false, false, false, false, false]
    }
  })

  const cover = useField<FormType['cover']>('cover')
  const name = useField<FormType['name']>('name')
  const companyType = useField<FormType['company_type']>('company_type')
  const type = useField<FormType['type']>('type')
  const phone = useField<FormType['phone']>('phone')
  const address = useField<FormType['address']>('address')
  const status = useField<FormType['status']>('status')
  const payment = useField<FormType['payment']>('payment')
  const workDays = useField<FormType['days']>('days')
  const startTime = useField<FormType['start_time']>('start_time')
  const endTime = useField<FormType['end_time']>('end_time')
  const nameSelect = useField<FormType['name_select']>('name_select')

  watch(companyOne, (value) => {
    if (isObject(value) && Object.keys(value).length) {
      cover.value.value = {
        id: Math.random(),
        name: value.image_url,
        size: 0,
        path: value.image_url
      }
      name.value.value = value.name
      companyType.value.value = value.main ? 'head' : 'branch'
      type.value.value = value.type
      phone.value.value = value.phone
      address.value.value = {
        address: value.address.street,
        coords: [value.address.lat, value.address.long],
        district: value.address.district,
        country: 'Узбекистан',
        region: 'Ташкент'
      }
      status.value.value = value.status
      payment.value.value = value.payment
      workDays.value.value = <[boolean, boolean, boolean, boolean, boolean, boolean, boolean]>(
        weekDay.map((item) => value?.working_time?.days.includes(item))
      )
      startTime.value.value = timeReversFormat(value.working_time?.start_time)
      endTime.value.value = timeReversFormat(value.working_time?.end_time)
      nameSelect.value.value = value.company.id
    }
  })

  const handleResetForm = () => {
    resetForm()
  }

  const timeReversFormat = (time: string) => {
    const result = {
      hours: Number(time.split(':')[0]),
      minutes: Number(time.split(':')[1]),
      seconds: Number(time.split(':')[2])
    }
    return result
  }

  const timeFormat = (time: { hours: number; minutes: number; seconds: number } | undefined) => {
    const h = time?.hours !== undefined && time?.hours < 10 ? '0' + time?.hours : time?.hours
    const m =
      time?.minutes !== undefined && time?.minutes < 10 ? '0' + time?.minutes : time?.minutes
    return `${h + ':' + m}`
  }

  const handleFormSubmit = handleSubmit((values) => {
    const data = {
      type: values.type,
      company_id: values?.name_select,
      image_url: values?.cover?.path,
      name: values.name,
      phone: values.phone,
      status: values?.status,
      payment_types: values.payment,
      address: {
        country: values.address?.country,
        street: values.address?.address,
        lat: values.address?.coords[0],
        long: values.address?.coords[1],
        district: values.address?.district,
        region: values.address?.region
      },
      working_times: values?.days
        ?.map((item, i) => {
          if (item) {
            return {
              day_type: weekDay[i],
              start_time: timeFormat(values?.start_time),
              end_time: timeFormat(values?.end_time)
            }
          }
        })
        .filter((item) => item !== undefined)
    }

    createCompanyData.value = data
    btnCompanyType.value = true
  })

  onMounted(() => fetchCompanyAll())

  return {
    companyName,
    serviceTypes,
    paymentTypes,
    statusTypes,
    cover,
    name,
    companyType,
    type,
    nameSelect,
    phone,
    address,
    payment,
    workDays,
    startTime,
    endTime,
    status,
    companyRequired,
    btnCompanyType,
    loading,
    companyOne,
    isEdit,
    handleResetForm,
    handleFormSubmit
  }
}
