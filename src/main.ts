import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/plugins/pinia'
import i18n from '@/plugins/i18n'
import layouts from '@/layouts'
import VueApexCharts from 'vue3-apexcharts'
// styles
import '@vuepic/vue-datepicker/dist/main.css'
import '@/shared/assets/tailwind.css'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('@/mocks/browser')
  worker.start({ onUnhandledRequest: 'bypass' })
}

export const app = createApp(App)

app.use(VueApexCharts)
app.use(layouts)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
