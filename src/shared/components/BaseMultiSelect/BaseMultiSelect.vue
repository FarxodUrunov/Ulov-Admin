<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside, onKeyStroke, useElementSize } from '@vueuse/core'
import SelectedItems from './components/SelectedItems.vue'
import SelectList from './components/SelectList.vue'
import SelectInput from './components/SelectInput.vue'
import type { FieldNames } from './types'

const props = withDefaults(
  defineProps<{
    id: string
    name: string
    modelValue: (string | number | undefined)[]
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
    searchLoading?: boolean
    options?: Array<FieldNames | any>
    deletable?: boolean
    selectedNumber?: boolean
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
    searchLoading: false,
    searchPlaceHolder: 'Search...',
    deletable: false,
    selectedNumber: false,
    options: () => []
  }
)
const emit = defineEmits(['update:modelValue', 'select', 'search'])

const open = ref(false)
const openItems = ref(false)
const target = ref()
const inputValue = ref(props.modelValue.length ? ' ' : '')
const searchTerm = ref('')
const isSelectAll = ref(false)

const { width } = useElementSize(target)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const items = computed(() => {
  const updatedIdToSelected = new Set([...value.value])
  return props.options.map((option) => {
    if (value.value.length) {
      if (updatedIdToSelected.has(option[props.fieldNames.key])) {
        return { active: true, option }
      } else {
        return { active: false, option }
      }
    } else {
      return { active: false, option: option }
    }
  })
})

const selectedItems = computed(() => {
  if (value.value.length) {
    const ids = new Set([...value.value])
    const selecteds = props.options.filter((option) => ids.has(option[props.fieldNames.key]))
    emit('select', selecteds)
    return selecteds
  }
  emit('select', [])
  return []
})

const indeterminate = computed(() => {
  if (items.value.length === selectedItems.value.length) {
    return false
  } else {
    return selectedItems.value.length !== 0
  }
})

watch(searchTerm, (term) => {
  emit('search', term)
})

const selectValue = (item: any) => {
  const updatedIdToSelected: any = new Set([...value.value])
  if (updatedIdToSelected.has(item[props.fieldNames.key])) {
    if (!props.deletable) {
      updatedIdToSelected.delete(item[props.fieldNames.key])
      isSelectAll.value = false
    }
  } else {
    updatedIdToSelected.add(item[props.fieldNames.key])
  }
  if (updatedIdToSelected.size) {
    inputValue.value = ' '
  } else {
    inputValue.value = ''
  }
  value.value = [...updatedIdToSelected]
  if (updatedIdToSelected.size === items.value.length) isSelectAll.value = true
}

const handleSelectAll = () => {
  isSelectAll.value = !isSelectAll.value
  if (isSelectAll.value) {
    inputValue.value = ' '
    value.value = props.options.map((option) => option[props.fieldNames.key])
  } else {
    if (!props.deletable) {
      value.value = []
      inputValue.value = ''
    }
  }
}

const onPressEsc = () => {
  ;(target.value as unknown as HTMLDivElement).querySelector('input')?.blur()
  open.value = false
  openItems.value = false
}

const switchOptions = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

const showOptions = () => {
  ;(target.value as unknown as HTMLDivElement).querySelector('input')?.focus()
  open.value = true
}

const handleOpen = () => {
  open.value = true
}

const handleClear = () => {
  value.value = []
  inputValue.value = ''
  isSelectAll.value = false
  emit('select', [])
}

const switchOpenItems = () => {
  openItems.value = !openItems.value
}

onClickOutside(target, () => {
  open.value = false
  openItems.value = false
})

onKeyStroke(['Escape'], () => {
  if (open.value) onPressEsc()
})

onKeyStroke(['Tab'], () => {
  if (open.value) {
    switchOptions()
  }
})
</script>

<template>
  <div ref="target" class="self-start relative" @focusin="handleOpen">
    <SelectedItems
      :mode="mode"
      :disabled="disabled"
      :selectedItems="selectedItems"
      :openItems="openItems"
      :label="fieldNames.label"
      :selected-numbers="selectedNumber"
      @switch="switchOpenItems"
      @show="showOptions"
      @select="selectValue"
    />
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
      :show-arrow="!value.length && !loading"
      :show-close="!!(value.length && !loading)"
      :open="open"
      v-model="inputValue"
      @show="showOptions"
      @switch="switchOptions"
      @clear="handleClear"
    />
    <SelectList
      :id="id"
      :name="name"
      :open="open"
      :search="search"
      :searchPlaceHolder="searchPlaceHolder"
      :label="fieldNames.label"
      :items="items"
      :searchLoading="searchLoading"
      :indeterminate="indeterminate"
      :container="target"
      :width="width"
      v-model="searchTerm"
      v-model:isSelectAll="isSelectAll"
      @select="selectValue"
      @handle-all="handleSelectAll"
    />
  </div>
</template>
