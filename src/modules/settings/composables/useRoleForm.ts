import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { type InferType, object, string } from 'yup'

const tableHeaders = ['create', 'delete', 'read', 'write'] as const
type TableHeader = (typeof tableHeaders)[number]

interface Action {
  id: TableHeader
  selected: 'indeterminate' | boolean
}

interface Scope {
  name: TableHeader
  [key: string]: any
}

interface Permission {
  name: string
  scopes: Scope[]
}

export const useRoleForm = () => {
  const permissionSearch = ref('')

  const actions = ref<Action[]>([
    { id: 'create', selected: false },
    { id: 'delete', selected: false },
    { id: 'read', selected: false },
    { id: 'write', selected: false }
  ])

  const permissions = ref<Permission[]>([
    {
      name: 'Users',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Roles',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Parts',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Roles Parts',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Settings',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Settings Roles',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Settings Parts',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Settings Roles Parts',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Direction Courses',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Directions',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Notifications',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Announcements',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Course Details',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Attendance',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    },
    {
      name: 'Assignments',
      scopes: [
        { name: 'create', create: false },
        { name: 'delete', delete: false },
        { name: 'read', read: false },
        { name: 'write', write: false }
      ]
    }
  ])

  const formSchema = object({
    role: string().required('formErrors.fieldRequired'),
    description: string().required('formErrors.fieldRequired')
  })
  type FormType = InferType<typeof formSchema>

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema
  })
  const role = useField<FormType['role']>('role')
  const description = useField<FormType['description']>('description')

  const handleActionChange = (value: boolean, index: number) => {
    permissions.value = permissions.value.map((permission) => ({
      ...permission,
      scopes: permission.scopes.map((scope, scopeIndex) => ({
        name: scope.name,
        [scope.name]: index === scopeIndex ? value : scope[scope.name]
      }))
    }))
  }

  const handlePermissionChange = (scopeName: string, scopeIndex: number) => {
    const showIndeterminate = permissions.value
      .flatMap((permission) => permission.scopes)
      .filter((scope) => scope.name === scopeName)
      .some((scope) => scope[scopeName])
    actions.value[scopeIndex].selected = showIndeterminate ? 'indeterminate' : false
  }

  const resetRoleForm = () => {
    resetForm()
  }

  const handleRoleSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values))
    resetRoleForm()
  })

  return {
    permissionSearch,
    actions,
    permissions,
    role,
    description,
    handleActionChange,
    handlePermissionChange,
    handleRoleSubmit
  }
}
