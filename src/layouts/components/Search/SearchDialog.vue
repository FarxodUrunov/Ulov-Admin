<script setup lang="ts">
import { computed, h } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import CommandInput from './command-palette/CommandInput.vue'
import CommandList from './command-palette/CommandList.vue'
import CommandEmpty from './command-palette/CommandEmpty.vue'
import CommandGroup from './command-palette/CommandGroup.vue'
import CommandItem from './command-palette/CommandItem.vue'
import { useSearchDialog } from '@/layouts/composables/useSearchDialog'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const isDialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const { shorcuts, itemsGroup, inputValue, getItemIndex } = useSearchDialog({ isDialogOpen })
</script>

<template>
  <BaseModal
    v-model="isDialogOpen"
    size="md"
    model-variant="bg-[#f9f9f9] rounded-md"
    header-variant="p-3"
    body-variant="px-3 pb-3"
    footer-variant="w-full h-11 relative flex items-center justify-end text-xs text-dark-light rounded-bl-md rounded-br-md border-t border-gray px-3 select-none"
  >
    <template #header>
      <CommandInput placeholder="Type a command or search..." v-model="inputValue" />
    </template>
    <template #body>
      <CommandList #default="{ activeIndex }">
        <template v-if="itemsGroup.length">
          <CommandGroup
            v-for="(groupItem, groupIndex) in itemsGroup"
            :key="groupIndex"
            :heading="groupItem.heading"
            class="pb-6"
          >
            <CommandItem
              v-for="(item, itemIndex) in groupItem.items"
              :key="itemIndex"
              :aria-selected="activeIndex === getItemIndex(groupIndex, itemIndex)"
            >
              <span class="font-medium">{{ item }}</span>
            </CommandItem>
          </CommandGroup>
        </template>
        <CommandEmpty v-else>No results found.</CommandEmpty>
      </CommandList>
    </template>
    <template #footer>
      <ul class="flex items-center flex-wrap gap-3.5">
        <li
          v-for="(shorcut, shorcutIndex) in shorcuts"
          :key="shorcutIndex"
          class="flex items-center"
        >
          <kbd
            v-for="(icon, iconIndex) in shorcut.icons"
            :key="iconIndex"
            class="w-5 h-5 flex justify-center items-center rounded-sm"
          >
            <component :is="h('svg', { width: 15, height: 15, innerHTML: icon })" />
          </kbd>
          <span class="ml-2">{{ shorcut.label }}</span>
        </li>
      </ul>
    </template>
  </BaseModal>
</template>
