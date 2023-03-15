<script setup lang="ts">
import { ref } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import BrandAndModelPostModal from '@/modules/clients/components/Settings/BrandAndModelPostModal.vue'

const sortValue = ref('')
const showModal = ref(false)
</script>

<template>
  <BrandAndModelPostModal v-model:show="showModal" />
  <TheTableHeader v-model:sort="sortValue" @add="showModal = true">
    <div class="flex flex-wrap justify-center items-center gap-2">
      <p>Lorem ipsum</p>
    </div>
  </TheTableHeader>
</template>
