<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import SearchDialog from './SearchDialog.vue'
import { isAppleDevice } from '@/shared/utils'

const metaKey = ref(isAppleDevice() ? '⌘' : 'Ctrl')
const isOpenDialog = ref(false)
</script>

<template>
  <BaseButton
    variant="none"
    :icon="{ name: 'searchOutline', className: 'text-dark-light w-5 h-5', viewBox: '0 0 19 19' }"
    size="sm"
    class="xl:hidden !p-0 w-8 h-8 !min-h-0"
    :has-default-slot="false"
    @click="isOpenDialog = true"
  ></BaseButton>
  <BaseFilterInput
    id="search"
    name="search"
    wrapper-variant="hidden xl:flex"
    input-variant="cursor-pointer"
    :place-holder="`Search (press ${metaKey}+K)`"
    bg-color="light"
    autocomplete="off"
    search
    readonly
    @click="isOpenDialog = true"
  />
  <SearchDialog v-model="isOpenDialog" />
</template>
