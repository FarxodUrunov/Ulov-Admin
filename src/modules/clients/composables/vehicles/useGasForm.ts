import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number } from 'yup'

const gasTypes = [
  { id: 1, name: 'Gas 1' },
  { id: 2, name: 'Gas 2' },
  { id: 3, name: 'Gas 3' }
]

export const useGasForm = () => {
  const formSchema = object({
    gas_type_id: number().required('formErrors.fieldRequired'),
    validity_start_date: string().required('formErrors.fieldRequired'),
    validity_end_date: string().required('formErrors.fieldRequired'),
    check_start_date: string().required('formErrors.fieldRequired'),
    check_end_date: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const gasTypeId = useField<FormType['gas_type_id']>('gas_type_id')
  const validityStartDate = useField<FormType['validity_start_date']>('validity_start_date')
  const validityEndDate = useField<FormType['validity_end_date']>('validity_end_date')
  const checkStartDate = useField<FormType['check_start_date']>('check_start_date')
  const checkEndDate = useField<FormType['check_end_date']>('check_end_date')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    // data
    gasTypes,
    // form
    gasTypeId,
    validityStartDate,
    validityEndDate,
    checkStartDate,
    checkEndDate,
    handleResetForm,
    handleFormSubmit
  }
}
