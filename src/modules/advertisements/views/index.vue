<script setup lang="ts">
import { ref } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import PostModal from '@/modules/advertisements/components/PostModal.vue'

const showPostModal = ref(false)
const sortValue = ref('')

const handleAdd = () => {
  showPostModal.value = true
}
</script>
<template>
  <PostModal v-model:show="showPostModal" />
  <div>
    <TheTableHeader v-model:sort="sortValue" @add="handleAdd">
      <div class="flex flex-wrap justify-center items-center gap-2">
        <p>Lorem ipsum</p>
      </div>
    </TheTableHeader>
  </div>
</template>
