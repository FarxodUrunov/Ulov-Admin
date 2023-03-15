import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number, array } from 'yup'
import { addressSchema } from '@/shared/components/BaseAddressPicker/types'

const companyNameList = [
  { id: 1, name: 'Active ' },
  { id: 2, name: 'InActive' },
  { id: 3, name: 'Deleted' }
]
const paymentMethodList = [
  { id: 1, name: 'Admin ' },
  { id: 2, name: 'Super Admin' },
  { id: 3, name: 'User' }
]

export const useCarServiceForm = () => {
  const formSchema = object({
    price: number().required('formErrors.fieldRequired'),
    arrival_time: string().required('formErrors.fieldRequired'),
    tel_number: string()
      .matches(/^[+]998[0-9]{9}$/, {
        message: 'formErrors.invalidPhoneNumber'
      })
      .length(13, 'formErrors.invalidPhoneNumber')
      .required('formErrors.fieldRequired'),
    call_time: string().required('formErrors.fieldRequired'),
    address: addressSchema.default(undefined).required('formErrors.fieldRequired'),
    name: number().required('formErrors.fieldRequired'),
    payment_method: array(number())
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired'),
    comment: string()
      .min(10, 'formErrors.commentMin10Char')
      .max(500, 'formErrors.commentMax500Char')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<Partial<FormType>>({
    validationSchema: formSchema,
    initialValues: {
      payment_method: [],
      comment: ''
    }
  })

  const price = useField<FormType['price']>('price')
  const arrivalTime = useField<FormType['arrival_time']>('arrival_time')
  const telNumber = useField<FormType['tel_number']>('tel_number')
  const callTime = useField<FormType['call_time']>('call_time')
  const address = useField<FormType['address']>('address')
  const name = useField<FormType['name']>('name')
  const paymentMethod = useField<FormType['payment_method']>('payment_method')
  const comment = useField<FormType['comment']>('comment')

  const handleFormReset = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleFormReset()
  })

  return {
    companyNameList,
    paymentMethodList,
    price,
    arrivalTime,
    telNumber,
    callTime,
    address,
    name,
    paymentMethod,
    comment,
    handleFormReset,
    handleFormSubmit
  }
}
