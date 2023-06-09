<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import {
  type Placement,
  type Instance as PopperInstance,
  type PositioningStrategy,
  createPopper
} from '@popperjs/core'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    items: any[][]
    mode?: 'click' | 'hover'
    placement?: Placement
    strategy?: PositioningStrategy
    preventOverflow?: number
    tooltipClass?: string
    menuClass?: string
    itemsClass?: string
    itemClass?: string
  }>(),
  {
    mode: 'click',
    placement: 'bottom-start',
    strategy: 'absolute',
    preventOverflow: 8,
    tooltipClass: 'w-max',
    menuClass: '',
    itemsClass: 'p-1',
    itemClass: ''
  }
)

const route = useRoute()
const open = ref(false)
const container = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const instance = ref<PopperInstance | null>(null)

const handleOpen = () => {
  open.value = true
}

const handleClose = () => {
  open.value = false
}

const handleToggle = () => {
  open.value = !open.value
}

onClickOutside(container, handleClose)

watch(open, (value) => {
  if (!value || !container.value || !tooltip.value) return
  if (instance.value) {
    instance.value.destroy()
    instance.value = null
  }
  instance.value = createPopper(container.value, tooltip.value, {
    strategy: props.strategy,
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: props.mode === 'click' ? [0, 6] : 0
        }
      },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false,
          adaptive: false
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: props.preventOverflow
        }
      }
    ]
  })
})

watch(
  () => route.path,
  () => {
    open.value = false
  }
)

onBeforeMount(() => {
  if (instance.value) {
    instance.value.destroy()
    instance.value = null
  }
})
</script>

<template>
  <div
    ref="container"
    class="relative inline-flex justify-center items-center cursor-pointer"
    @keydown.esc="handleClose"
    @mouseover="mode === 'hover' ? handleOpen() : () => {}"
    @mouseleave="mode === 'hover' ? handleClose() : () => {}"
  >
    <BaseButton
      data-test="dropdown-btn"
      variant="none"
      link
      @click="mode === 'click' ? handleToggle() : () => {}"
    >
      <slot name="trigger" :open="open" />
    </BaseButton>

    <transition
      leave-to-class="transform opacity-0 scale-95"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      enter-active-class="transition ease-in-out duration-200"
    >
      <div
        v-show="open && (items.length || $slots.header || $slots.header)"
        ref="tooltip"
        data-test="tooltip"
        class="z-30"
        :class="tooltipClass"
      >
        <div
          class="bg-white shadow-dropdown rounded-lg overflow-y-auto divide-y divide-dark-lighter py-1"
          :class="menuClass"
          data-test="menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <slot name="header" />
          <template v-if="items.length">
            <ul
              v-for="(subItems, index) of items"
              :key="index"
              data-test="menu-items"
              class="max-h-[450px] overflow-y-auto"
              :class="itemsClass"
            >
              <li
                v-for="(item, i) of subItems"
                :key="i"
                data-test="menu-item"
                role="menuitem"
                class="mb-1 last:mb-0"
                :class="itemClass"
                @click="handleClose"
              >
                <slot name="item" :item="item" />
              </li>
            </ul>
          </template>
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>
