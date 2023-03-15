<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside, onKeyStroke, useElementSize } from '@vueuse/core'
import TagInput from './components/TagInput.vue'
import TagList from './components/TagList.vue'

const props = withDefaults(
  defineProps<{
    id: string
    name: string
    modelValue: Array<any>
    fieldNames: { key: string; label: string }
    searchTags?: Array<any>
    label?: string
    size?: 'lg' | 'md' | 'sm'
    error?: boolean
    success?: boolean
    disabled?: boolean
    message?: string
    readonly?: boolean
  }>(),
  {
    size: 'lg',
    error: false,
    success: false,
    disabled: false,
    readonly: false,
    searchTags: () => []
  }
)
const emit = defineEmits(['update:modelValue', 'search', 'select', 'create'])

const target = ref()
const value = ref('')
const isFocused = ref(false)

const { width } = useElementSize(target)

const tagValues = computed({
  get() {
    return props.modelValue
  },
  set(tagValues) {
    emit('update:modelValue', tagValues)
  }
})

const items = computed(() => {
  const updatedIdToSelected = new Set([...tagValues.value.map((el) => el[props.fieldNames.key])])
  const allItems = props.searchTags.map((tag) => {
    if (tagValues.value && tagValues.value.length) {
      if (updatedIdToSelected.has(tag[props.fieldNames.key])) {
        return { active: true, tag }
      } else {
        return { active: false, tag }
      }
    } else {
      return { active: false, tag }
    }
  })
  return allItems
})

watch(tagValues.value, () => {
  emit(
    'select',
    tagValues.value.map((el) => el[props.fieldNames.key])
  )
})

watch(value, (term) => {
  emit('search', term)
})

const selectValue = (item: any) => {
  const updatedIdToSelected = new Set([...tagValues.value.map((el) => el[props.fieldNames.key])])
  if (updatedIdToSelected.has(item[props.fieldNames.key])) {
    tagValues.value = tagValues.value.filter(
      (el) => el[props.fieldNames.key] !== item[props.fieldNames.key]
    )
  } else {
    tagValues.value.push(item)
  }
}

const handleCreate = () => {
  if (value.value) {
    emit('create', value.value)
    value.value = ''
  }
}

const handleFocus = (focusStatus: boolean) => {
  isFocused.value = focusStatus
}

onClickOutside(target, () => {
  handleFocus(false)
})

onKeyStroke(['Escape'], () => {
  handleFocus(false)
})

onKeyStroke(['Backspace'], () => {
  if (!value.value) {
    if (tagValues.value.length && isFocused.value) {
      tagValues.value.pop()
    }
  }
})

onKeyStroke(['Tab'], () => {
  if (isFocused.value) {
    handleFocus(false)
  }
})
</script>

<template>
  <div ref="target" class="relative" @focusin="handleFocus(true)">
    <TagInput
      :id="id"
      :name="name"
      :label="label"
      :is-focused="isFocused"
      :error="error"
      :success="success"
      :disabled="disabled"
      :readonly="readonly"
      :key-value="fieldNames.label"
      :tag-values="tagValues"
      :message="message"
      :size="size"
      v-model="value"
      @select="selectValue"
    />
    <TagList
      :id="id"
      :items="items"
      :field-names="fieldNames"
      :value="value"
      :is-focused="isFocused"
      :container="target"
      :width="width"
      @select="selectValue"
      @create="handleCreate"
    />
  </div>
</template>
