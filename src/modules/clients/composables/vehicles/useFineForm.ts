import { useField, useForm } from 'vee-validate'
import { type InferType, object, string } from 'yup'

export const useFineForm = () => {
  const formSchema = object({
    card_number: string().required('formErrors.fieldRequired'),
    card_date: string().required('formErrors.fieldRequired'),
    sum: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const cardNumber = useField<FormType['card_number']>('card_number')
  const cardDate = useField<FormType['card_date']>('card_date')
  const sum = useField<FormType['sum']>('sum')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    cardNumber,
    cardDate,
    sum,
    handleResetForm,
    handleFormSubmit
  }
}
