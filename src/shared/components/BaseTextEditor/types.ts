import type Delta from 'quill-delta'

export type ContentType = Delta | string

export interface Module {
  name: string
  module: unknown
  options?: object
}
