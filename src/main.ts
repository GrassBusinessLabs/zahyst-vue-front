import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from '@/App.vue'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Router
import router from '@/router'

// Internationalization
import i18n from '@/i18n'

// Toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import {DEFAULT_TOAST_CONFIG} from '@/constants/app'

// Global styles
import '@/styles.scss'

const vuetify = createVuetify({
   components,
   directives,
   icons: {
      defaultSet: 'mdi'
   }
})

const app = createApp(App)
   .use(vuetify)
   .use(createPinia())
   .use(i18n as any)
   .use(Toast, DEFAULT_TOAST_CONFIG as any)
   .use(router)

app.mount('#app')
