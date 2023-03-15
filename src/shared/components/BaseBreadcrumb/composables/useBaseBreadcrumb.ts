const wrapperVariants = {
  default: 'flex',
  solid: 'flex px-5 py-3 text-gray-dark border border-gray-light rounded-lg'
}
export const useBaseBreadcrumb = () => {
  const breadcrumbVariant =
    'inline-flex items-center flex-nowrap gap-x-2 overflow-x-auto whitespace-nowrap py-2 px-1'

  const wrapperVariant = (solid?: boolean) => {
    return wrapperVariants[solid ? 'solid' : 'default']
  }

  return { breadcrumbVariant, wrapperVariant }
}
