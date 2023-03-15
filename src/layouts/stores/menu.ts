import { ref } from 'vue'
import { defineStore } from 'pinia'
import type icons from '@/shared/utils/icons'

interface Link {
  label: string
  to: string
}

interface LinkParent extends Link {
  icon: keyof typeof icons
  children?: Link[]
}

export const useMenuStore = defineStore('menu', () => {
  const links = ref<LinkParent[]>([
    {
      label: 'dashboard',
      icon: 'houseOutline',
      to: '/'
    },
    {
      label: 'allCompanies',
      icon: 'carServices',
      to: '/companies',
      children: [
        {
          label: 'allCompanies',
          to: '/companies'
        },
        {
          label: 'users',
          to: '/companies/users'
        },
        {
          label: 'statistics',
          to: '/companies/statistics'
        }
      ]
    },
    {
      label: 'clients',
      icon: 'people',
      to: '/clients',
      children: [
        {
          label: 'vehicles',
          to: '/clients/vehicles'
        },
        {
          label: 'users',
          to: '/clients/users'
        },
        {
          label: 'statistics',
          to: '/clients/statistics'
        },
        {
          label: 'vehicleSettings',
          to: '/clients/settings'
        }
      ]
    },
    {
      label: 'subscriptions',
      icon: 'subscribe',
      to: '/subscriptions',
      children: [
        {
          label: 'subscriptions',
          to: '/subscriptions'
        },
        {
          label: 'statistics',
          to: '/subscriptions/statistics'
        }
      ]
    },
    {
      label: 'services',
      icon: 'note',
      to: '/services',
      children: [
        {
          label: 'servicesManagement',
          to: '/services/management'
        },
        {
          label: 'servicesSettings',
          to: '/services/settings'
        }
      ]
    },
    {
      label: 'calls',
      icon: 'call',
      to: '/calls',
      children: [
        {
          label: 'companies',
          to: '/calls/companies'
        },
        {
          label: 'statistics',
          to: '/calls/statistics'
        }
      ]
    },
    {
      label: 'advertisements',
      icon: 'advertise',
      to: '/advertisements'
    },
    {
      label: 'settings',
      icon: 'settings',
      to: '/settings',
      children: [
        {
          label: 'roles',
          to: '/settings/roles'
        },
        {
          label: 'users',
          to: '/settings/users'
        }
      ]
    }
  ])
  const isSidebarOpen = ref(false)

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return {
    links,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  }
})
