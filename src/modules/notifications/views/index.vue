<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSwitch from '@/shared/components/BaseSwitch/BaseSwitch.vue'
import NotificationGroup from '../components/NotificationGroup.vue'

const { t } = useI18n()

const isDisturb = ref<boolean>(false)
</script>

<template>
  <div
    data-test="notifications"
    class="flex flex-wrap justify-between items-center gap-2 bg-white rounded-xl p-4"
  >
    <h2 class="text-lg font-semibold text-dark">{{ t('menu.notifications') }}</h2>
    <BaseSwitch data-test="doNotDisturb" v-model="isDisturb" :label="t('buttons.doNotDisturb')" />
  </div>
  <NotificationGroup />
</template>
