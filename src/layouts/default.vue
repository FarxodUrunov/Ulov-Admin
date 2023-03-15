<script setup lang="ts">
import Sidebar from '@/layouts/components/Sidebar.vue'
import Header from '@/layouts/components/Header.vue'
</script>

<template>
  <div class="flex relative">
    <div class="flex-auto backface-hidden flex flex-row min-h-screen max-w-full relative">
      <Sidebar />
      <div class="flex-grow w-full lg:max-w-[calc(100%-270px)]">
        <Header />
        <div class="max-w-screen-2xl mx-auto p-4 md:p-5 lg:p-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
