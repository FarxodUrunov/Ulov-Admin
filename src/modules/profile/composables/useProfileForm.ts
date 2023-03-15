import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, ref as yupRef, number } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'
import { addressSchema } from '@/shared/components/BaseAddressPicker/types'
import { generatePassword } from '@/shared/utils'

const statusList = [
  { id: 1, name: 'Active ' },
  { id: 2, name: 'InActive' },
  { id: 3, name: 'Deleted' }
]
const roleList = [
  { id: 1, name: 'Admin ' },
  { id: 2, name: 'Super Admin' },
  { id: 3, name: 'User' }
]

export const useProfileForm = () => {
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const formSchema = object({
    photo: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    first_name: string().required('formErrors.fieldRequired'),
    last_name: string(),
    tel_number: string()
      .matches(/^[+]998[0-9]{9}$/, {
        message: 'formErrors.invalidPhoneNumber'
      })
      .length(13, 'formErrors.invalidPhoneNumber')
      .required('formErrors.fieldRequired'),
    date_of_birth: string().required('formErrors.fieldRequired'),
    address: addressSchema.default(undefined).required('formErrors.fieldRequired'),
    password: string()
      .min(8, 'formErrors.passwordMin8Char')
      .matches(/\W/, 'formErrors.passwordSymbol')
      .matches(/[0-9]/, 'formErrors.passwordNumber')
      .matches(/[a-z]/, 'formErrors.passwordLowercase')
      .matches(/[A-Z]/, 'formErrors.passwordUppercase')
      .required('formErrors.fieldRequired'),
    confirm_password: string()
      .oneOf([yupRef('password')], 'formErrors.passwordsMustMatch')
      .required('formErrors.fieldRequired'),
    status: number().required('formErrors.fieldRequired'),
    role_id: number().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })

  const photo = useField<FormType['photo']>('photo')
  const firstName = useField<FormType['first_name']>('first_name')
  const lastName = useField<FormType['last_name']>('last_name')
  const telNumber = useField<FormType['tel_number']>('tel_number')
  const dateOfBirth = useField<FormType['date_of_birth']>('date_of_birth')
  const address = useField<FormType['address']>('address')
  const password = useField<FormType['password']>('password')
  const confirmPassword = useField<FormType['confirm_password']>('confirm_password')
  const status = useField<FormType['status']>('status')
  const roleId = useField<FormType['role_id']>('role_id')

  const handleShowPassword = () => {
    showPassword.value = !showPassword.value
  }

  const handleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
  }

  const handleGeneratePassword = () => {
    const genPassword = generatePassword(12)
    password.value.value = genPassword
    confirmPassword.value.value = genPassword
  }

  const handleFormReset = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleFormReset()
  })

  return {
    // data
    statusList,
    roleList,
    // Form
    photo,
    firstName,
    lastName,
    telNumber,
    dateOfBirth,
    address,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    status,
    roleId,
    handleShowPassword,
    handleShowConfirmPassword,
    handleGeneratePassword,
    handleFormReset,
    handleFormSubmit
  }
}
