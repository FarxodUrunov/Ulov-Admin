import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, ref as yupRef } from 'yup'

export const useSend = () => {
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const formSchema = object({
    password: string()
      .min(8, 'formErrors.passwordMin8Char')
      .matches(/\W/, 'formErrors.passwordSymbol')
      .matches(/[0-9]/, 'formErrors.passwordNumber')
      .matches(/[a-z]/, 'formErrors.passwordLowercase')
      .matches(/[A-Z]/, 'formErrors.passwordUppercase')
      .required('formErrors.fieldRequired'),
    confirm_password: string()
      .oneOf([yupRef('password')], 'formErrors.passwordsMustMatch')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, meta: formMeta } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: { password: '', confirm_password: '' }
  })
  const password = useField<FormType['password']>('password')
  const confirmPassword = useField<FormType['confirm_password']>('confirm_password')

  const handleShowPassword = () => {
    showPassword.value = !showPassword.value
  }

  const handleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
  })

  return {
    showPassword,
    showConfirmPassword,
    password,
    confirmPassword,
    formMeta,
    handleShowPassword,
    handleShowConfirmPassword,
    handleFormSubmit
  }
}
