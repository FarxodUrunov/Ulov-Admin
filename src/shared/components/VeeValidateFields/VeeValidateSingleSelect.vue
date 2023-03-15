<script setup lang="ts">
import { Field } from 'vee-validate'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import type { FieldNames } from '@/shared/components/BaseMultiSelect/types'

defineProps<{
  id: string
  name: string
  label: string
  options: any[]
  fieldNames: FieldNames
}>()
</script>

<template>
  <Field :name="name" v-slot="{ field, meta, errorMessage, handleChange }">
    <BaseSingleSelect
      :model-value="field.value as (string | number | undefined)[]"
      :id="id"
      :name="name"
      :label="label"
      :options="options"
      :fieldNames="fieldNames"
      :success="meta.valid && meta.dirty"
      :error="!meta.valid && !!errorMessage"
      :message="errorMessage"
      @update:model-value="handleChange"
    />
  </Field>
</template>
