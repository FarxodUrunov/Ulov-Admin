import { useField, useForm } from 'vee-validate'
import { type InferType, object, string, number, array } from 'yup'
import { imageSchema } from '@/shared/components/BaseUpload/types'
import { computed, ref } from 'vue'

interface ModelInter {
  id: number
  name: string
}

export const useBrandAndModelForm = () => {
  const search = ref<ModelInter[]>([])
  const tagModel = ref<ModelInter[]>([])
  const tags = ref([
    { id: 1, name: 'Wash' },
    { id: 2, name: 'Clean' },
    { id: 3, name: 'Change motor' },
    { id: 4, name: 'Oil change' },
    { id: 5, name: 'Dwigatel' },
    { id: 6, name: 'Porshen' }
  ])

  const formSchema = object({
    photo: imageSchema.default(undefined).required('formErrors.fieldRequired'),
    car_brand: string().required('formErrors.fieldRequired'),
    models: array(number()).min(1, 'formErrors.fieldRequired').required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })

  const photo = useField<FormType['photo']>('photo')
  const carBrand = useField<FormType['car_brand']>('car_brand')
  const models = useField<FormType['models']>('models')

  const handleModelSearch = (term: string) => {
    if (term) {
      const temp = computed(() => {
        return tags.value.filter((el) =>
          el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      })
      search.value = temp.value
    }
  }

  const handleModelCreate = (event: string) => {
    tags.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
    tagModel.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
  }

  const handleModelSelect = (tags: Array<number>) => {
    models.value.value = tags
  }

  const handleFormReset = () => {
    resetForm()
    tagModel.value = []
  }

  const handleFormSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    handleFormReset()
  })

  return {
    models,
    photo,
    carBrand,
    search,
    tagModel,
    handleFormReset,
    handleFormSubmit,
    handleModelSearch,
    handleModelCreate,
    handleModelSelect
  }
}
