import { useField, useForm } from 'vee-validate'
import { type InferType, object, string } from 'yup'

export const useTintingForm = () => {
  const formSchema = object({
    start_date: string().required('formErrors.fieldRequired'),
    end_date: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const startDate = useField<FormType['start_date']>('start_date')
  const endDate = useField<FormType['end_date']>('end_date')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    startDate,
    endDate,
    handleResetForm,
    handleFormSubmit
  }
}
