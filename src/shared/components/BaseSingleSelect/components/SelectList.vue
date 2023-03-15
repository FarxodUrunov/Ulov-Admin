<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { type Instance as PopperInstance, createPopper } from '@popperjs/core'

const props = defineProps<{
  id: string
  open: boolean
  search: boolean
  modelValue: string
  searchPlaceHolder: string
  label: string
  items: Array<any>
  container: any
  width: number
}>()
const emit = defineEmits(['select', 'handleAll', 'update:modelValue', 'update:isSelectAll'])

const menu = ref()
const activeIndex = ref(-1)
const tooltip = ref<HTMLElement | null>(null)
const instance = ref<PopperInstance | null>(null)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watch(
  () => props.open,
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

const selectOption = () => {
  if (activeIndex.value !== -1) {
    emit('select', props.items[activeIndex.value].option)
    activeIndex.value = -1
  }
}

const changeActive = (direction: string) => {
  if (!props.open) return
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
  if (props.open) changeActive('prev')
})

onKeyStroke(['ArrowDown'], () => {
  if (props.open) changeActive('next')
})

onKeyStroke(['Enter'], () => {
  if (props.open) selectOption()
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
      <div v-if="search" class="mt-2 mb-1 px-2">
        <BaseFilterInput
          :id="`search-${id}`"
          :name="`search-name-${id}`"
          v-model="value"
          search
          :placeHolder="searchPlaceHolder"
        />
      </div>
      <div v-if="items.length !== 0" class="overflow-auto max-h-60" ref="menu" data-test="list">
        <ul class="list-none">
          <li
            v-for="(item, index) in items"
            :key="index"
            :class="[
              index === activeIndex ? 'bg-gray-light' : '',
              ' px-2.5 py-2 hover:bg-gray-light'
            ]"
            class="my-1 cursor-pointer"
            :data-test="index"
            :id="`select-${id}-${index}`"
            @click="emit('select', item.option)"
          >
            <div class="flex items-center gap-2">
              <BaseIcon
                v-if="item.active"
                name="checkOutline"
                class="w-4 h-3 text-primary"
                view-box="0 0 16 15"
              />
              <span
                class="block truncate text-sm cursor-pointer"
                :class="item.active ? 'text-black font-medium' : 'ml-6 text-dark-light font-normal'"
                >{{ item.option[label] }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div data-test="nodata" v-else class="xl:p-4 lg:p-3.5 md:p-3 sm:p-2.5 p-2">
        <div class="flex items-center justify-center">
          <span class="text-gray-dark xl:text-base lg:text-sm md:text-sm sm:text-sm text-0.5xs"
            >No data available
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>
