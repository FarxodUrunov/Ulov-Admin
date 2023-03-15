<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/components/BaseTextarea/BaseTextarea.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import TheCarPhotoUpload from '@/shared/components/TheCarPhotoUpload/TheCarPhotoUpload.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import ServiceHistoryItem from './ServiceHistoryItem.vue'
import { useTranslations } from '../composables/useTranslations'
import { useServiceHistoryPostForm } from '../composables/useServiceHistoryPostForm'
import type { ImageModel } from '@/shared/components/BaseUpload/types'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  // data
  companyTypes,
  companies,
  clients,
  vehicles,
  statusList,
  serviceTypes,
  services,
  mechanics,
  // form
  companyType,
  companyId,
  clientId,
  vehicleId,
  status,
  mileage,
  history,
  total,
  comment,
  handleAddHistoryItem,
  handleDeleteHistoryItem,
  handleFormSubmit
} = useServiceHistoryPostForm()

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const images = ref<ImageModel[]>([])
</script>

<template>
  <BaseModal
    v-model="showModal"
    :header-text="t('addService')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.add')"
    @cancel="showModal = false"
    @confirm="handleFormSubmit"
  >
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <div class="grid lg:grid-cols-2 items-start gap-4 mb-4">
          <BaseSingleSelect
            id="select-companyType"
            v-model="companyType.value.value"
            name="select-companyType"
            :label="t('companyTypes')"
            :options="companyTypes"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="companyType.meta.valid && companyType.meta.dirty"
            :error="!companyType.meta.valid && !!companyType.errorMessage.value"
            :message="companyType.errorMessage.value && t(companyType.errorMessage.value)"
            data-test="select-companyType"
          />
          <BaseSingleSelect
            id="select-company"
            v-model="companyId.value.value"
            name="select-company"
            :label="t('form.companyName')"
            :options="companies"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="companyId.meta.valid && companyId.meta.dirty"
            :error="!companyId.meta.valid && !!companyId.errorMessage.value"
            :message="companyId.errorMessage.value && t(companyId.errorMessage.value)"
            data-test="select-company"
          />
          <BaseSingleSelect
            id="select-client"
            v-model="clientId.value.value"
            name="select-client"
            :label="t('form.clientPhone')"
            :options="clients"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="clientId.meta.valid && clientId.meta.dirty"
            :error="!clientId.meta.valid && !!clientId.errorMessage.value"
            :message="clientId.errorMessage.value && t(clientId.errorMessage.value)"
            data-test="select-client"
          />
          <BaseSingleSelect
            id="select-vehicle"
            v-model="vehicleId.value.value"
            name="select-vehicle"
            :label="t('form.vehicleNumber')"
            :options="vehicles"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="vehicleId.meta.valid && vehicleId.meta.dirty"
            :error="!vehicleId.meta.valid && !!vehicleId.errorMessage.value"
            :message="vehicleId.errorMessage.value && t(vehicleId.errorMessage.value)"
            data-test="select-vehicle"
          />
          <BaseSingleSelect
            id="select-status"
            v-model="status.value.value"
            name="select-status"
            :label="t('serviceStatus')"
            :options="statusList"
            :fieldNames="{ key: 'id', label: 'name' }"
            :success="status.meta.valid && status.meta.dirty"
            :error="!status.meta.valid && !!status.errorMessage.value"
            :message="status.errorMessage.value && t(status.errorMessage.value)"
            data-test="select-status"
          />
          <BaseInput
            id="mileage"
            v-model="mileage.value.value"
            name="mileage"
            type="number"
            :label="t('form.mileage')"
            :success="mileage.meta.valid && mileage.meta.dirty"
            :error="!mileage.meta.valid && !!mileage.errorMessage.value"
            :message="mileage.errorMessage.value && t(mileage.errorMessage.value)"
          >
            <template #suffix>
              <span class="text-dark-light leading-none">{{ t('units.km') }}</span>
            </template>
          </BaseInput>
        </div>
        <ServiceHistoryItem
          v-for="(item, itemIndex) in history"
          :key="item.key"
          :index="itemIndex"
          :data="{ serviceTypes, services, mechanics }"
          @delete="handleDeleteHistoryItem(itemIndex)"
        />
        <BaseButton
          variant="secondary"
          :icon="{ name: 'plus' }"
          class="mb-4"
          link
          @click="handleAddHistoryItem"
        >
          {{ t('addService') }}
        </BaseButton>

        <h2 class="text-lg font-bold text-dark-light mb-2">
          {{ t('additionalInfo') }}
        </h2>
        <div class="grid lg:grid-cols-2 items-start gap-4 mb-4">
          <BaseInput
            id="total"
            v-model="total.value.value"
            name="total"
            type="number"
            :label="t('form.totalCost')"
            :success="total.meta.valid && total.meta.dirty"
            :error="!total.meta.valid && !!total.errorMessage.value"
            :message="total.errorMessage.value && t(total.errorMessage.value)"
          >
            <template #suffix>
              <span class="text-dark-light leading-none">{{ t('units.uzs') }}</span>
            </template>
          </BaseInput>
          <BaseTextarea
            v-model="comment.value.value"
            name="comment"
            :placeholder="t('form.comment')"
            :rows="2"
            :success="comment.meta.valid && comment.meta.dirty"
            :error="!comment.meta.valid && !!comment.errorMessage.value"
            :message="comment.errorMessage.value && t(comment.errorMessage.value)"
          />
          <TheCarPhotoUpload
            v-model="images"
            :title="t('addCarPhotos')"
            :limitNumber="5"
            class="col-span-2 mt-2"
          />
        </div>
      </form>
    </template>
  </BaseModal>
</template>
