<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useColorForm } from '@/modules/clients/composables/settings/useColorForm'
import BaseTagInput from '@/shared/components/BaseTagInput/BaseTagInput.vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const {
  colours,
  search,
  tagModel,
  handleFormReset,
  handleFormSubmit,
  handleColorSearch,
  handleColorCreate,
  handleColorSelect
} = useColorForm()

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
    @confirm="handleFormSubmit"
    @cancel="showModal = false"
  >
    <template #body>
      <BaseTagInput
        id="colorName"
        v-model="tagModel"
        name="colorName"
        :searchTags="search"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.carColor')"
        :success="colours.meta.valid && colours.meta.dirty"
        :error="!colours.meta.valid && !!colours.errorMessage.value"
        :message="colours.errorMessage.value && t(colours.errorMessage.value)"
        @search="handleColorSearch"
        @create="handleColorCreate"
        @select="handleColorSelect"
      />
    </template>
  </BaseModal>
</template>
