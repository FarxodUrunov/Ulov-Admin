## BaseUploadDragger Component

### This component accepts these props:

```ts
import type { ImageModel, fileTypes } from '@/shared/components/BaseUpload/types'

interface BaseUploadDraggerProps {
  modelValue: Array<ImageModel | null> | null
  accept: Array<keyof typeof fileTypes>
  description: string
  limitCount?: number
  limitSize?: number // in megabytes
  loading?: boolean
}
```

### Default props:

- limitCount = 8
- limitSize = 10

### Examples

```vue
<BaseUploadDragger
  v-model="files"
  :accept="['png', 'jpeg', 'jpg']"
  description="Загрузите фотографии вашей автосервиса"
/>
```
