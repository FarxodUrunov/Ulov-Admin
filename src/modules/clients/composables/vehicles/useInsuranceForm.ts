import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number } from 'yup'

const companies = [
  { id: 1, name: 'Insurance company 1' },
  { id: 2, name: 'Insurance company 2' },
  { id: 3, name: 'Insurance company 3' }
]

const insuranceTypes = [
  { id: 1, name: 'Insurance type 1' },
  { id: 2, name: 'Insurance type 2' },
  { id: 3, name: 'Insurance type 3' }
]

export const useInsuranceForm = () => {
  const formSchema = object({
    company_id: number().required('formErrors.fieldRequired'),
    insurance_type_id: number().required('formErrors.fieldRequired'),
    license_series: string().required('formErrors.fieldRequired'),
    license_number: string().required('formErrors.fieldRequired'),
    start_date: string().required('formErrors.fieldRequired'),
    end_date: string().required('formErrors.fieldRequired'),
    driver_count: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const companyId = useField<FormType['company_id']>('company_id')
  const insuranceTypeId = useField<FormType['insurance_type_id']>('insurance_type_id')
  const licenseSeries = useField<FormType['license_series']>('license_series')
  const licenseNumber = useField<FormType['license_number']>('license_number')
  const startDate = useField<FormType['start_date']>('start_date')
  const endDate = useField<FormType['end_date']>('end_date')
  const driverCount = useField<FormType['driver_count']>('driver_count')

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleResetForm()
  })

  return {
    // data
    companies,
    insuranceTypes,
    // form
    companyId,
    insuranceTypeId,
    licenseSeries,
    licenseNumber,
    startDate,
    endDate,
    driverCount,
    handleResetForm,
    handleFormSubmit
  }
}
