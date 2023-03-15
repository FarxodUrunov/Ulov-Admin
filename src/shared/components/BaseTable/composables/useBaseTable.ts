import { isObject } from '@/shared/utils'
import { computed, ref, watch, watchEffect } from 'vue'
import type { SortType, TableProps } from '../types'
import { useNotificationStore } from '@/stores/notification'
import type { Notification } from '@/shared/components/BaseNotification/types'

export function useBaseTable(props: TableProps, emit: any) {
  const notificationStore = useNotificationStore()

  const selectAll = ref(false)
  const selectedIds = ref(new Set())
  const columnCount = ref(3)
  const rowLimit = ref(10)
  const scrollUpTrack = ref(0)
  const sortTrackList = ref<SortType[]>(props.columns.value.map(() => ''))
  const customColumns = ref(JSON.parse(JSON.stringify(props.columns.value)))
  const selectColumns = ref(handleInitialColumns())
  const loadMore = ref(true)
  const observer = ref<IntersectionObserver | null>(null)

  const langSwitcher = {
    asc: 'Click to sort ascending',
    desc: 'Click to sort descending',
    reset: 'Click to cancel sorting',
    selecteds: 'Selecteds'
  }
  const notificationTrackKey: Omit<Notification, 'id'> = {
    type: 'error',
    message: `Please, pass a valid track-key prop`,
    duration: 3000
  }

  const perPageOptions = [
    { id: 10, label: '10' },
    { id: 25, label: '25' },
    { id: 50, label: '50' },
    { id: 100, label: '100' }
  ]

  const tablColumnMinWidthClass = computed(() => {
    if (props.columns.value.length) {
      return props.columns.value.map((col) => {
        if (!col.minWidth) {
          return ''
        } else {
          return `${col.minWidth}px`
        }
      })
    } else {
      return []
    }
  })

  const tableBorderClass = computed(() => {
    if (props.bordered?.value) return 'border border-gray-light'

    return 'action'
  })

  const sortStatus = computed(() => {
    return sortTrackList.value.map((sort) => {
      if (sort) {
        if (sort === 'asc') {
          return langSwitcher.desc
        } else {
          return langSwitcher.reset
        }
      } else {
        return langSwitcher.asc
      }
    })
  })

  const indeterminate = computed(() => {
    if (props.dataSource.value.length === selectedIds.value.size) {
      return false
    } else if (selectedIds.value.size === 0) {
      return false
    } else {
      return true
    }
  })

  watch(
    () => props.resetPagination,
    () => {
      loadMore.value = true
      observer.value?.disconnect()
    },
    { deep: true }
  )

  watchEffect(() => {
    const idsArray = Array.from(selectedIds.value)
    emit('select', idsArray)
  })

  function handleLoadMore() {
    loadMore.value = false
    observer.value = new IntersectionObserver(
      (entries: any) => {
        const isIntersecting: boolean = entries[0].isIntersecting
        const tableRows = document.querySelectorAll('.table-row-track')
        tableRows[tableRows.length - 10]?.scrollIntoView({ block: 'end' })
        if (isIntersecting) {
          const lastItem = props.dataSource.value[props.dataSource.value.length - 1]
          if (isObject(lastItem) && Object.keys(lastItem).length) {
            scrollUpTrack.value++
            emit('action', {
              action: 'load-more',
              data: lastItem[props.trackKey.value],
              limit: rowLimit.value
            })
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: 1.0
      }
    )
    const divNode: Element = document.querySelector('#loadMoreBtn')!
    observer.value.observe(divNode)
  }

  function handleInitialColumns() {
    const local = localStorage.getItem(props.name.value)
    if (local) {
      return JSON.parse(local)
    } else {
      return props.columns.value.map((data) => data.dataIndex)
    }
  }

  const handleAction = (type: string, source: any) => {
    emit('action', { action: type, data: source })
  }

  const handleSelect = (data: any) => {
    if (!props.trackKey?.value) return
    if (selectedIds.value.has(data[props.trackKey.value])) {
      selectedIds.value.delete(data[props.trackKey.value])
    } else {
      if (data[props.trackKey.value]) {
        selectedIds.value.add(data[props.trackKey.value])
      } else {
        notificationStore.setNotification(notificationTrackKey)
      }
    }
    if (selectedIds.value.size === props.dataSource.value.length) selectAll.value = true
    if (selectedIds.value.size === 0) {
      selectAll.value = false
    }
  }

  const handleSelectAll = (event: boolean) => {
    if (event) {
      const tempDataSource = props.dataSource.value.filter((data) => data[props.trackKey.value])

      if (tempDataSource.length) {
        selectedIds.value = new Set([...tempDataSource.map((data) => data[props.trackKey.value])])
      } else {
        notificationStore.setNotification(notificationTrackKey)
      }
    } else {
      selectedIds.value = new Set()
    }
  }

  const handleSort = (value: string, ind: number, column: any) => {
    if (!value) {
      sortTrackList.value[ind] = 'asc'
      emit('sort', { sort: 'asc', column: column.dataIndex })
    }
    if (value === 'asc') {
      sortTrackList.value[ind] = 'desc'
      emit('sort', { sort: 'desc', column: column.dataIndex })
    } else if (value === 'desc') {
      sortTrackList.value[ind] = ''
      emit('sort', { sort: 'cancel', column: column.dataIndex })
    }
  }

  const handleRowClick = (data: any) => {
    emit('rowclick', data)
  }

  const handleDelete = () => {
    if (selectedIds.value.size) emit('delete')
  }

  const handleColumnSelect = (event: any) => {
    if (event.length) {
      customColumns.value = event
      localStorage.setItem(props.name.value, JSON.stringify(selectColumns.value))
      emit('columns', selectColumns.value)
    } else {
      customColumns.value = props.columns.value
      selectColumns.value = handleInitialColumns()
      localStorage.setItem(props.name.value, JSON.stringify(selectColumns.value))
    }
  }

  return {
    selectAll,
    selectedIds,
    customColumns,
    sortTrackList,
    tablColumnMinWidthClass,
    tableBorderClass,
    sortStatus,
    indeterminate,
    selectColumns,
    langSwitcher,
    columnCount,
    loadMore,
    rowLimit,
    perPageOptions,
    handleAction,
    handleSelect,
    handleSelectAll,
    handleSort,
    handleRowClick,
    handleDelete,
    handleColumnSelect,
    handleLoadMore
  }
}
