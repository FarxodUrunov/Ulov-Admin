import { onMounted, computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, number, array } from 'yup'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/modules/companies/store/company'
import { useIinformationOfCompany } from '@/modules/companies/store/informationOfCompany'
import { isObject } from '@/shared/utils/index'

export const useBrandsForm = () => {
  const store = useCompanyStore()
  const { btnBrandType, createdBrandsData, loading, createCompanyData, companyOne } =
    storeToRefs(store)

  const infoStore = useIinformationOfCompany()
  const { fetchCarBrandsAll } = infoStore
  const { brands } = storeToRefs(infoStore)

  const companyRequired = computed(() =>
    Object.keys(createCompanyData.value).length > 0 ? true : false
  )

  const isEdit = computed(() => (Object.keys(companyOne.value).length > 0 ? true : false))

  const formSchema = object({
    car_brand_ids: array(number())
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: {
      car_brand_ids: []
    }
  })

  const brandsField = useField<FormType['car_brand_ids']>('car_brand_ids')

  watch(companyOne, (value) => {
    if (isObject(value) && Object.keys(value).length && value.brands[0] !== null) {
      brandsField.value.value = value.brands
    }
  })

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    btnBrandType.value = true
    createdBrandsData.value = values
  })

  onMounted(() => fetchCarBrandsAll())

  return {
    brands,
    brandsField,
    btnBrandType,
    companyRequired,
    loading,
    companyOne,
    isEdit,
    handleResetForm,
    handleFormSubmit
  }
}
