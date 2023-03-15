import type Quill from 'quill'
import type { Sources } from 'quill'

export const getText = (quill: Quill, index?: number, length?: number): string => {
  return quill.getText(index, length) ?? ''
}

export const setText = (quill: Quill, text: string, source: Sources = 'api') => {
  quill.setText(text, source)
}

export const getHTML = (quill: Quill) => {
  return quill?.root.innerHTML ?? ''
}

export const setHTML = (quill: Quill, html: string) => {
  quill.root.innerHTML = html
}
