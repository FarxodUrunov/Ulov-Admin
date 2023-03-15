<script setup lang="ts">
import { computed } from 'vue'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import BaseCard from '@/shared/components/BaseCard/BaseCard.vue'
import type { SectionInfoProps } from './types'
import type { CardActions } from '@/shared/components/BaseCard/types'

const props = defineProps<{
  image?: SectionInfoProps['image']
  actions?: SectionInfoProps['actions']
  title?: SectionInfoProps['title']
}>()
const emit = defineEmits(['edit', 'delete'])

const borderRadiusState = computed(() => {
  if (props.image?.rounded) return 'rounded-full'
  return 'rounded-xl'
})

const imageSizeState = computed(() => {
  if (props.image?.large) return 'w-full max-w-xs max-h-44'
  return 'w-28 h-28'
})

const handleActions = (action: CardActions) => {
  if (action === 'edit') emit('edit')
  if (action === 'delete') emit('delete')
}
</script>

<template>
  <BaseCard :title="title" :actions="actions" @actions="handleActions">
    <div class="flex flex-col lg:flex-row items-start gap-4 md:gap-6 xl:gap-8">
      <BaseImage
        v-if="image"
        data-test="sectionInfo-image"
        :src="image.src"
        :alt="image.alt"
        :type="image.type"
        class="object-cover"
        :class="[borderRadiusState, imageSizeState]"
      />
      <div class="flex-1"><slot /></div>
    </div>
  </BaseCard>
</template>
