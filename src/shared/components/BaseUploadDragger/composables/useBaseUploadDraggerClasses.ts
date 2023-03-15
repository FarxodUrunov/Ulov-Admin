export const useBaseUploadDraggerClasses = () => {
  const focusState = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30'

  const setColors = ({
    success,
    error
  }: {
    success?: boolean
    error?: boolean
  }): { dropzone: string; text?: string } => {
    if (success) {
      return {
        dropzone: 'text-success hover:bg-success/5',
        text: 'text-success'
      }
    }
    if (error) {
      return {
        dropzone: 'text-error hover:bg-error/5',
        text: 'text-error'
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
    setColors,
    setBorderVariant
  }
}
