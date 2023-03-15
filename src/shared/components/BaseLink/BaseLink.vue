<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { type RouteLocationRaw, RouterLink } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import type { Icon } from '@/shared/components/BaseButton/types'

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw
    replace?: boolean
    variant?: 'primary' | 'secondary' | 'error' | 'light' | 'none'
    size?: 'sm' | 'md' | 'lg' | 'none'
    icon?: Icon
    hasDefaultSlot?: boolean
    link?: boolean
    centered?: boolean
    outlined?: boolean
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    hasDefaultSlot: true,
    centered: true
  }
)

const getButtonProps = computed(() => ({
  variant: props.variant,
  size: props.size,
  icon: props.icon,
  hasDefaultSlot: props.hasDefaultSlot,
  link: props.link,
  centered: props.centered,
  outlined: props.outlined,
  loading: props.loading,
  disabled: props.disabled
}))

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <BaseButton
    v-if="isExternalLink"
    v-bind="{ ...$attrs, ...getButtonProps }"
    :href="typeof to === 'string' ? to : undefined"
    target="_blank"
  >
    <slot v-if="hasDefaultSlot" />
  </BaseButton>
  <router-link v-else v-bind="$props" custom v-slot="{ href, navigate, isActive, isExactActive }">
    <BaseButton
      v-bind="{ ...$attrs, ...getButtonProps }"
      :active="isActive"
      :exact-active="isExactActive"
      :href="href"
      @click="navigate"
    >
      <slot v-if="hasDefaultSlot" />
    </BaseButton>
  </router-link>
</template>
