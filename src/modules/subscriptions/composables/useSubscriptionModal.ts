import { ref } from 'vue'
import { useField, useForm, useFieldArray } from 'vee-validate'
import { type InferType, array, object, string, number } from 'yup'

export const useSubscriptionModal = () => {
  const loading = ref<boolean>(false)

  const featureSchema = object({
    feature_name: string().required('formErrors.fieldRequired'),
    feature: array(number()).ensure().min(1, 'formErrors.fieldRequired')
  })

  const formSchema = object({
    tariff_name: string()
      .min(3, 'formErrors.tariffNameMin3Char')
      .max(60, 'formErrors.tariffNameMax60Char')
      .required('formErrors.fieldRequired'),
    price: string().required('formErrors.fieldRequired'),
    time: string().required('formErrors.fieldRequired'),
    features: array(featureSchema).min(1, 'formErrors.fieldRequired')
  })
  type FormType = Omit<InferType<typeof formSchema>, 'features'> & {
    feature: InferType<typeof featureSchema>
  }

  const { handleSubmit, handleReset } = useForm<FormType>({
    validationSchema: formSchema
  })

  const tariffName = useField<FormType['tariff_name']>('tariff_name')
  const price = useField<FormType['price']>('price')
  const time = useField<FormType['time']>('time')
  const {
    replace: handleReplaceFeature,
    remove: handleDeleteFeature,
    push: pushFeature,
    fields: features
  } = useFieldArray<FormType['feature']>('features')

  const handleAddFeature = () => {
    pushFeature({ feature_name: '', feature: [] })
  }

  const handleFormReset = () => {
    handleReset()
    handleReplaceFeature([])
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
  })

  return {
    loading,
    tariffName,
    price,
    time,
    features,
    handleAddFeature,
    handleDeleteFeature,
    handleFormReset,
    handleFormSubmit
  }
}
