import {useToast} from 'vue-toastification'

import {utilsService} from '@/services'

export const useToastDialog = () => {
   const toast = useToast()
   const {getErrorMessage} = utilsService()

   return {
      error(error: any) {
         return toast.error(getErrorMessage(error), {
            toastClassName: 'toast-dialog-error'
         })
      },
      info(message: string) {
         return toast.info(message, {
            toastClassName: 'toast-dialog-info'
         })
      }
   }
}
