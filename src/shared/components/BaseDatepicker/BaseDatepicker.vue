<script setup lang="ts">
import { computed, ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
  modelValue: any
  id: string
  name: string
  label: string
  required?: boolean
  message?: string
  success?: boolean
  error?: boolean
  disabled?: boolean
  readonly?: boolean
  autoApply?: boolean
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

const formatDate = (date: Date | Date[]) => {
  const format = 'DD.MM.YYYY'
  if (Array.isArray(date)) {
    return date.reduce((prev: string, curr, index) => {
      const space = index === 0 ? '' : ', '
      return prev.concat(space + useDateFormat(curr, format).value)
    }, '')
  }
  return useDateFormat(date, format).value
}
</script>

<template>
  <Datepicker
    :uid="id"
    ref="datepicker"
    locale="en"
    v-model="value"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    menu-class-name="dp-custom-menu"
    position="left"
    :format="formatDate"
    autocomplete="off"
    :clearable="false"
    :auto-apply="autoApply"
    :enable-time-picker="false"
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
        autocomplete="off"
        class="!cursor-default"
        label-variant="!cursor-default"
        :force-focus="menuOpen"
        readonly
        @keydown.enter="openDatepickerMenu"
      >
        <template #suffix>
          <BaseIcon name="calendarOutline" class="w-5 h-5 text-primary cursor-pointer" />
        </template>
      </BaseInput>
    </template>
    <template #arrow-left>
      <BaseIcon name="arrowLeft" />
    </template>
    <template #arrow-right>
      <BaseIcon name="arrowBottom" class="-rotate-90" />
    </template>
    <template v-if="!autoApply" #action-row="{ selectDate }">
      <div class="flex justify-center items-center p-1">
        <BaseButton class="w-full !rounded-lg" size="sm" outlined @click="selectDate">
          Выбрать дату
        </BaseButton>
      </div>
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

.dp__input_icon {
  left: unset;
  right: 0;
}

.dp__input_icon_pad {
  padding-left: 12px;
  padding-right: 35px;
}

.dp-custom-menu {
  padding: 0.25rem;
  border-radius: 0.5rem;
}

.dp__main,
.dp-custom-menu,
.dp-custom-menu .dp__calendar_wrap {
  font-family: 'Inter', sans-serif !important;
}

.dp-custom-menu .dp__calendar_row {
  margin: 0.25rem 0;
}

.dp-custom-menu .dp__calendar_header {
  font-weight: 600;
}

.dp-custom-menu .dp__inner_nav {
  width: 30px;
  height: 30px;
}

.dp-custom-menu .dp__today {
  border-width: 2px;
}

.dp-custom-menu .dp__month_year_row {
  gap: 0.5rem;
  height: unset;
}

.dp-custom-menu .dp__month_year_select {
  height: auto;
  padding: 0.25rem;
}

.dp-custom-menu .dp__calendar_header_item,
.dp-custom-menu .dp__calendar_item {
  margin-inline: 0.125rem;
}
</style>
