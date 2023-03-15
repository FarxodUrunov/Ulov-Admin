import { useField, useForm } from 'vee-validate'
import { type InferType, array, number, object, string } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'

const vehicleColors = [
  { id: 1, name: 'Black' },
  { id: 2, name: 'White' },
  { id: 3, name: 'Red' }
]

const fuelTypes = [
  { id: 1, name: 'Gasoline' },
  { id: 2, name: 'Diesel' },
  { id: 3, name: 'Hybrid' }
]

const transmissions = [
  { id: 1, name: 'Manual' },
  { id: 2, name: 'Automatic' }
]

export const useAdditionalInfoTabForm = () => {
  const formSchema = object({
    color_id: number().required('formErrors.fieldRequired'),
    fuelType_id: number().required('formErrors.fieldRequired'),
    transmission_id: number().required('formErrors.fieldRequired'),
    vin: string().required('formErrors.fieldRequired'),
    photos: array(imageSchema)
      .default(undefined)
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<Partial<FormType>>({
    validationSchema: formSchema,
    initialValues: {
      photos: []
    }
  })

  const colorId = useField<FormType['color_id']>('color_id')
  const fuelTypeId = useField<FormType['fuelType_id']>('fuelType_id')
  const transmissionId = useField<FormType['transmission_id']>('transmission_id')
  const vin = useField<FormType['vin']>('vin')
  const photos = useField<FormType['photos']>('photos')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    // data
    vehicleColors,
    fuelTypes,
    transmissions,
    // form
    colorId,
    fuelTypeId,
    transmissionId,
    vin,
    photos,
    handleResetForm,
    handleFormSubmit
  }
}
