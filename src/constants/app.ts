import type {PluginOptions} from 'vue-toastification'
import {POSITION} from 'vue-toastification'

export const APP_NAME: string = 'vue3-boilerplate'

export const DEFAULT_TOAST_CONFIG: PluginOptions = {
   containerClassName: ['toast-dialog-container'],
   maxToasts: 3,
   timeout: 6_000,
   position: POSITION.TOP_RIGHT
}
