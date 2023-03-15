## TheCarPhotoUpload component usage

## this component accepts these props:

```ts
type ImageParams = {
  id: number | string
  name: string
  path: string
  size: number
}

interface Props {
  modelValue?: ImageModel[]
  title?: string
  limitNumber?: number
  message?: string
  success?: boolean
  error?: boolean
  disabled?: boolean
}
```

##### Default props:

- modelValue = []
- limitNumber = 4

###### IMPORTANT

1. When BaseNotification component is done, use it to show error messages, that change from alert() to BaseNotification.

2. Should be refactored, when API is ready to integrate, that is, should send request to save photo and get the result (photo params), then push it to the files array.

### Examples

```vue
<script setup lang="ts">
import TheCarPhotoUpload from '@/shared/components/TheCarPhotoUpload/TheCarPhotoUpload.vue'
import { ref } from 'vue'

const images: any = ref([
  {
    id: 13625,
    name: 'Screenshot from 2022-12-19 15-55-27.png',
    path: 'https://s1.1zoom.ru/big7/888/Eyes_Owls_Bubo_502568.jpg',
    size: 13625
  },
  {
    id: 96477,
    name: 'Screenshot from 2022-12-16 16-22-39.png',
    path: 'https://i.pinimg.com/originals/b4/c9/f8/b4c9f8699e6a63ba2d6d4d55c6d80b75.jpg',
    size: 96477
  }
])
</script>

<template>
  <TheCarPhotoUpload
    title="Добавьте Фото автомобилие на момента прибытия"
    :limitNumber="10"
    :disabled="true"
    v-model="images"
  />
</template>
```
