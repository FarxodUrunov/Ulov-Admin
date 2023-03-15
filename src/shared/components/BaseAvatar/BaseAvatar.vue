<script setup lang="ts">
import { toRefs } from 'vue'
import { useAvatarClasses } from './useAvatarClasses'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import { getFullName, isValidURL } from '@/shared/utils'
import type { AvatarSize, AvatarStatus, AvatarStatusPosition } from './types'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    size?: AvatarSize
    status?: AvatarStatus | null
    statusPosition?: AvatarStatusPosition
    rounded?: boolean
    stacked?: boolean
  }>(),
  {
    src: '',
    alt: 'avatar',
    size: 'md',
    status: null,
    statusPosition: 'top-right',
    rounded: false,
    stacked: false
  }
)

const {
  avatarClasses,
  avatarDotClasses,
  avatarPlaceholderClasses,
  avatarPlaceholderWrapperClasses,
  avatarPlaceholderInitialsClasses
} = useAvatarClasses(toRefs(props))
</script>

<template>
  <div class="relative">
    <BaseImage
      v-if="isValidURL(src)"
      :src="src"
      :alt="alt"
      :class="avatarClasses"
      :data-test="avatarClasses.join(' ')"
    />
    <div v-else :class="avatarPlaceholderWrapperClasses">
      <div v-if="src" :data-test="!!src" :class="avatarPlaceholderInitialsClasses">
        {{ getFullName(src) }}
      </div>
      <BaseIcon
        v-else
        name="user"
        :class="avatarPlaceholderClasses"
        class="w-7 h-7 text-gray-light mx-auto"
      />
    </div>
    <span v-if="status" :class="avatarDotClasses" :data-test="statusPosition"></span>
  </div>
</template>
