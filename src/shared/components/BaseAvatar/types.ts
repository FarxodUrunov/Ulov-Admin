import type { Ref } from 'vue'

export type AvatarType = 'default' | 'rounded'
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'away' | 'busy' | 'offline' | 'online'
export type AvatarStatusPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type avatarDotIndicatorPositionClasses = `${AvatarStatusPosition}-${AvatarType}`
export interface UseAvatarClassesProps {
  alt: Ref<string>
  rounded: Ref<boolean>
  size: Ref<AvatarSize>
  stacked: Ref<boolean>
  status: Ref<AvatarStatus | null>
  statusPosition: Ref<AvatarStatusPosition>
  src: Ref<string>
}
