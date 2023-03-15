import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, string } from 'yup'

export const useResetPassword = () => {
  const router = useRouter()

  const formSchema = object({
    tel_number: string()
      .matches(/^[+]998[0-9]{9}$/, {
        message: 'formErrors.invalidPhoneNumber'
      })
      .length(13, 'formErrors.invalidPhoneNumber')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, meta: formMeta } = useForm<FormType>({ validationSchema: formSchema })
  const telNumber = useField<FormType['tel_number']>('tel_number')

  const handleFormSubmit = handleSubmit(async (values) => {
    alert(JSON.stringify(values))
    await router.push({ name: 'auth_confirm' })
  })

  return { telNumber, formMeta, handleFormSubmit }
}
