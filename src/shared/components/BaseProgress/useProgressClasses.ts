import type { Ref } from 'vue'
import { computed } from 'vue'
import type { ProgressVariant, ProgressSize } from './types'

const barColorClasses: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  red: 'bg-error',
  yellow: 'bg-yellow-dark'
}

const progressSizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5 text-xs leading-none',
  md: 'h-2.5 text-xs leading-none',
  lg: 'h-4 text-sm leading-none'
}
const progressTextSizeClasses: Record<ProgressSize, string> = {
  sm: 'text-xs',
  md: 'text-md',
  lg: 'text-2xl'
}

export interface UseProgressClassesProps {
  color: Ref<ProgressVariant>
  size: Ref<ProgressSize>
}

export function useProgressClasses(props: UseProgressClassesProps): {
  innerClasses: Ref<string[]>
  outerClasses: Ref<string>
  labelClasses: Ref<string>
} {
  const bindClasses = computed(() => {
    return [barColorClasses[props.color.value], progressSizeClasses[props.size.value]]
  })
  const outerClasses = computed(() => {
    return progressSizeClasses[props.size.value]
  })
  const labelClasses = computed(() => {
    return progressTextSizeClasses[props.size.value]
  })

  return {
    innerClasses: bindClasses,
    outerClasses,
    labelClasses
  }
}
