<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel, TransitionRoot } from '@headlessui/vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import type { TabProps } from './types'

const props = withDefaults(
  defineProps<{
    tabs: (TabProps | string)[]
    selected?: number
    defaultTab?: number
    tabPanelVariant?: string
    sticky?: boolean
  }>(),
  {
    selected: 0,
    defaultTab: 0
  }
)
const emit = defineEmits(['update:selected'])

const route = useRoute()
const router = useRouter()

const hashDefaultTab = computed(() => {
  const tabs = props.tabs
  if (tabs.every((tab) => typeof tab !== 'string')) {
    return tabs.findIndex((tab) => {
      return typeof tab !== 'string' && tab.to && router.resolve(tab.to).hash === route.hash
    })
  }
  return props.defaultTab
})

const selectedTab = computed({
  get: () => props.selected,
  set: (value) => emit('update:selected', value)
})

const handleChange = (index: number) => {
  selectedTab.value = index
}
</script>

<template>
  <TabGroup as="div" :default-index="hashDefaultTab" @change="handleChange">
    <TabList
      class="w-full flex gap-5 overflow-x-auto border-b border-gray-light pb-2"
      :class="{ 'sticky top-0 z-10': sticky }"
    >
      <Tab v-for="(tab, index) in tabs" :key="index" as="template" v-slot="{ selected }">
        <BaseButton
          :data-test="`tab-${index}`"
          variant="none"
          class="relative aria-selected:ring-0 hover:text-dark"
          :class="selected ? 'text-dark' : 'text-gray'"
          link
          v-on="typeof tab !== 'string' ? { click: () => router.push(tab.to) } : {}"
        >
          {{ typeof tab !== 'string' ? tab.label : tab }}
          <span
            class="w-full h-0.5 absolute left-0 -bottom-2"
            :class="{ 'bg-primary': selected }"
          ></span>
        </BaseButton>
      </Tab>
    </TabList>

    <TabPanels class="mt-2">
      <TabPanel
        v-for="(_, index) in tabs"
        :key="index"
        :unmount="false"
        class="py-2 outline-none"
        :class="tabPanelVariant"
        v-slot="{ selected }"
      >
        <TransitionRoot
          :show="selected"
          :unmount="false"
          enter="transition-opacity duration-100"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <slot :name="'tab-' + index"></slot>
        </TransitionRoot>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
