import type { fileTypes } from '@/shared/components/BaseUpload/types'

interface Props {
  limitSize: number
  accept: Array<keyof typeof fileTypes>
  limitCount?: number
}

export const useFilesCheck = ({ limitSize, accept, limitCount = 1 }: Props) => {
  const setErrorMessage = (msg: string) => {
    alert(msg)
  }

  const checkFilesLength = (filesLength: number) => {
    return filesLength <= limitCount
  }

  const checkFileType = (file: File) => {
    const name = file.name
    const lastDot = name.lastIndexOf('.')
    const ext = name.substring(lastDot + 1) as unknown as keyof typeof fileTypes
    return accept.includes(ext)
  }

  const checkFileSize = (file: File) => {
    const sizeInMB = file.size / 1000000
    return limitSize >= sizeInMB
  }

  const checkFiles = (files: File[] | null) => {
    if (!files) return false
    if (!checkFilesLength(files.length)) {
      setErrorMessage('Please upload only one file')
      return false
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!checkFileType(file)) {
        setErrorMessage('Please upload correct files')
        return false
      }
      if (!checkFileSize(file)) {
        setErrorMessage(`Please upload files less than ${limitSize} MB`)
        return false
      }
    }
    return true
  }

  return {
    checkFiles
  }
}
