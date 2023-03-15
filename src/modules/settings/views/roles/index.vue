<script setup lang="ts">
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2">
    <BaseLink
      data-test="link-to-create"
      :to="{ name: 'settings_roles_create' }"
      :icon="{ name: 'addCircleOutline' }"
    >
      Добавить
    </BaseLink>
  </div>
</template>
