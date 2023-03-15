<script setup lang="ts">
import { ref } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import SettingsPostModal from '../components/SettingsPostModal.vue'
import { useTranslations } from '../composables/useTranslations'

const { t } = useTranslations()

const searchValue = ref('')
const sortValue = ref('')
const showModal = ref(false)
</script>

<template>
  <div>
    <h2 data-test="services-settings-title" class="text-lg font-semibold text-dark-light mb-4">
      {{ t('servicesSettings') }}
    </h2>
    <TheTableHeader v-model:search="searchValue" v-model:sort="sortValue" @add="showModal = true" />
  </div>
  <SettingsPostModal v-model:show="showModal" />
</template>
