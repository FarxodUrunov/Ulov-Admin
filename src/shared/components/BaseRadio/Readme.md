```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Radio from '@/shared/components/Button/Radio/BaseRadio.vue'
const value: Ref<string | null> = ref(null)
</script>

<template>
  <div class="my-4">
    <Radio size="sm" label="Small size " value="Филиал" v-model="value" />
  </div>
  <div class="my-4">
    <Radio
      :error="true"
      v-model="value"
      value="Основной"
      :disabled="false"
      label="Medium size Disabled"
    />
  </div>
  <div class="my-4">
    <Radio
      size="lg"
      :error="true"
      v-model="value"
      value="Автопарк"
      label="Large size radio button"
    />
  </div>
</template>
```
