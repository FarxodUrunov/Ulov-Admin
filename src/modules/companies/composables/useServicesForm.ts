import { computed, onMounted, ref, watch } from 'vue'
import { useFieldArray, useForm } from 'vee-validate'
import { type InferType, number, object, string, array } from 'yup'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/modules/companies/store/company'
import { useIinformationOfCompany } from '@/modules/companies/store/informationOfCompany'
import { isObject } from '@/shared/utils/index'

export const useServicesForm = () => {
  const store = useCompanyStore()
  const { btnServiceType, createdServiceData, loading, createCompanyData, companyOne } =
    storeToRefs(store)

  const infoStore = useIinformationOfCompany()
  const { fetchServicesTagAll } = infoStore
  const { services } = storeToRefs(infoStore)

  const companyRequired = computed(() =>
    Object.keys(createCompanyData.value).length > 0 ? true : false
  )
  const isEdit = computed(() => (Object.keys(companyOne.value).length > 0 ? true : false))

  const serviceNames = ref<{ id: number; name: string }[]>([])

  const serviceDetailSchema = object({
    price: string().required('formErrors.fieldRequired'),
    tag_ids: array(number())
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })

  const serviceSchema = object({
    tag_group_id: string().required('formErrors.fieldRequired'),
    tag_details: array(serviceDetailSchema).required('formErrors.fieldRequired')
  })

  const formSchema = object({
    tags: array(serviceSchema)
      .ensure()
      .min(1, 'formErrors.fieldRequired')
      .required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
    // initialValues: {
    //   tags: !Object.keys(companyOne.value).length ? [] : [{ tag_group_id: '', tag_details: [{ price: '', tag_ids: [] }] }]
    // }
  })

  const {
    fields: tags,
    push: pushService,
    remove: handleRemoveService
  } = useFieldArray<InferType<typeof serviceSchema>>('tags')

  watch(companyOne, (value) => {
    if (isObject(value) && Object.keys(value).length) {
      value.tags.forEach((item: any) => {
        pushService({ tag_group_id: item.tag_group_id, tag_details: item.tag_details })

        services.value.forEach((items) => {
          if (items.id === item.tag_group_id) {
            serviceNames.value = items.tags
          }
        })
      })
    }
  })

  const handleAddService = () => {
    pushService({ tag_group_id: '', tag_details: [{ price: '', tag_ids: [] }] })
  }

  const handleAddServiceDetail = (index: number) => {
    tags.value[index].value.tag_details.push({ price: '', tag_ids: [] })
  }

  const handleRemoveServiceDetail = (serviceIndex: number, serviceDetailIndex: number) => {
    tags.value[serviceIndex].value.tag_details.splice(serviceDetailIndex, 1)
  }

  const handleResetForm = () => {
    resetForm()
  }

  const handleFormSubmit = handleSubmit((values) => {
    createdServiceData.value = values
    btnServiceType.value = true
  })

  const handleSelectType = (val: any) => {
    serviceNames.value = val.tags
  }

  onMounted(() => fetchServicesTagAll())

  return {
    // data
    serviceNames,
    services,
    // form
    loading,
    btnServiceType,
    companyRequired,
    tags,
    companyOne,
    isEdit,
    handleSelectType,
    handleAddService,
    handleRemoveService,
    handleAddServiceDetail,
    handleRemoveServiceDetail,
    handleResetForm,
    handleFormSubmit
  }
}
