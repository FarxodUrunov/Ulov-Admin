<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import ManagerPostModal from '@/modules/companies/components/ManagerPostModal.vue'

const showModal = ref(false)
</script>

<template>
  <ManagerPostModal v-model:show="showModal" />
  <BaseButton data-test="showModal" :icon="{ name: 'addCircleOutline' }" @click="showModal = true">
    Добавить
  </BaseButton>
</template>
