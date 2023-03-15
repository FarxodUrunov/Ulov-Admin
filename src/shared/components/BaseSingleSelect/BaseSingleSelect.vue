<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside, onKeyStroke, useElementSize } from '@vueuse/core'
import SelectList from './components/SelectList.vue'
import SelectInput from './components/SelectInput.vue'
import type { FieldNames } from './types'

const emit = defineEmits(['update:modelValue', 'select', 'search'])
const props = withDefaults(
  defineProps<{
    id: string
    name: string
    modelValue: any
    fieldNames: FieldNames
    placeholder?: string
    label?: string
    size?: 'lg' | 'md' | 'sm'
    mode?: 'filter' | ''
    message?: string
    error?: boolean
    success?: boolean
    disabled?: boolean
    search?: boolean
    searchPlaceHolder?: string
    loading?: boolean
    options?: Array<FieldNames | any>
  }>(),
  {
    placeholder: '',
    label: '',
    size: 'lg',
    mode: '',
    message: '',
    error: false,
    success: false,
    disabled: false,
    search: false,
    loading: false,
    searchPlaceHolder: 'Search...',
    options: () => []
  }
)

const open = ref(false)
const target = ref()
const searchTerm = ref('')

const { width } = useElementSize(target)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const items = computed(() =>
  props.options.map((option) => {
    if (value.value) {
      if (option[props.fieldNames.key] === value.value) {
        return { active: true, option }
      } else {
        return { active: false, option }
      }
    } else {
      return { active: false, option }
    }
  })
)

const inputValue = computed(() => {
  if (value.value) {
    let input = ''
    props.options.forEach((option) => {
      if (value.value) {
        if (option[props.fieldNames.key] === value.value) {
          input = option[props.fieldNames.label]
        }
      }
    })
    return input
  }
  return ''
})

watch(searchTerm, (term) => {
  emit('search', term)
})

const selectValue = (item: any) => {
  value.value = item[props.fieldNames.key]
  open.value = false
  emit('select', item)
}

const onPressEsc = () => {
  ;(target.value as unknown as HTMLDivElement).querySelector('input')?.blur()
  open.value = false
}

const switchOptions = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

const showOptions = () => {
  open.value = true
}

const handleClear = () => {
  value.value = undefined
  emit('select', undefined)
}

onClickOutside(target, () => {
  open.value = false
})

onKeyStroke(['Escape'], () => {
  if (open.value) onPressEsc()
})

onKeyStroke(['Tab'], () => {
  if (open.value) {
    open.value = false
  }
})
</script>

<template>
  <div ref="target" class="self-start relative" @focusin="showOptions">
    <SelectInput
      :id="id"
      :name="name"
      :label="label"
      :success="success"
      :disabled="disabled"
      :error="error"
      :size="size"
      :mode="mode"
      :message="message"
      :loading="loading"
      :show-arrow="!value && !loading"
      :show-close="!!(value && !loading)"
      :open="open"
      v-model="inputValue"
      @show="showOptions"
      @switch="switchOptions"
      @clear="handleClear"
    />
    <SelectList
      :id="id"
      :open="open"
      :search="search"
      :label="fieldNames.label"
      :searchPlaceHolder="searchPlaceHolder"
      :items="items"
      :container="target"
      :width="width"
      v-model="searchTerm"
      @select="selectValue"
    />
  </div>
</template>
