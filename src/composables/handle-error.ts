import {useToastDialog} from '@/composables/toast'
import {utilsService} from '@/services'
import {useAppI18n} from '@/i18n'
import {useUserStore} from '@/stores'

export const useHandleError = () => {
   const toastDialog = useToastDialog()
   const {translate} = useAppI18n()
   const userStore = useUserStore()
   const {logout} = userStore

   const utils = utilsService()

   const tokenExpiredMsg: string = 'Token Expired!'

   function handleError(error: any): void {
      const errorMsg: string = utils.getErrorMessage(error)

      if (errorMsg === tokenExpiredMsg) {
         logout()
         toastDialog.info(translate('ERRORS.SESSION_IS_EXPIRED'))
         return
      }

      toastDialog.error(errorMsg)
   }

   return {
      handleError
   }
}
