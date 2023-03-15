<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Field } from 'vee-validate'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import { useCachedUid } from '@/shared/composables/useCachedUid'

const props = defineProps<{
  name: string
  label: string
  id?: string
  type?: 'text' | 'number'
}>()

const { t } = useI18n()
const { id: uid } = useCachedUid(props.name)
</script>

<template>
  <Field :name="name" v-slot="{ field, meta, errorMessage, handleChange }">
    <BaseInput
      :id="id || uid"
      :model-value="field.value"
      :type="type"
      :name="name"
      :label="label"
      :success="meta.valid && meta.dirty"
      :error="!meta.valid && !!errorMessage"
      :message="errorMessage && t(errorMessage)"
      @update:model-value="handleChange"
    />
  </Field>
</template>
