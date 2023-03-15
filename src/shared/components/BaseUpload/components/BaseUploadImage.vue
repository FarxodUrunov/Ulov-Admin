<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import type { ComponentSize } from '../types'

const props = defineProps<{
  path: string
  size: ComponentSize
}>()
const emit = defineEmits(['edit', 'delete'])

const actionsSize = computed(() => {
  switch (props.size) {
    case 'none': {
      return {
        btn: 'w-7 h-7',
        icon: 'w-4 h-4'
      }
    }
    default:
      return {
        btn: 'w-9 h-9',
        icon: 'w-5 h-5'
      }
  }
})
</script>

<template>
  <div class="group w-full h-full relative rounded-lg overflow-hidden">
    <BaseImage :src="path" class="w-full h-full object-cover" draggable="false" />
    <div
      class="opacity-0 group-hover:opacity-100 absolute top-2 right-2 transition-opacity duration-200"
    >
      <BaseButton
        variant="light"
        class="!min-h-0 !p-0"
        :class="actionsSize.btn"
        :icon="{ name: 'upload', className: actionsSize.icon }"
        size="sm"
        :has-default-slot="false"
        @click="emit('edit')"
      />
      <BaseButton
        variant="light"
        class="!min-h-0 !p-0 ml-2"
        :class="actionsSize.btn"
        :icon="{ name: 'deleteOutline', className: `${actionsSize.icon} text-error` }"
        size="sm"
        :has-default-slot="false"
        @click="emit('delete')"
      />
    </div>
  </div>
</template>
