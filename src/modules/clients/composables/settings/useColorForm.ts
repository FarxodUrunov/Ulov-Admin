import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { type InferType, object, number, array } from 'yup'

interface ColorInter {
  id: number
  name: string
}

export const useColorForm = () => {
  const search = ref<ColorInter[]>([])
  const tagModel = ref<ColorInter[]>([])
  const tags = ref([
    { id: 1, name: 'Wash' },
    { id: 2, name: 'Clean' },
    { id: 3, name: 'Change motor' },
    { id: 4, name: 'Oil change' },
    { id: 5, name: 'Dwigatel' },
    { id: 6, name: 'Porshen' }
  ])

  const formSchema = object({
    colours: array(number()).min(1, 'formErrors.fieldRequired').required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })

  const colours = useField<FormType['colours']>('colours')

  const handleColorSearch = (term: string) => {
    if (term) {
      const temp = computed(() => {
        return tags.value.filter((el) =>
          el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      })
      search.value = temp.value
    }
  }

  const handleColorCreate = (event: string) => {
    tags.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
    tagModel.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
  }

  const handleColorSelect = (tags: Array<number>) => {
    colours.value.value = tags
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
    colours,
    search,
    tagModel,
    handleFormReset,
    handleFormSubmit,
    handleColorSearch,
    handleColorCreate,
    handleColorSelect
  }
}
