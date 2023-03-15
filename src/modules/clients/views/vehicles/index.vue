<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import VehiclePostModal from '@/modules/clients/components/VehiclePostModal/VehiclePostModal.vue'

const showModal = ref(false)
</script>

<template>
  <VehiclePostModal v-model:show="showModal" />
  <BaseButton data-test="showModal" :icon="{ name: 'addCircleOutline' }" @click="showModal = true">
    Добавить
  </BaseButton>
</template>
