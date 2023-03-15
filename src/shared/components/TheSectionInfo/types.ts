import type { CardActionPermissions } from '@/shared/components/BaseCard/types'

export interface SectionInfoImage {
  src: string
  type?: 'img' | 'user'
  alt?: string
  rounded?: boolean
  large?: boolean
}

export interface SectionInfoProps {
  image: SectionInfoImage
  actions?: CardActionPermissions
  title?: string
}
