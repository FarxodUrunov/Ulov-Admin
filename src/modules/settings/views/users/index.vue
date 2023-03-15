<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import PostModal from '@/modules/settings/components/PostModal.vue'

const showPostModal = ref(false)
</script>

<template>
  <PostModal v-model:show="showPostModal" />
  <BaseButton
    data-test="add-user"
    :icon="{ name: 'addCircleOutline' }"
    @click="showPostModal = true"
  >
    Добавить
  </BaseButton>
</template>
