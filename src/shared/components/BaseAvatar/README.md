## BaseAvatar Component

### This is component accepts these props:

```ts
import type {
  AvatarSize,
  AvatarStatus,
  AvatarStatusPosition
} from '@/shared/components/BaseAvatar/types'

interface BaseAvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  status?: AvatarStatus | null
  statusPosition?: AvatarStatusPosition
  rounded?: boolean
  stacked?: boolean
}
```

#### Default props:

- src = ''
- alt = 'avatar'
- size = 'md'
- status = null
- statusPosition = 'top-right'
- rounded = false
- stacked = false

### Examples

```vue
<template>
  <div class="flex gap-6 my-8">
    <BaseAvatar rounded />
    <BaseAvatar src="Sardor Astanov" rounded />
  </div>
  <div class="flex gap-6 my-8">
    <BaseAvatar
      size="md"
      status="online"
      status-position="top-left"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      rounded
      status="online"
      status-position="top-left"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      status="online"
      status-position="top-right"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      rounded
      status="online"
      status-position="top-right"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      status="online"
      status-position="bottom-left"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      rounded
      status="online"
      status-position="bottom-left"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      status="online"
      status-position="bottom-right"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
    <BaseAvatar
      rounded
      status="online"
      status-position="bottom-right"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    />
  </div>
  <div class="flex gap-6 my-8">
    <BaseAvatar size="sm" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
    <BaseAvatar size="md" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
    <BaseAvatar size="lg" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
    <BaseAvatar size="xl" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
    <BaseAvatar size="xs" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
  </div>
  <StackedAvatars>
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      rounded
    />
  </StackedAvatars>
  <StackedAvatars class="mt-2.5">
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
      rounded
    />
    <BaseAvatar
      stacked
      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
      rounded
    />
    <StackedAvatarsCounter :total="99" href="#" />
  </StackedAvatars>
</template>
```
