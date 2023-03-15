<script setup lang="ts">
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import type { BreadcrumbItemProps } from '../types'

defineProps<{
  item: BreadcrumbItemProps
  index: number
}>()
</script>

<template>
  <li class="h-7 inline-flex items-center gap-x-2 text-sm capitalize">
    <span class="text-base text-gray-dark" v-if="index">/</span>
    <span
      v-if="item.current"
      aria-current="page"
      class="p-1"
      :class="item.home ? 'text-primary' : 'text-gray-dark'"
    >
      <BaseIcon v-if="item.home" name="houseOutline" class="w-4 h-4" />
      <template v-else>{{ item.name }}</template>
    </span>
    <BaseLink v-else variant="none" class="text-primary !font-medium !p-1" :to="item.path" link>
      <BaseIcon v-if="item.home" name="houseOutline" class="w-4 h-4" />
      <template v-else>{{ item.name }}</template>
    </BaseLink>
  </li>
</template>
