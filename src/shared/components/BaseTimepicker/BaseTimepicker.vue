<script setup lang="ts">
import { computed, ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import type { TimeModel } from './types'

const props = defineProps<{
  id: string
  name: string
  label: string
  modelValue?: any
  required?: boolean
  message?: string
  success?: boolean
  error?: boolean
  disabled?: boolean
  readonly?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const datepicker = ref()
const menuOpen = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const openDatepickerMenu = () => {
  datepicker.value?.openMenu()
}
</script>

<template>
  <Datepicker
    ref="datepicker"
    locale="en"
    v-model="value"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    menu-class-name="dp-custom-menu"
    position="left"
    mode-height="120"
    :clearable="false"
    auto-apply
    time-picker
    @open="menuOpen = true"
    @closed="menuOpen = false"
  >
    <template #dp-input="{ value }">
      <BaseInput
        :id="id"
        :name="name"
        :model-value="value"
        :label="label"
        :message="message"
        :success="success"
        :error="error"
        suffix="clockOutline"
        autocomplete="off"
        class="!cursor-default"
        label-variant="!cursor-default"
        :force-focus="menuOpen"
        readonly
        @keydown.enter="openDatepickerMenu"
      />
    </template>
  </Datepicker>
</template>

<style>
.dp-custom-menu.dp__theme_light {
  --dp-text-color: #333333;
  --dp-hover-color: #f2f2f2;
  --dp-hover-text-color: #333333;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #04009a;
  --dp-primary-text-color: #ffffff;
}

.dp__menu.dp-custom-menu {
  min-width: 200px;
  padding: 0.25rem;
  border-radius: 8px;
}

.dp-custom-menu .dp__overlay_cell_pad {
  padding: 0.25rem 0;
}

.dp-custom-menu .dp__time_col_reg {
  padding: 0 0.75rem;
}

.dp-custom-menu .dp__button {
  padding: 0.25rem;
  height: unset !important;
}

.dp-custom-menu .dp__button svg {
  width: 18px;
}
</style>
