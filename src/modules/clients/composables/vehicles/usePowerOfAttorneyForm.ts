import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number } from 'yup'

const powerOfAttorneyTypes = [
  { id: 1, name: 'Power of attorney type 1' },
  { id: 2, name: 'Power of attorney type 2' },
  { id: 3, name: 'Power of attorney type 3' }
]

export const usePowerOfAttorneyForm = () => {
  const formSchema = object({
    powerOfAttorney_type: number().required('formErrors.fieldRequired'),
    start_date: string().required('formErrors.fieldRequired'),
    end_date: string().required('formErrors.fieldRequired'),
    license_series: string().required('formErrors.fieldRequired'),
    license_number: string().required('formErrors.fieldRequired'),
    issued_to: string().required('formErrors.fieldRequired'),
    passport_series: string().required('formErrors.fieldRequired'),
    passport_number: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const powerOfAttorneyType = useField<FormType['powerOfAttorney_type']>('powerOfAttorney_type')
  const startDate = useField<FormType['start_date']>('start_date')
  const endDate = useField<FormType['end_date']>('end_date')
  const licenseSeries = useField<FormType['license_series']>('license_series')
  const licenseNumber = useField<FormType['license_number']>('license_number')
  const issuedTo = useField<FormType['issued_to']>('issued_to')
  const passportSeries = useField<FormType['passport_series']>('passport_series')
  const passportNumber = useField<FormType['passport_number']>('passport_number')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    // data
    powerOfAttorneyTypes,
    // form
    powerOfAttorneyType,
    startDate,
    endDate,
    licenseSeries,
    licenseNumber,
    issuedTo,
    passportSeries,
    passportNumber,
    handleResetForm,
    handleFormSubmit
  }
}
