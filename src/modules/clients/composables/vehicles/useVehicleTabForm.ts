import { useField, useForm } from 'vee-validate'
import { type InferType, number, object, string } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'

const brands = [
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Mazda' },
  { id: 3, name: 'Hyundai' }
]

const models = [
  { id: 1, name: 'Model 1' },
  { id: 2, name: 'Model 2' },
  { id: 3, name: 'Model 3' }
]

const clients = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
  { id: 3, name: 'Client 3' }
]

export const useVehicleTabForm = () => {
  const formSchema = object({
    cover: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    brand_id: number().required('formErrors.fieldRequired'),
    model_id: number().required('formErrors.fieldRequired'),
    release_year: string().required('formErrors.fieldRequired'),
    gov_number: string().required('formErrors.fieldRequired'),
    vi_series: string().required('formErrors.fieldRequired'),
    vi_number: string().required('formErrors.fieldRequired'),
    client_id: number().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const cover = useField<FormType['cover']>('cover')
  const brandId = useField<FormType['brand_id']>('brand_id')
  const modelId = useField<FormType['model_id']>('model_id')
  const releaseYear = useField<FormType['release_year']>('release_year')
  const govNumber = useField<FormType['gov_number']>('gov_number')
  const viSeries = useField<FormType['vi_series']>('vi_series')
  const viNumber = useField<FormType['vi_number']>('vi_number')
  const clientId = useField<FormType['client_id']>('client_id')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    // data
    brands,
    models,
    clients,
    // form
    cover,
    brandId,
    modelId,
    releaseYear,
    govNumber,
    viSeries,
    viNumber,
    clientId,
    handleResetForm,
    handleFormSubmit
  }
}
