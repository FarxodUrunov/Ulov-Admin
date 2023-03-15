<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Field } from 'vee-validate'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import { useCachedUid } from '@/shared/composables/useCachedUid'
import type { FieldNames } from '@/shared/components/BaseMultiSelect/types'

const props = defineProps<{
  name: string
  label: string
  options: any[]
  fieldNames: FieldNames
  id?: string
}>()

const { t } = useI18n()
const { id: uid } = useCachedUid(props.name)
</script>

<template>
  <Field :name="name" v-slot="{ field, meta, errorMessage, handleChange }">
    <BaseMultiSelect
      :id="id || uid"
      :model-value="field.value as (string | number | undefined)[]"
      :name="name"
      :label="label"
      :options="options"
      :fieldNames="fieldNames"
      :success="meta.valid && meta.dirty"
      :error="!meta.valid && !!errorMessage"
      :message="errorMessage && t(errorMessage)"
      @update:model-value="handleChange"
    />
  </Field>
</template>
