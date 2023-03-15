<script setup lang="ts">
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import logo from '@/shared/assets/img/logo.svg'

defineProps<{ linkName?: string }>()
</script>

<template>
  <form class="w-full max-w-md shadow-auth p-8 rounded-xl bg-white relative">
    <div v-if="linkName" class="absolute top-4 left-4">
      <BaseLink :to="{ name: linkName }" link data-test="navigate-back">
        <div class="bg-light p-1 rounded">
          <BaseIcon name="arrowBottom" class="w-5 h-5 rotate-90" />
        </div>
      </BaseLink>
    </div>
    <div class="flex justify-center">
      <BaseImage class="h-8" :src="logo" alt="Ulov Admin" type="img" />
    </div>
    <div class="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6">
      <div>
        <slot name="header" />
      </div>
      <div>
        <slot name="body" />
      </div>
      <div>
        <slot name="footer" />
      </div>
    </div>
  </form>
</template>
