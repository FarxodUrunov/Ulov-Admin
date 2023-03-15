<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { computed, onBeforeMount, ref, watch } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { type Instance as PopperInstance, createPopper } from '@popperjs/core'

type Field = {
  key: string
  label: string
}

const props = withDefaults(
  defineProps<{
    id: string
    value: string
    fieldNames: Field
    items: Array<any>
    isFocused: boolean
    label?: string
    disabled?: boolean
    readonly?: boolean
    container: any
    width: number
  }>(),
  {
    disabled: false,
    readonly: false
  }
)
const emit = defineEmits(['select', 'create', 'focus'])

const menu = ref()
const activeIndex = ref(-1)
const tooltip = ref<HTMLElement | null>(null)
const instance = ref<PopperInstance | null>(null)

const open = computed(() => props.items.length && props.value && props.isFocused)

watch(
  () => props.items.length,
  () => {
    activeIndex.value = -1
  }
)

watch(
  () => open.value,
  (val) => {
    if (!val || !props.container || !tooltip.value) return

    if (instance.value) {
      instance.value.destroy()
      instance.value = null
    }

    instance.value = createPopper(props.container, tooltip.value, {
      strategy: 'fixed',
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 6]
          }
        },
        {
          name: 'computeStyles',
          options: {
            gpuAcceleration: false,
            adaptive: true
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 10
          }
        }
      ]
    })
  }
)

onBeforeMount(() => {
  if (instance.value) {
    instance.value.destroy()
    instance.value = null
  }
})

const resetScrollTop = () => {
  const optionsEl = menu.value
  const optionEl = menu.value?.querySelector(`#select-${props.id}-${activeIndex.value}`)
  if (optionEl && optionsEl) {
    const bottomOverflowDistance =
      optionEl.getBoundingClientRect().bottom - optionsEl.getBoundingClientRect().bottom
    const topOverflowDistance =
      optionEl.getBoundingClientRect().top - optionsEl.getBoundingClientRect().top
    if (bottomOverflowDistance > 0) {
      optionsEl.scrollTop += bottomOverflowDistance
    }
    if (topOverflowDistance < 0) {
      optionsEl.scrollTop += topOverflowDistance
    }
  }
}

const changeActive = (direction: string) => {
  if (!props.items.length) return
  const options = props.items
  if (direction === 'next') {
    activeIndex.value += 1
    if (activeIndex.value === options.length) {
      activeIndex.value = 0
    }
    resetScrollTop()
  }
  if (direction === 'prev') {
    activeIndex.value -= 1
    if (activeIndex.value < 0) {
      activeIndex.value = options.length - 1
    }
    resetScrollTop()
  }
}

onKeyStroke(['ArrowUp'], () => {
  if (props.isFocused) changeActive('prev')
})

onKeyStroke(['ArrowDown'], () => {
  if (props.isFocused) changeActive('next')
})

onKeyStroke(['Enter'], () => {
  if (props.isFocused) {
    if (activeIndex.value >= 0) {
      emit('select', props.items[activeIndex.value].tag)
    } else {
      emit('create')
    }
  }
})
</script>

<template>
  <transition
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="open"
      class="z-modal bg-white rounded-md shadow-dragdrop ring-opacity-5 focus:outline-none"
      :style="{ width: `${width}px` }"
      ref="tooltip"
    >
      <div class="overflow-auto max-h-60 mt-1" ref="menu">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative cursor-pointer select-none px-2.5 py-2 hover:bg-gray-light my-1"
          :class="[activeIndex === index ? 'bg-gray-light' : '']"
          :id="`select-${id}-${index}`"
          data-test="list"
          @click="
            () => {
              emit('focus')
              emit('select', item.tag)
            }
          "
        >
          <div class="flex items-center gap-2">
            <BaseIcon
              v-if="item.active"
              name="checkOutline"
              class="w-4 h-3 text-primary"
              view-box="0 0 16 15"
            />
            <span
              class="truncate text-sm cursor-pointer"
              :class="item.active ? 'text-black font-medium' : 'ml-6 text-dark-light font-normal'"
              >{{ item.tag[fieldNames.label] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
