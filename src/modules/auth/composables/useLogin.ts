import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { type InferType, boolean, object, string } from 'yup'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/modules/auth/store/auth'

export const useLogin = () => {
  const store = useAuthStore()
  const { login } = store
  const { loading } = storeToRefs(store)

  const router = useRouter()

  const showPassword = ref(false)

  const formSchema = object({
    phone: string()
      .matches(/^[+]998[0-9]{9}$/, { message: 'formErrors.invalidPhoneNumber' })
      .length(13, 'formErrors.invalidPhoneNumber')
      .required('formErrors.fieldRequired'),
    password: string().min(8, 'formErrors.passwordMin8Char').required('formErrors.fieldRequired'),
    remember_me: boolean()
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, handleReset } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: { phone: '', password: '', remember_me: false }
  })
  const telNumber = useField<FormType['phone']>('phone')
  const password = useField<FormType['password']>('password')
  const rememberMe = useField<FormType['remember_me']>('remember_me')

  const handleShowPassword = () => {
    showPassword.value = !showPassword.value
  }

  const handleFormSubmit = handleSubmit((values) => {
    const val = {
      phone: values.phone,
      password: values.password
    }
    login(val).then((res) => {
      if (res === 201) {
        handleReset()
        router.push('/')
      }
    })
  })

  return {
    loading,
    telNumber,
    password,
    rememberMe,
    showPassword,
    handleShowPassword,
    handleFormSubmit
  }
}
