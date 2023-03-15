<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { useMenuStore } from '@/layouts/stores/menu'
import logo from '@/shared/assets/img/logo.svg'

const route = useRoute()
const { t } = useI18n()
const menuStore = useMenuStore()
const { links, isSidebarOpen } = storeToRefs(menuStore)

const activeDropdown = ref<number | null>(null)

const sidebarState = computed(() => {
  return isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
})

const showDropdown = (index: number) => {
  activeDropdown.value = activeDropdown.value === index ? null : index
}

watch(isSidebarOpen, (value) => {
  document.documentElement.classList[value ? 'add' : 'remove']('overflow-y-hidden')
})

watch(
  () => route.path,
  () => (isSidebarOpen.value = false)
)
</script>

<template>
  <div
    class="z-sidebar fixed lg:relative w-[270px] h-full bg-white border-r border-dark-lighter shadow-sidebar transition-transform duration-150"
    :class="[sidebarState]"
  >
    <div class="sticky top-0 max-h-screen overflow-auto p-3 md:p-4 lg:p-5 lg:pl-6">
      <BaseLink to="/" link>
        <BaseImage :src="logo" alt="ULOV" />
      </BaseLink>
      <div class="py-5 flex flex-col justify-start items-start gap-3">
        <template v-for="(link, index) in links" :key="link.label">
          <div
            class="w-full group"
            v-if="link.children"
            :aria-expanded="activeDropdown === index || undefined"
          >
            <BaseButton
              variant="none"
              class="w-full text-gray-dark hover:text-primary group-aria-expanded:text-primary"
              :icon="{ name: link.icon }"
              :centered="false"
              link
              @click="showDropdown(index)"
            >
              {{ t('menu.' + link.label) }}
              <BaseIcon
                name="arrowLeft"
                class="w-4 h-4 ml-auto transition-transform"
                :class="activeDropdown === index ? '-rotate-90' : '-rotate-180'"
              />
            </BaseButton>
            <ul v-if="activeDropdown === index" class="flex flex-col gap-2 my-1.5 pl-4">
              <li v-for="child in link.children" :key="child.label">
                <BaseLink
                  :to="child.to"
                  variant="none"
                  class="w-full text-gray-dark hover:text-primary aria-[current=page]:text-primary"
                  :centered="false"
                  link
                >
                  {{ t('menu.' + child.label) }}
                </BaseLink>
              </li>
            </ul>
          </div>
          <BaseLink
            v-else
            :to="link.to"
            variant="none"
            class="w-full text-gray-dark hover:text-primary aria-[current=page]:text-primary"
            :icon="{ name: link.icon }"
            :centered="false"
            link
          >
            {{ t('menu.' + link.label) }}
          </BaseLink>
        </template>
      </div>
    </div>
  </div>
  <transition leave-active-class="duration-150">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/20"
      :class="`z-overlay`"
      @click="menuStore.closeSidebar"
    ></div>
  </transition>
</template>
