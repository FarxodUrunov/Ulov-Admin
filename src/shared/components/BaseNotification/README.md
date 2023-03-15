# BaseNotification Component

## This component accepts these props:

```ts
import type {
  Notification,
  PlacementTypeX,
  PlacementTypeY
} from '@/shared/components/BaseNotification/types'

interface BaseNotificationProps {
  notifications: Notification[]
  placementX?: PlacementTypeX
  placementY?: PlacementTypeY
}
```

#### Default props:

- placementX: 'end',
- placementY: 'start'

#### emit

- close

## Example

```ts
const notificationExample1 = {
  type: 'info',
  subject: `Subject ${Math.ceil(Math.random() * 10)}`,
  message: `This is a notification ${Math.ceil(Math.random() * 10)}`,
  duration: 2000
}

const notificationExample2 = {
  customRender: markRaw(UserNotification),
  customRenderProps: {
    username: 'John Doe',
    message: 'Welcome back',
    link: 'https://github.com/johndoe'
  }
}
```

#### UserNotification component

```vue
<script setup lang="ts">
defineProps<{
  username: string
  message: string
  link: string
}>()
</script>

<template>
  <span>
    {{ message }},
    <span class="text-base font-bold"
      ><a :href="link" target="_blank">{{ username }}</a></span
    >
  </span>
</template>
```

#### Usage

```vue
<script setup lang="ts">
const notificationStore = useNotificationStore()
</script>

<template>
  <BaseNotification
    :placement-x="notificationStore.placement.x"
    :placement-y="notificationStore.placement.y"
    :notifications="notificationStore.notifications"
    @close="notificationStore.removeNotification"
  />
</template>
```
