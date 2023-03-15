import { computed, type Ref } from 'vue'
import type {
  AvatarType,
  AvatarSize,
  AvatarStatus,
  UseAvatarClassesProps,
  avatarDotIndicatorPositionClasses
} from '@/shared/components/BaseAvatar/types'

const avatarSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-20 h-20',
  xl: 'w-36 h-36'
}

const avatarTypeClasses: Record<AvatarType, string> = {
  default: 'rounded',
  rounded: 'rounded-full'
}

const avatarStatusDotDefaultClasses = 'absolute h-3.5 w-3.5 rounded-full border-2 border-white'

const avatarStatusDotClasses: Record<AvatarStatus, string> = {
  away: 'bg-gray',
  online: 'bg-teal',
  busy: 'bg-yellow',
  offline: 'bg-error'
}

const avatarStatusDotPositionClasses: Record<avatarDotIndicatorPositionClasses, string> = {
  'top-right-rounded': 'top-0 -right-0.5',
  'top-right-default': '-top-1.5 -right-1.5',
  'top-left-rounded': 'top-0 left-0',
  'top-left-default': 'top-0 left-0 transform -translate-y-1/2 -translate-x-1/2',
  'bottom-right-rounded': 'bottom-0 -right-0.5',
  'bottom-right-default': 'bottom-0 -right-1.5 translate-y-1/2',
  'bottom-left-rounded': 'bottom-0 left-0',
  'bottom-left-default': '-bottom-1.5 left-0 transform -translate-x-1/2'
}

const avatarPlaceholderDefaultClasses = 'text-gray-light'

const avatarPlaceholderWrapperDefaultClasses =
  'inline-flex overflow-hidden relative justify-center items-center bg-gray-dark'

const avatarPlaceholderInitialsDefaultClasses = 'font-medium text-white'

const avatarPlaceholderSizes = {
  xs: 'bottom-0',
  sm: 'bottom-0',
  md: '-bottom-1',
  lg: '-bottom-2',
  xl: '-bottom-4'
}

export const useAvatarClasses = (
  props: UseAvatarClassesProps
): {
  avatarClasses: Ref<string[]>
  avatarDotClasses: Ref<string[]>
  avatarPlaceholderClasses: Ref<string[]>
  avatarPlaceholderWrapperClasses: Ref<string[]>
  avatarPlaceholderInitialsClasses: Ref<string>
} => {
  const avatarClasses = computed<string[]>(() => [
    avatarSizeClasses[props.size.value],
    props.stacked.value ? 'border-2 border-white' : '',
    avatarTypeClasses[props.rounded.value ? 'rounded' : 'default']
  ])

  const avatarDotClasses = computed<string[]>(() => {
    const avatarType = `${props.statusPosition.value}-${
      props.rounded.value ? 'rounded' : 'default'
    }`
    return [
      avatarStatusDotDefaultClasses,
      avatarStatusDotPositionClasses[avatarType as avatarDotIndicatorPositionClasses],
      avatarStatusDotClasses[props.status.value !== null ? props.status.value : 'offline']
    ]
  })

  const avatarPlaceholderClasses = computed<string[]>(() => [
    avatarPlaceholderDefaultClasses,
    avatarPlaceholderSizes[props.size.value]
  ])

  const avatarPlaceholderWrapperClasses = computed<string[]>(() => [
    avatarSizeClasses[props.size.value],
    avatarPlaceholderWrapperDefaultClasses,
    avatarTypeClasses[props.rounded.value ? 'rounded' : 'default']
  ])

  const avatarPlaceholderInitialsClasses = computed<string>(
    () => avatarPlaceholderInitialsDefaultClasses
  )

  return {
    avatarClasses,
    avatarDotClasses,
    avatarPlaceholderClasses,
    avatarPlaceholderWrapperClasses,
    avatarPlaceholderInitialsClasses
  }
}
