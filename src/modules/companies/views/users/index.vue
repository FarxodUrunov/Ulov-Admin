<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import UserPostModal from '@/modules/companies/components/UserPostModal.vue'

const showPostModal = ref(false)
</script>

<template>
  <UserPostModal v-model:show="showPostModal" />
  <BaseButton
    data-test="add-user"
    :icon="{ name: 'addCircleOutline' }"
    @click="showPostModal = true"
  >
    Добавить
  </BaseButton>
</template>
