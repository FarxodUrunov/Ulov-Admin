<script setup lang="ts">
import { Field } from 'vee-validate'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import { useTranslations } from '../composables/useTranslations'

defineProps<{ index: number }>()
const emit = defineEmits(['delete'])

const { t } = useTranslations()

const items = [
  { id: 1, name: 'John ' },
  { id: 2, name: 'Doe' },
  { id: 3, name: 'Jack' }
]
</script>

<template>
  <div
    data-test="features"
    class="flex flex-col gap-3 lg:grid grid-cols-12 md:gap-5 rounded-lg bg-gray-light my-4 p-3"
  >
    <div class="col-span-11 flex flex-col gap-3">
      <Field
        :name="`features[${index}].feature_name`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseInput
          :id="`features[${index}].feature_name`"
          :model-value="field.value"
          :name="`features[${index}].feature_name`"
          :label="t('featureName')"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>
      <Field
        :name="`features[${index}].feature`"
        v-slot="{ field, meta, errorMessage, handleChange }"
      >
        <BaseMultiSelect
          :id="`features[${index}].feature`"
          :model-value="field.value as (string | number | undefined)[]"
          :name="`features[${index}].feature`"
          :label="t('feature')"
          :options="items"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="meta.valid && meta.dirty"
          :error="!meta.valid && !!errorMessage"
          :message="errorMessage && t(errorMessage)"
          @update:model-value="handleChange"
        />
      </Field>
    </div>
    <BaseButton
      :data-test="`delete-button-${index}`"
      class="duration-300 rounded-lg active:bg-error/20 hover:bg-error/10 !p-2 w-full lg:max-w-[65px]"
      size="none"
      variant="none"
      :icon="{
        name: 'deleteOutline',
        position: 'left',
        className: 'text-error w-6 h-6'
      }"
      :has-default-slot="false"
      @click="emit('delete')"
    />
  </div>
</template>
