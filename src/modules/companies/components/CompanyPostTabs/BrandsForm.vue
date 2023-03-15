<script setup lang="ts">
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import PostFormActions from '../PostFormActions.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import { useBrandsForm } from '@/modules/companies/composables/useBrandsForm'

defineProps<{ confirmed?: boolean }>()

const emit = defineEmits(['cancel', 'submit'])

const { t } = useTranslations()
const {
  brands,
  brandsField,
  btnBrandType,
  companyRequired,
  loading,
  companyOne,
  isEdit,
  handleFormSubmit
} = useBrandsForm()
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <BaseMultiSelect
      id="servicedBrands"
      v-model="brandsField.value.value"
      name="servicedBrands"
      :field-names="{ key: 'id', label: 'name' }"
      :label="t('servicedBrands')"
      :options="brands"
      :success="brandsField.meta.valid && brandsField.meta.dirty"
      :error="!brandsField.meta.valid && !!brandsField.errorMessage.value"
      :message="brandsField.errorMessage.value && t(brandsField.errorMessage.value)"
    />
    <PostFormActions
      class="mt-6"
      v-model="btnBrandType"
      v-model:company="companyRequired"
      v-model:edit="isEdit"
      :cancel-text="t('buttons.cancel')"
      :confirm-text="t('buttons.save')"
      :add-text="Object.keys(companyOne).length ? t('buttons.change') : t('buttons.add')"
      :isLoading="loading"
      @click-cancel="emit('cancel')"
      @submit="emit('submit')"
    />
  </form>
</template>
