<script setup lang="ts">
import { Field } from 'vee-validate'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import { useTranslations } from '../composables/useTranslations'

defineProps<{
  index: number
  data: {
    serviceTypes: Array<{ id: number; name: string }>
    services: Array<{ id: number; name: string }>
    mechanics: Array<{ id: number; name: string }>
  }
}>()
const emit = defineEmits(['delete'])

const { t } = useTranslations()
</script>

<template>
  <div class="my-4">
    <div class="flex flex-wrap items-center gap-2 mb-2">
      <h2 class="flex-1 text-lg font-bold text-dark-light">
        {{ t('app.service') }} №{{ index + 1 }}
      </h2>
      <BaseButton
        variant="error"
        :icon="{ name: 'minus', className: 'w-4 h-4', viewBox: '0 0 16 2' }"
        link
        @click="emit('delete')"
      >
        {{ t('cancelService') }}
      </BaseButton>
    </div>
    <div class="grid lg:grid-cols-2 items-start gap-4">
      <Field
        :name="`history[${index}].service_type`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseSingleSelect
          :model-value="field.value"
          data-test="select-serviceType"
          id="select-serviceType"
          name="select-serviceType"
          :label="t('form.serviceType')"
          :options="data.serviceTypes"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>

      <Field
        :name="`history[${index}].service_id`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseSingleSelect
          :model-value="field.value"
          data-test="select-service"
          id="select-service"
          name="select-service"
          :label="t('form.serviceName')"
          :options="data.services"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>

      <Field
        :name="`history[${index}].spare_part`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseInput
          :model-value="field.value"
          :id="`history[${index}].spare_part`"
          :name="`history[${index}].spare_part`"
          :label="t('sparePartType')"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>

      <Field
        :name="`history[${index}].next_km`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseInput
          :model-value="field.value"
          :id="`history[${index}].next_km`"
          :name="`history[${index}].next_km`"
          type="number"
          :label="t('nextMileage')"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        >
          <template #suffix>
            <span class="text-dark-light leading-none">{{ t('units.km') }}</span>
          </template>
        </BaseInput>
      </Field>

      <Field
        :name="`history[${index}].mechanic_id`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseSingleSelect
          :model-value="field.value"
          data-test="select-mechanic"
          id="select-mechanic"
          name="select-mechanic"
          :label="t('mechanicName')"
          :options="data.mechanics"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>

      <Field :name="`history[${index}].price`" v-slot="{ field, meta, errorMessage, handleChange }">
        <BaseInput
          :model-value="field.value"
          :id="`history[${index}].price`"
          :name="`history[${index}].price`"
          type="number"
          :label="t('form.serviceCost')"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        >
          <template #suffix>
            <span class="text-dark-light leading-none">{{ t('units.uzs') }}</span>
          </template>
        </BaseInput>
      </Field>
    </div>
  </div>
</template>
