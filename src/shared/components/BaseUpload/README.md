## BaseUpload Component

### This component accepts these props:

```ts
import type { ImageModel, fileTypes } from '@/shared/components/BaseUpload/types'

interface BaseUploadProps {
  modelValue: ImageModel | null
  accept: Array<keyof typeof fileTypes>
  description: string
  title?: string
  size?: 'md' | 'lg'
  limitSize?: number // in megabytes
  full?: boolean
  loading?: boolean
}
```

### Default props:

- title = 'Загрузить фото'
- limitSize = 8
- size = 'md'
- full = true

### Examples

```vue
<script setup lang="ts">
const photo1 = ref()

const photo2 = ref({
  id: 121212,
  name: 'Test file',
  size: 54543543,
  path: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
})

const photo3 = ref({
  id: 121212,
  name: 'Test file',
  size: 54543543,
  path: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
})

const photo4 = ref()
</script>

<template>
  <BaseUpload
    v-model="photo1"
    :accept="['png', 'jpg', 'jpeg', 'webp']"
    description="Логотип вашей компании"
    size="lg"
    message="Загрузите логотип вашей компании"
    error
  />
  <BaseUpload
    v-model="photo2"
    :accept="['png', 'jpg', 'jpeg', 'webp']"
    description="Загрузите аватар"
  />
  <BaseUpload
    v-model="photo3"
    :accept="['png', 'jpg', 'jpeg', 'webp']"
    description="Загрузите аватар"
    :full="false"
  />
  <BaseUpload
    v-model="photo4"
    :accept="['png', 'jpg', 'jpeg', 'webp']"
    description="Загрузите аватар"
    :full="false"
    success
  />
</template>
```
