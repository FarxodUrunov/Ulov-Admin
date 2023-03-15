<script setup lang="ts">
import { ref } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import ColorPostModal from '@/modules/clients/components/Settings/ColorPostModal.vue'

const sortValue = ref('')
const showModal = ref(false)
</script>

<template>
  <ColorPostModal v-model:show="showModal" />
  <TheTableHeader v-model:sort="sortValue" @add="showModal = true">
    <div class="flex flex-wrap justify-center items-center gap-2">
      <p>Lorem ipsum</p>
    </div>
  </TheTableHeader>
</template>
