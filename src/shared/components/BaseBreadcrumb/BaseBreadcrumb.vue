<script setup lang="ts">
import BreadcrumbItem from './components/BreadcrumbItem.vue'
import { useBaseBreadcrumb } from './composables/useBaseBreadcrumb'
import type { BreadcrumbItemProps } from './types'

defineProps<{
  breadcrumb: BreadcrumbItemProps[]
  solid?: boolean
}>()

const { breadcrumbVariant, wrapperVariant } = useBaseBreadcrumb()
</script>

<template>
  <nav :class="wrapperVariant(solid)" aria-label="breadcrumb" data-test="breadcrumb">
    <ul :class="breadcrumbVariant">
      <slot name="default">
        <BreadcrumbItem
          v-for="(item, index) in breadcrumb"
          :key="index"
          :item="item"
          :index="index"
        />
      </slot>
    </ul>
  </nav>
</template>
