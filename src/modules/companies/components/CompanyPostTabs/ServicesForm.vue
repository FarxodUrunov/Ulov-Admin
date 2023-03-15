<script setup lang="ts">
import { Field } from 'vee-validate'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import PostFormActions from '../PostFormActions.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import { useServicesForm } from '@/modules/companies/composables/useServicesForm'

const emit = defineEmits(['cancel', 'submit'])

const { t } = useTranslations()
const {
  serviceNames,
  services,
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
  handleFormSubmit
} = useServicesForm()
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <div
      v-for="(service, serviceIndex) in tags"
      :key="service?.key"
      class="flex flex-col gap-3 md:gap-2 lg:grid grid-cols-12 bg-gray-light rounded-lg p-3 mb-3 last:mb-0"
    >
      <div class="flex flex-col gap-3" :class="tags?.length === 1 ? 'col-span-12' : 'col-span-11'">
        <Field
          :name="`tags[${serviceIndex}].tag_group_id`"
          v-slot="{ field, meta, errorMessage, handleChange }"
        >
          <BaseSingleSelect
            @select="handleSelectType"
            :id="`service-${serviceIndex}`"
            :name="`tags[${serviceIndex}].tag_group_id`"
            :label="t('form.serviceType')"
            :options="services"
            :field-names="{ key: 'id', label: 'title' }"
            :success="meta.valid && meta.dirty"
            :error="!meta.valid && !!errorMessage"
            :message="errorMessage && t(errorMessage)"
            @update:model-value="handleChange"
            :model-value="field.value as (string | number | undefined)[]"
          />
        </Field>

        <div
          class="flex items-start gap-2"
          v-for="(_, serviceDetailIndex) in service.value.tag_details"
          :key="serviceDetailIndex"
        >
          <div class="flex-1 grid grid-cols-10 gap-2">
            <div class="col-span-10 md:col-span-5">
              <Field
                :name="`tags[${serviceIndex}].tag_details[${serviceDetailIndex}].tag_ids`"
                v-slot="{ field, meta, errorMessage, handleChange }"
              >
                <BaseMultiSelect
                  :id="`servicetip-${serviceIndex}-${serviceDetailIndex}`"
                  :name="`tags[${serviceIndex}].tag_details[${serviceDetailIndex}].tag_ids`"
                  :label="t('form.serviceName')"
                  :field-names="{ key: 'id', label: 'name' }"
                  :options="serviceNames"
                  :success="meta.valid && meta.dirty"
                  :error="!meta.valid && !!errorMessage"
                  :message="errorMessage && t(errorMessage)"
                  @update:model-value="handleChange"
                  :model-value="field.value as (string | number | undefined)[]"
                />
              </Field>
            </div>
            <div class="col-span-10 md:col-span-5">
              <Field
                :name="`tags[${serviceIndex}].tag_details[${serviceDetailIndex}].price`"
                v-slot="{ field, meta, errorMessage, handleChange }"
              >
                <BaseInput
                  :id="`price-${serviceIndex}-${serviceDetailIndex}`"
                  :model-value="field.value"
                  type="number"
                  :name="`tags[${serviceIndex}].tag_details[${serviceDetailIndex}].price`"
                  :label="t('form.price')"
                  :success="meta.valid && meta.dirty"
                  :error="!meta.valid && !!errorMessage"
                  :message="errorMessage && t(errorMessage)"
                  @update:model-value="handleChange"
                />
              </Field>
            </div>
          </div>
          <div class="self-start">
            <BaseButton
              v-if="serviceDetailIndex === service.value.tag_details.length - 1"
              class="w-10 h-10 lg:w-14 lg:h-14 !min-h-0 bg-primary/10 group hover:bg-primary outline-none border-none !p-0 !m-0"
              variant="none"
              @click="handleAddServiceDetail(serviceIndex)"
            >
              <BaseIcon name="plus" class="text-blue-300 group-hover:text-white w-5 h-5" />
            </BaseButton>
            <BaseButton
              v-else
              class="w-10 h-10 lg:w-14 lg:h-14 !min-h-0 bg-error/20 group hover:bg-error outline-none border-none !p-0 !m-0"
              variant="none"
              @click="handleRemoveServiceDetail(serviceIndex, serviceDetailIndex)"
            >
              <BaseIcon
                name="minus"
                class="w-4 h-4 text-error group-hover:text-white"
                view-box="0 0 16 2"
              />
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="col-span-1" v-if="tags.length > 1">
        <BaseButton
          class="h-full w-full bg-error/20 group hover:bg-error outline-none border-none !p-2"
          variant="none"
          @click="handleRemoveService(serviceIndex)"
        >
          <BaseIcon name="deleteOutline" class="text-error group-hover:text-white w-6 h-6" />
        </BaseButton>
      </div>
    </div>
    <div class="border-t border-t-1 mt-6 mb-2 text-gray-light">
      <BaseButton
        class="bg-success duration-300 hover:bg-success/75 text-white w-full mb-6"
        size="lg"
        variant="none"
        :icon="{
          name: 'plus',
          position: 'left',
          className: 'text-white w-7 h-7 mr-3'
        }"
        @click="handleAddService"
      >
        {{ t('buttons.addService') }}
      </BaseButton>
    </div>
    <PostFormActions
      v-model="btnServiceType"
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
