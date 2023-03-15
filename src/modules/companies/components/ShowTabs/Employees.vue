<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import EmployeePostModal from '@/modules/companies/components/EmployeePostModal.vue'

const showModal = ref(false)
</script>

<template>
  <EmployeePostModal v-model:show="showModal" />
  <BaseButton data-test="showModal" :icon="{ name: 'addCircleOutline' }" @click="showModal = true">
    Добавить
  </BaseButton>
</template>
