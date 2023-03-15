<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox/BaseCheckbox.vue'
import { type Instance as PopperInstance, createPopper } from '@popperjs/core'

const props = defineProps<{
  id: string
  name: string
  open: boolean
  search: boolean
  modelValue: string
  searchPlaceHolder: string
  searchLoading: boolean
  label: string
  isSelectAll: boolean
  items: Array<any>
  indeterminate: boolean
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

const select = computed({
  get() {
    return props.isSelectAll
  },
  set(value) {
    emit('update:isSelectAll', value)
  }
})

watch(
  () => props.open,
  (val) => {
    if (!val) {
      activeIndex.value = -1
    }
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
  if (activeIndex.value !== -1) {
    if (props.open) emit('select', props.items[activeIndex.value].option)
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
      <div
        v-if="search && items.length !== 0"
        class="mt-2 mb-1 px-2 w-full flex items-center flex-nowrap gap-4"
      >
        <div class="w-full">
          <BaseFilterInput
            :id="`search-${id}`"
            :name="`search-name-${id}`"
            v-model="value"
            search
            :placeHolder="searchPlaceHolder"
          />
        </div>
        <div>
          <BaseCheckbox
            :id="id"
            :model-value="select"
            @checked="emit('handleAll')"
            :indeterminate="indeterminate"
          />
        </div>
      </div>
      <div
        v-if="items.length !== 0"
        class="overflow-auto max-h-60 mt-1"
        ref="menu"
        data-test="list"
      >
        <ul v-if="!searchLoading" class="list-none">
          <li
            v-if="!search || items.length === 0"
            @click="emit('handleAll')"
            class="cursor-pointer select-none relative px-2.5 py-2 hover:bg-gray-light"
          >
            <div class="flex items-center gap-2">
              <BaseIcon
                v-if="select"
                name="checkOutline"
                class="w-4 h-3 text-primary"
                view-box="0 0 16 15"
              />
              <span
                class="block truncate text-sm cursor-pointer"
                :class="select ? 'text-black font-medium' : 'ml-6 text-dark-light font-normal'"
                >Select All
              </span>
            </div>
          </li>
          <li
            v-for="(item, index) in items"
            :key="index"
            :class="[
              index === activeIndex ? 'bg-gray-light' : '',
              'cursor-pointer select-none  relative px-2.5 py-2 hover:bg-gray-light'
            ]"
            class="my-1"
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
        <div v-else class="flex justify-center items-center h-16">
          <BaseIcon
            v-if="searchLoading"
            name="loadingOutline"
            class="w-5 h-5 animate-spin text-blue-300"
            view-box="0 0 20 20"
          />
        </div>
      </div>
      <div data-test="nodata" v-else class="xl:p-4 lg:p-3.5 md:p-3 sm:p-2.5 p-2">
        <div class="flex items-center justify-center">
          <p
            class="text-gray-dark text-center xl:text-base lg:text-sm md:text-sm sm:text-sm text-0.5xs"
          >
            No data available
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>
