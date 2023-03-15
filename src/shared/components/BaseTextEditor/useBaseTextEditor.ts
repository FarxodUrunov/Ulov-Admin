import { ref } from 'vue'
import Quill from 'quill'
import defaultColors from '@/shared/utils/colors'

export const useBaseTextEditor = () => {
  const icons = Quill.import('ui/icons')

  icons.bold =
    '<svg width="12" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H7.5C8.03043 6 8.53914 6.21071 8.91421 6.58579C9.28929 6.96086 9.5 7.46957 9.5 8C9.5 8.53043 9.28929 9.03914 8.91421 9.41421C8.53914 9.78929 8.03043 10 7.5 10H3V6Z" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4C9 4.53043 8.78929 5.03914 8.41421 5.41421C8.03914 5.78929 7.53043 6 7 6H3V2Z" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  icons.link =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0013 4.66797H12.0013C12.439 4.66797 12.8725 4.75419 13.2769 4.9217C13.6813 5.08922 14.0488 5.33475 14.3583 5.64428C14.6679 5.95381 14.9134 6.32127 15.0809 6.72569C15.2484 7.13011 15.3346 7.56356 15.3346 8.0013C15.3346 8.43904 15.2484 8.87249 15.0809 9.27691C14.9134 9.68133 14.6679 10.0488 14.3583 10.3583C14.0488 10.6679 13.6813 10.9134 13.2769 11.0809C12.8725 11.2484 12.439 11.3346 12.0013 11.3346H10.0013M6.0013 11.3346H4.0013C3.56356 11.3346 3.13011 11.2484 2.72569 11.0809C2.32127 10.9134 1.95381 10.6679 1.64428 10.3583C1.01916 9.7332 0.667969 8.88536 0.667969 8.0013C0.667969 7.11725 1.01916 6.2694 1.64428 5.64428C2.2694 5.01916 3.11725 4.66797 4.0013 4.66797H6.0013" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.33203 8H10.6654" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  icons.italic =
    '<svg width="12" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10H2.5" stroke="#666666" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 2H5" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 2L4.5 10" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  icons.underline =
    '<svg width="12" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.5H10" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 1.5V5C3 5.79565 3.31607 6.55871 3.87868 7.12132C4.44129 7.68393 5.20435 8 6 8C6.79565 8 7.55871 7.68393 8.12132 7.12132C8.68393 6.55871 9 5.79565 9 5V1.5" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

  const quill = ref<any>()
  const active = ref('')

  const onChange = (event: any) => {
    quill.value = event
  }

  const toolbarItemClick = (formatName: string, type: string | boolean) => {
    quill.value.format(formatName, type)

    switch (type) {
      case 'center':
        active.value = type
        break
      case 'right':
        active.value = type
        break
      case false:
        active.value = type + ''
        break
    }
  }

  return {
    active,
    quill_gray_light: defaultColors.quill_gray_light,
    quill_dark_light: defaultColors.quill_dark_light,
    onChange,
    toolbarItemClick
  }
}
