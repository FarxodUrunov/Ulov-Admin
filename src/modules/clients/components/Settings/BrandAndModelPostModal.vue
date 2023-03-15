<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useBrandAndModelForm } from '@/modules/clients/composables/settings/useBrandAndModelForm'
import BaseTagInput from '@/shared/components/BaseTagInput/BaseTagInput.vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const {
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
} = useBrandAndModelForm()

const showModal = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
    if (!value) handleFormReset()
  }
})
</script>

<template>
  <BaseModal
    v-model="showModal"
    :headerText="t('buttons.add')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.save')"
    @cancel="showModal = false"
    @confirm="handleFormSubmit"
  >
    <template #body>
      <BaseUpload
        v-model="photo.value.value"
        :accept="['png', 'jpg', 'jpeg', 'webp']"
        :description="t('uploadModelPhoto')"
        :success="photo.meta.valid && photo.meta.dirty"
        :error="!photo.meta.valid && !!photo.errorMessage.value"
        :message="photo.errorMessage.value && t(photo.errorMessage.value)"
      />
      <form
        data-test="setting-model-form"
        class="grid lg:grid-cols-2 items-start gap-6 mt-6"
        @submit.prevent="handleFormSubmit"
      >
        <BaseInput
          id="carBrand"
          v-model="carBrand.value.value"
          name="carBrand"
          :label="t('form.carBrand')"
          :success="carBrand.meta.valid && carBrand.meta.dirty"
          :error="!carBrand.meta.valid && !!carBrand.errorMessage.value"
          :message="carBrand.errorMessage.value && t(carBrand.errorMessage.value)"
        />
        <BaseTagInput
          id="modelName"
          v-model="tagModel"
          name="modelName"
          :searchTags="search"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.carModel')"
          :success="models.meta.valid && models.meta.dirty"
          :error="!models.meta.valid && !!models.errorMessage.value"
          :message="models.errorMessage.value && t(models.errorMessage.value)"
          @search="handleModelSearch"
          @create="handleModelCreate"
          @select="handleModelSelect"
        />
      </form>
    </template>
  </BaseModal>
</template>
