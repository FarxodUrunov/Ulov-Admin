export const findNextSibling = (el: Element, selector: string) => {
  let sibling = el.nextElementSibling

  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.nextElementSibling
  }
}

export const findPreviousSibling = (el: Element, selector: string) => {
  let sibling = el.previousElementSibling

  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.previousElementSibling
  }
}
