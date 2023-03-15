import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number, array } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'

const addressList = [
  { id: 1, name: 'Ташкент' },
  { id: 2, name: 'Андижан' },
  { id: 3, name: 'Фергана' }
]

const carModelList = [
  { id: 1, name: 'Chevrolet ' },
  { id: 2, name: 'Daewoo' },
  { id: 3, name: 'Mersedec' }
]

const serviceList = [
  { id: 1, name: 'AVTORITET' },
  { id: 2, name: 'ZAZ Forza' },
  { id: 3, name: 'Sardor avto' }
]

export const useAdvertisementForm = () => {
  const formSchema = object({
    photo: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    video: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    topic: string().required('formErrors.fieldRequired'),
    description: string().required('formErrors.fieldRequired'),
    address_ids: array(number())
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired'),
    car_models: array(number())
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired'),
    service_ids: array(number())
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired'),
    start_date: string().required('formErrors.fieldRequired'),
    end_date: string().required('formErrors.fieldRequired'),
    company_id: number().required('formErrors.fieldRequired'),
    url: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<Partial<FormType>>({
    validationSchema: formSchema,
    initialValues: { address_ids: [], car_models: [], service_ids: [], description: '' }
  })

  const topic = useField<FormType['topic']>('topic')
  const description = useField<FormType['description']>('description')
  const addressIds = useField<FormType['address_ids']>('address_ids')
  const carModels = useField<FormType['car_models']>('car_models')
  const serviceIds = useField<FormType['service_ids']>('service_ids')
  const startDate = useField<FormType['start_date']>('start_date')
  const endDate = useField<FormType['end_date']>('end_date')
  const companyId = useField<FormType['company_id']>('company_id')
  const url = useField<FormType['url']>('url')
  const photo = useField<FormType['photo']>('photo')
  const video = useField<FormType['video']>('video')

  const handleFormReset = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleFormReset()
  })

  const handleSaveDraft = handleSubmit((values) => {
    // TODO: save draft
    console.log(values)
  })

  return {
    addressList,
    carModelList,
    serviceList,
    topic,
    description,
    addressIds,
    carModels,
    serviceIds,
    startDate,
    endDate,
    companyId,
    url,
    photo,
    video,
    handleFormReset,
    handleFormSubmit,
    handleSaveDraft
  }
}
