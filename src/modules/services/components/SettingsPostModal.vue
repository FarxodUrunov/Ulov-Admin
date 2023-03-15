<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import BaseTagInput from '@/shared/components/BaseTagInput/BaseTagInput.vue'
import { useSettingsForm } from '../composables/useSettingsForm'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const {
  // data
  services,
  // form
  photo,
  serviceId,
  serviceName,
  subServices,
  handleCreate,
  handleFormSubmit
} = useSettingsForm()
</script>

<template>
  <BaseModal
    v-model="showModal"
    :headerText="t('buttons.addService')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.add')"
    @confirm="handleFormSubmit"
    @cancel="showModal = false"
  >
    <template #body>
      <form data-test="profile-form" @submit.prevent="handleFormSubmit">
        <BaseUpload
          v-model="photo.value.value"
          :accept="['png', 'jpg', 'jpeg', 'webp']"
          :description="t('downloadLogo')"
          :success="photo.meta.valid && photo.meta.dirty"
          :error="!photo.meta.valid && !!photo.errorMessage.value"
          :message="photo.errorMessage.value && t(photo.errorMessage.value)"
        />
        <div class="grid lg:grid-cols-2 items-start gap-6 my-6">
          <BaseSingleSelect
            id="service"
            v-model="serviceId.value.value"
            name="service"
            :label="t('form.serviceType')"
            :options="services"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="serviceId.meta.valid && serviceId.meta.dirty"
            :error="!serviceId.meta.valid && !!serviceId.errorMessage.value"
            :message="serviceId.errorMessage.value && t(serviceId.errorMessage.value)"
          />
          <BaseInput
            id="serviceName"
            v-model="serviceName.value.value"
            name="serviceName"
            :label="t('form.serviceName')"
            :success="serviceName.meta.valid && serviceName.meta.dirty"
            :error="!serviceName.meta.valid && !!serviceName.errorMessage.value"
            :message="serviceName.errorMessage.value && t(serviceName.errorMessage.value)"
          />
        </div>
        <BaseTagInput
          id="subServices"
          v-model="subServices.value.value"
          name="subServices"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('subServices')"
          :success="subServices.meta.valid && subServices.meta.dirty"
          :error="!subServices.meta.valid && !!subServices.errorMessage.value"
          :message="subServices.errorMessage.value && t(subServices.errorMessage.value)"
          @create="handleCreate"
        />
      </form>
    </template>
  </BaseModal>
</template>
