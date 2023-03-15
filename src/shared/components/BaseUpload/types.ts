import { type InferType, number, object, string } from 'yup'

export type ComponentSize = 'none' | 'sm' | 'md' | 'lg'

export const imageSchema = object({
  id: number().required('Id is required'),
  name: string().required('Name is required'),
  path: string().required('Path is required'),
  size: number().required('Size is required')
})

export type ImageModel = InferType<typeof imageSchema>

export const fileTypes = <const>{
  csv: 'text/csv',
  png: 'image/png',
  jpg: 'image/jpeg',
  txt: 'text/plain',
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  zip: 'application/zip',
  doc: 'application/msword',
  rar: 'application/vnd.rar',
  xls: 'application/vnd.ms-excel',
  '7z': 'application/x-7z-compressed',
  ppt: 'application/vnd.ms-powerpoint',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mp4: 'video/mp4'
}
