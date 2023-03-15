import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number, array } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'

const services = [
  { id: 1, name: 'Автосервис ' },
  { id: 2, name: 'Эвакуатор' },
  { id: 3, name: 'Топлива' }
]

export const useSettingsForm = () => {
  const subServiceSchema = object({
    id: number().required(),
    name: string().required()
  })

  const formSchema = object({
    photo: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    service_id: number().min(1, 'formErrors.fieldRequired').required('formErrors.fieldRequired'),
    service_name: string().required('formErrors.fieldRequired'),
    sub_services: array(subServiceSchema)
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<Partial<FormType>>({
    validationSchema: formSchema,
    initialValues: { sub_services: [] }
  })
  const photo = useField<FormType['photo']>('photo')
  const serviceId = useField<FormType['service_id']>('service_id')
  const serviceName = useField<FormType['service_name']>('service_name')
  const subServices = useField<FormType['sub_services']>('sub_services')

  const handleFormReset = () => {
    resetForm()
  }

  const handleCreate = (event: string) => {
    subServices.setValue([...subServices.value.value, { id: Math.random(), name: event }])
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleFormReset()
  })

  return {
    // data
    services,
    // form
    photo,
    serviceId,
    serviceName,
    subServices,
    handleCreate,
    handleFormSubmit
  }
}
