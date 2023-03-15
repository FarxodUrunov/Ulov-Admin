<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { onBeforeUnmount, onMounted, nextTick, watch, ref, useSlots } from 'vue'
import type { PropType } from 'vue'
import Quill from 'quill'
import type {
  QuillOptionsStatic,
  Sources,
  TextChangeHandler,
  EditorChangeHandler,
  RangeStatic,
  SelectionChangeHandler
} from 'quill'
import type Delta from 'quill-delta'
import { toolbarOptions } from './options'
import { setText, getText, setHTML, getHTML } from './helpers'
import type { ContentType, Module } from './types'
import 'quill/dist/quill.snow.css'

const props = defineProps({
  content: {
    type: [String, Object] as PropType<ContentType>,
    default: () => {}
  },
  contentType: {
    type: String as PropType<'delta' | 'html' | 'text'>,
    default: 'delta',
    validator: (value: string) => {
      return ['delta', 'html', 'text'].includes(value)
    }
  },
  enable: {
    type: Boolean,
    default: true
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    required: false
  },
  theme: {
    type: String as PropType<'snow' | 'bubble' | ''>,
    default: 'snow',
    validator: (value: string) => {
      return ['snow', 'bubble', ''].includes(value)
    }
  },
  toolbar: {
    type: String as PropType<keyof typeof toolbarOptions>,
    default: 'minimal'
  },
  modules: {
    type: Object as PropType<Module | Module[]>,
    required: false
  },
  options: {
    type: Object as PropType<QuillOptionsStatic>,
    required: false
  },
  globalOptions: {
    type: Object as PropType<QuillOptionsStatic>,
    required: false
  }
})
const emit = defineEmits([
  'textChange',
  'selectionChange',
  'editorChange',
  'update:content',
  'focus',
  'blur',
  'ready'
])
const slots = useSlots()

let quill: Quill | null = null
let options: QuillOptionsStatic
const editor = ref<Element>()
const isEditorFocus = ref(false)
// eslint-disable-next-line vue/no-setup-props-destructure
let internalModel = props.content

const deltaHasValuesOtherThanRetain = (delta: Delta): boolean => {
  return Object.values(delta).some((v) => !v.retain)
}

const internalModelEquals = (against: Delta | String | undefined) => {
  if (typeof internalModel !== typeof against) return false
  if (against === internalModel) return true
  if (typeof against === 'object' && typeof internalModel === 'object') {
    return !deltaHasValuesOtherThanRetain(internalModel.diff(against as Delta))
  }
}

const composeOptions = (): QuillOptionsStatic => {
  const clientOptions: QuillOptionsStatic = {}
  if (props.theme !== '') clientOptions.theme = props.theme
  if (props.readOnly) clientOptions.readOnly = props.readOnly
  if (props.placeholder) clientOptions.placeholder = props.placeholder
  clientOptions.modules = {
    toolbar: (() => toolbarOptions[props.toolbar])()
  }
  if (props.modules) {
    const modules = (() => {
      const modulesOption: { [key: string]: unknown } = {}
      if (Array.isArray(props.modules)) {
        for (const module of props.modules) {
          modulesOption[module.name] = module.options ?? {}
        }
      } else {
        modulesOption[props.modules.name] = props.modules.options ?? {}
      }
      return modulesOption
    })()
    clientOptions.modules = Object.assign({}, clientOptions.modules, modules)
  }
  return Object.assign({}, props.globalOptions, props.options, clientOptions)
}

const setContents = (content: ContentType, source: Sources = 'api') => {
  if (!quill) return
  if (props.contentType === 'html' && typeof content === 'string') {
    setHTML(quill, content)
  } else if (props.contentType === 'text' && typeof content === 'string') {
    setText(quill, content, source)
  } else {
    if (typeof content !== 'string') {
      quill.setContents(content as any, source)
    }
  }
}

const getContents = (index?: number, length?: number) => {
  if (!quill) return
  if (props.contentType === 'html') {
    return getHTML(quill)
  } else if (props.contentType === 'text') {
    return getText(quill, index, length)
  }
  return quill.getContents(index, length)
}

const handleTextChange = (delta: Delta, oldContents: Delta, source: Sources) => {
  // @ts-expect-error type any
  internalModel = getContents()
  if (!internalModelEquals(props.content)) {
    emit('update:content', internalModel)
  }
  emit('textChange', { delta, oldContents, source })
}

const handleSelectionChange: SelectionChangeHandler = (
  range: RangeStatic,
  oldRange: RangeStatic,
  source: Sources
) => {
  isEditorFocus.value = !!quill?.hasFocus()
  emit('selectionChange', { range, oldRange, source })
}

const handleEditorChange: EditorChangeHandler = (
  ...args:
    | [name: 'text-change', delta: Delta, oldContents: Delta, source: Sources]
    | [name: 'selection-change', range: RangeStatic, oldRange: RangeStatic, source: Sources]
) => {
  if (args[0] === 'text-change')
    emit('editorChange', {
      name: args[0],
      delta: args[1],
      oldContents: args[2],
      source: args[3]
    })
  if (args[0] === 'selection-change')
    emit('editorChange', {
      name: args[0],
      range: args[1],
      oldRange: args[2],
      source: args[3]
    })
}

const initialize = () => {
  if (!editor.value) return
  options = composeOptions()

  if (props.modules) {
    if (Array.isArray(props.modules)) {
      for (const module of props.modules) {
        Quill.register(`modules/${module.name}`, module.module)
      }
    } else {
      Quill.register(`modules/${props.modules.name}`, props.modules.module)
    }
  }
  quill = new Quill(editor.value, options)
  const toolbar = quill.getModule('toolbar')
  if (toolbar) {
    const toolbarNoteList = document.querySelectorAll(
      `.${toolbar.container.className.replace(' ', '.')}`
    )
    if (toolbarNoteList.length > 1) {
      toolbarNoteList[toolbarNoteList.length - 2].remove()
    }
  }
  setContents(props.content)
  quill.on('text-change', handleTextChange as unknown as TextChangeHandler)
  quill.on('selection-change', handleSelectionChange)
  quill.on('editor-change', handleEditorChange)

  if (props.theme !== 'bubble') editor.value.classList.remove('ql-bubble')
  if (props.theme !== 'snow') editor.value.classList.remove('ql-snow')

  if (toolbar) {
    toolbar.container.addEventListener('mousedown', (e: MouseEvent) => e.preventDefault())
  }
  emit('ready', quill)
}

watch(
  () => props.content,
  (newContent) => {
    if (!quill || !newContent || internalModelEquals(newContent)) return

    internalModel = newContent
    const selection = quill?.getSelection()
    if (selection) {
      nextTick(() => quill?.setSelection(selection))
    }
    setContents(newContent)
  }
)

watch(
  () => props.enable,
  (newValue) => {
    quill?.enable(newValue)
  }
)

watch(isEditorFocus, (focus) => {
  if (focus) emit('focus', editor)
  else emit('blur', editor)
})

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  quill = null
})
</script>

<template>
  <div ref="editor" v-bind="$attrs" class="min-h-[150px]"></div>
</template>

<style>
.ql-toolbar,
.ql-container {
  font-family: inherit !important;
  font-size: 14px !important;
  border-color: #cdcdcd !important;
}

.ql-container {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.ql-toolbar {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.ql-snow .ql-picker.ql-header {
  width: 95px !important;
}
.ql-toolbar.ql-snow .ql-formats {
  margin-right: 10px !important;
}
</style>
