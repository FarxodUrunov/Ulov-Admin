import { useForm, useField, useFieldArray } from 'vee-validate'
import { type InferType, array, number, object, string } from 'yup'

const companyTypes = [
  { id: 1, name: 'Автосервисы' },
  { id: 2, name: 'Эвакуаторы' },
  { id: 3, name: 'Автозаправки' },
  { id: 4, name: 'Автомойки' }
]

const companies = [
  { id: 1, name: 'Company 1' },
  { id: 2, name: 'Company 2' },
  { id: 3, name: 'Company 3' }
]

const clients = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
  { id: 3, name: 'Client 3' }
]

const vehicles = [
  { id: 1, name: 'Vehicle 1' },
  { id: 2, name: 'Vehicle 2' },
  { id: 3, name: 'Vehicle 3' }
]

const statusList = [
  { id: 1, name: 'В ожидании' },
  { id: 2, name: 'Завершен' }
]

const serviceTypes = [
  { id: 1, name: 'Техническое обслуживание' },
  { id: 2, name: 'Ремонт' },
  { id: 3, name: 'Замена запчастей' }
]

const services = [
  { id: 1, name: 'Service 1' },
  { id: 2, name: 'Service 2' },
  { id: 3, name: 'Service 3' }
]

const mechanics = [
  { id: 1, name: 'Mechanic 1' },
  { id: 2, name: 'Mechanic 2' },
  { id: 3, name: 'Mechanic 3' }
]

export const useServiceHistoryPostForm = () => {
  const serviceSchema = object({
    service_type: number().required('formErrors.fieldRequired'),
    service_id: number().required('formErrors.fieldRequired'),
    spare_part: string().required('formErrors.fieldRequired'),
    next_km: string().required('formErrors.fieldRequired'),
    price: string().required('formErrors.fieldRequired'),
    mechanic_id: number().required('formErrors.fieldRequired')
  })

  const formSchema = object({
    company_type: number().required('formErrors.fieldRequired'),
    company_id: number().required('formErrors.fieldRequired'),
    client_id: number().required('formErrors.fieldRequired'),
    vehicle_id: number().required('formErrors.fieldRequired'),
    status: number().required('formErrors.fieldRequired'),
    mileage: string().required('formErrors.fieldRequired'),
    history: array(serviceSchema).min(1, 'formErrors.fieldRequired'),
    total: string().required('formErrors.fieldRequired'),
    comment: string().required('formErrors.fieldRequired')
  })
  type FormType = Omit<InferType<typeof formSchema>, 'history'> & {
    history: InferType<typeof serviceSchema>
  }

  const { handleSubmit, handleReset } = useForm<Partial<FormType>>({ validationSchema: formSchema })
  const companyType = useField<FormType['company_type']>('company_type')
  const companyId = useField<FormType['company_id']>('company_id')
  const clientId = useField<FormType['client_id']>('client_id')
  const vehicleId = useField<FormType['vehicle_id']>('vehicle_id')
  const status = useField<FormType['status']>('status')
  const mileage = useField<FormType['mileage']>('mileage')
  const {
    replace: handleReplaceHistoryItem,
    remove: handleDeleteHistoryItem,
    push: pushHistoryItem,
    fields: history
  } = useFieldArray<Partial<FormType['history']>>('history')
  const total = useField<FormType['total']>('total')
  const comment = useField<FormType['comment']>('comment')

  const handleAddHistoryItem = () => {
    pushHistoryItem({
      service_type: undefined,
      service_id: undefined,
      spare_part: '',
      next_km: '',
      price: '',
      mechanic_id: undefined
    })
  }

  const handleFormReset = () => {
    handleReset()
    handleReplaceHistoryItem([])
  }

  const handleFormSubmit = handleSubmit(
    (values) => {
      console.log(values)
    },
    (err) => {
      console.log(err)
    }
  )

  return {
    // data
    companyTypes,
    companies,
    clients,
    vehicles,
    statusList,
    serviceTypes,
    services,
    mechanics,
    // form
    companyType,
    companyId,
    clientId,
    vehicleId,
    status,
    mileage,
    history,
    total,
    comment,
    handleAddHistoryItem,
    handleDeleteHistoryItem,
    handleFormReset,
    handleFormSubmit
  }
}
