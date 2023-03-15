<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import SingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import SubscriptionFeature from './SubscriptionFeature.vue'
import { useTranslations } from '../composables/useTranslations'
import { useSubscriptionModal } from '../composables/useSubscriptionModal'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  loading,
  tariffName,
  price,
  time,
  features,
  handleAddFeature,
  handleDeleteFeature,
  handleFormReset,
  handleFormSubmit
} = useSubscriptionModal()

const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
    handleFormReset()
  }
})
</script>

<template>
  <BaseModal
    data-test="subscription-modal"
    v-model="showModal"
    :header-text="t('addTariff')"
    :confirm-loading="loading"
    :cancel-loading="loading"
    :hide-close-button="loading"
    :static="loading"
    size="lg"
    :cancelText="t('buttons.cancel')"
    :confirmText="t('buttons.add')"
    @confirm="handleFormSubmit"
    @cancel="showModal = false"
  >
    <template #body>
      <div>
        <form class="flex flex-col lg:grid grid-cols-4 gap-4 rounded-lg bg-gray-light p-3">
          <div class="col-span-2">
            <BaseInput
              id="tariffName"
              v-model="tariffName.value.value"
              name="tariffName"
              :label="t('tariffName')"
              type="text"
              :success="tariffName.meta.valid && tariffName.meta.dirty"
              :error="!tariffName.meta.valid && !!tariffName.errorMessage.value"
              :message="tariffName.errorMessage.value && t(tariffName.errorMessage.value)"
            />
          </div>
          <div>
            <BaseInput
              id="price"
              v-model="price.value.value"
              name="price"
              :label="t('form.price')"
              type="text"
              :success="price.meta.valid && price.meta.dirty"
              :error="!price.meta.valid && !!price.errorMessage.value"
              :message="price.errorMessage.value && t(price.errorMessage.value)"
            />
          </div>
          <SingleSelect
            id="time"
            v-model="time.value.value"
            name="time"
            :label="t('form.time')"
            :options="[]"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="time.meta.valid && time.meta.dirty"
            :error="!time.meta.valid && !!time.errorMessage.value"
            :message="time.errorMessage.value && t(time.errorMessage.value)"
          />
        </form>
        <SubscriptionFeature
          v-for="(item, itemIndex) in features"
          :key="item.key"
          :index="itemIndex"
          @delete="handleDeleteFeature(itemIndex)"
        />
        <div class="mt-4">
          <BaseButton
            data-test="add-button"
            class="bg-success/20 duration-300 hover:bg-success/30 text-success w-full mb-6"
            size="lg"
            variant="none"
            :icon="{
              name: 'plus',
              position: 'left',
              className: 'text-success w-7 h-7 mr-3'
            }"
            @click="handleAddFeature"
          >
            {{ t('featureName') }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
