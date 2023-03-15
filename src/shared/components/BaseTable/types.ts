import type { Ref } from 'vue'

export interface ColumnType {
  title: string
  dataIndex: string
  key?: string
  align?: 'start' | 'center' | 'end'
  minWidth?: number
  fixed?: boolean
  sort?: boolean
}

export interface ActionType {
  edit?: boolean
  delete?: boolean
  duplicate?: boolean
}

export interface TableProps {
  columns: Ref<ColumnType[]>
  dataSource: Ref<any[]>
  trackKey: Ref<string>
  name: Ref<string>
  bordered?: Ref<boolean>
  action?: Ref<ActionType | undefined>
  selectable?: Ref<boolean>
  loading?: Ref<boolean>
  resetPagination?: Ref<boolean>
}

export type SortType = 'asc' | 'desc' | ''
