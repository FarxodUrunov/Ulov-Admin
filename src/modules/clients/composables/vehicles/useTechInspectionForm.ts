import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number } from 'yup'

const departments = [
  { id: 1, name: 'Department 1' },
  { id: 2, name: 'Department 2' },
  { id: 3, name: 'Department 3' }
]

const inspectionPlaces = [
  { id: 1, name: 'Place 1' },
  { id: 2, name: 'Place 2' },
  { id: 3, name: 'Place 3' }
]

export const useTechInspectionForm = () => {
  const formSchema = object({
    tech_department_id: number().required('formErrors.fieldRequired'),
    tech_inspection_place_id: number().required('formErrors.fieldRequired'),
    start_date: string().required('formErrors.fieldRequired'),
    end_date: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const techDepartmentId = useField<FormType['tech_department_id']>('tech_department_id')
  const techInspectionPlaceId = useField<FormType['tech_inspection_place_id']>(
    'tech_inspection_place_id'
  )
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
    // data
    departments,
    inspectionPlaces,
    // form
    techDepartmentId,
    techInspectionPlaceId,
    startDate,
    endDate,
    handleResetForm,
    handleFormSubmit
  }
}
