<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  mode: 'filter' | ''
  selectedItems: Array<any>
  openItems: boolean
  disabled: boolean
  label: string
  selectedNumbers?: boolean
}>()
const emit = defineEmits(['select', 'show', 'switch'])

const selecteds = ref()
const showList = ref()
const showedItems = ref<any>([])
const hiddenItems = ref<any>([])
const { width } = useElementSize(selecteds)

watchEffect(() => {
  let temp = 0
  const itemsCollection = document.querySelectorAll('[data-track="item"]')
  const items: number[] = []
  itemsCollection.forEach((el) => {
    items.push(el.clientWidth)
  })
  showedItems.value = []
  hiddenItems.value = []
  for (let i = 0; i < props.selectedItems.length; i++) {
    temp = temp + items[i] + 8
    if (temp < width.value) {
      showedItems.value.push(props.selectedItems[i])
    } else {
      hiddenItems.value.push(props.selectedItems[i])
    }
  }
})
</script>

<template>
  <div
    v-if="!selectedNumbers"
    class="absolute z-10 flex justify-between h-5 left-2 right-9 pl-2"
    :class="[mode === 'filter' ? 'top-3' : 'top-6']"
  >
    <div class="absolute flex gap-2 w-full h-0 max-h-[0px] top-0 opacity-0">
      <div
        v-for="(item, index) in selectedItems"
        :key="index"
        class="bg-blue-100 px-2 opacity-0 rounded flex flex-nowrap justify-between items-center overflow-hidden gap-2 max-w-[200px] shrink-0"
        data-track="item"
      >
        <p class="truncate text-sm" :title="item[label]">{{ item[label] }}</p>
        <div>
          <BaseIcon name="close" class="h-4 w-4" />
        </div>
      </div>
    </div>
    <div ref="selecteds" class="flex gap-2 w-full" @click="emit('show')">
      <div
        v-for="(item, index) in showedItems"
        :key="index"
        class="bg-blue-100 px-2 rounded flex justify-between items-center overflow-hidden gap-2 max-w-[200px] shrink-0"
      >
        <p class="truncate text-sm" :title="item[label]">{{ item[label] }}</p>
        <button type="button" class="h-4 w-4" @click="disabled ? '' : emit('select', item)">
          <BaseIcon name="close" class="h-full w-full text-gray-dark" />
        </button>
      </div>
    </div>
    <div
      v-if="hiddenItems.length"
      class="border border-gray-light px-2 h-5 rounded flex items-center gap-2 cursor-pointer"
      :class="[mode === 'filter' ? 'bg-white' : 'bg-gray-light']"
      ref="showList"
      @click="emit('switch')"
    >
      <p class="text-dark text-xs">+{{ hiddenItems.length }}...</p>
    </div>
  </div>
  <div
    v-if="hiddenItems.length && !selectedNumbers"
    class="bg-white rounded absolute right-0 border p-2 z-40 cursor-pointer flex flex-col divide-y divide-gray-light border-gray-light max-w-[150px] overflow-auto max-h-60"
    :class="[
      openItems ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
      mode === 'filter' ? 'top-11 md:top-12' : 'top-11 sm:top-14 md:top-16'
    ]"
  >
    <div
      v-for="(item, index) in hiddenItems"
      :key="index"
      class="flex justify-between items-center gap-2"
      data-test="selecteds"
    >
      <p class="truncate">{{ item[label] }}</p>
      <div class="h-5 w-5">
        <button
          type="button"
          :data-test="'icon-' + index"
          @click="disabled ? '' : emit('select', item)"
        >
          <BaseIcon name="close" class="h-full w-full cursor-pointer text-gray" />
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="selectedNumbers"
    class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <p class="text-sm font-medium cursor-default text-dark-light" @click="emit('show')">
      {{ selectedItems.length }} selected
    </p>
  </div>
</template>
