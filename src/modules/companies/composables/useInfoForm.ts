import { computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, array } from 'yup'
import { storeToRefs } from 'pinia'
import { imageSchema } from '@/shared/components/BaseUpload/types'
import { useCompanyStore } from '@/modules/companies/store/company'
import { isObject } from '@/shared/utils/index'

export const useInfoForm = () => {
  const store = useCompanyStore()
  const { createCompanyData, btnInfoType, createdInfoData, loading, companyOne } =
    storeToRefs(store)

  const companyRequired = computed(() =>
    Object.keys(createCompanyData.value).length > 0 ? true : false
  )

  const isEdit = computed(() => (Object.keys(companyOne.value).length > 0 ? true : false))

  const formSchema = object({
    description: string().required('formErrors.fieldRequired'),
    photos: array(imageSchema)
      .default(undefined)
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: {
      description: '',
      photos: []
    }
  })

  const description = useField<FormType['description']>('description')
  const photos = useField<FormType['photos']>('photos')

  watch(companyOne, (value) => {
    if (
      isObject(value) &&
      Object.keys(value).length &&
      value.description !== null &&
      value.photos.length
    ) {
      description.value.value = value?.description
      photos.value.value = value?.photos?.map((item: string) => {
        return { id: Math.random(), name: item, size: 0, path: item }
      })
    }
  })

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    const photo = values.photos.map((item) => item.path)

    btnInfoType.value = true
    createdInfoData.value = { description: values.description, photos: photo }
  })

  return {
    companyRequired,
    btnInfoType,
    loading,
    description,
    photos,
    companyOne,
    isEdit,
    handleResetForm,
    handleFormSubmit
  }
}
