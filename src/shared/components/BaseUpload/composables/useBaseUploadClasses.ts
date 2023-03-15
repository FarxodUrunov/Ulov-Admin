export const useBaseUploadClasses = () => {
  const focusState = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30'

  const setDropzoneSize = (size?: 'none' | 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'lg':
        return 'w-80 h-44'
      case 'md':
        return 'w-44 h-44'
      case 'sm':
        return 'w-48 h-36'
      default:
        return ''
    }
  }

  const setColors = ({
    success,
    error
  }: {
    success?: boolean
    error?: boolean
  }): { dropzone: string; text: string; button?: string } => {
    if (success) {
      return {
        dropzone: 'text-success hover:bg-success/5',
        text: 'text-success',
        button: 'text-success bg-success/20 hover:bg-success/10'
      }
    }
    if (error) {
      return {
        dropzone: 'text-error hover:bg-error/5',
        text: 'text-error',
        button: 'text-error bg-error/20 hover:bg-error/10'
      }
    }
    return {
      dropzone: 'text-primary',
      text: 'text-primary'
    }
  }

  const setBorderVariant = (
    isOverDropZone: boolean,
    { success, error }: { success?: boolean; error?: boolean }
  ) => {
    const base = 'border-2 border-dashed'
    let borderColor = 'border-gray hover:border-primary'

    if (isOverDropZone) borderColor = 'border-primary'

    if (success) borderColor = 'border-success'

    if (error) borderColor = 'border-error'

    return `${base} ${borderColor}`
  }

  return {
    focusState,
    setDropzoneSize,
    setColors,
    setBorderVariant
  }
}
