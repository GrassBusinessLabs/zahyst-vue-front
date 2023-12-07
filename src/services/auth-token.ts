import moment from 'moment'

import {appStorageService} from '@/services/app-storage'
import {AUTH_TOKEN, AUTH_TOKEN_LIFE, LANG} from '@/constants'

export const authTokenService = () => {

   const storage = appStorageService()

   async function set(token: string | null): Promise<void> {
      if (token) {
         const expDateTimestamp: number = moment().valueOf() + 7 * 24 * 60 * 60 * 1000
         const expDateStr: string = moment(expDateTimestamp).format('YYYY-MM-DD HH:mm:ss')
         await storage.set(AUTH_TOKEN, token)
         await storage.set(AUTH_TOKEN_LIFE, expDateStr)
      } else {
         await storage.clearExcept(LANG)
      }
   }

   async function destroy(): Promise<void> {
      await set(null)
   }

   async function get(): Promise<string | null> {
      const currentDate: Date = moment().toDate()
      const expDateStr: string | null = await storage.get(AUTH_TOKEN_LIFE)
      const expDate: Date = moment(expDateStr!).toDate()

      if (currentDate > expDate) {
         await destroy()
         return null
      }

      return storage.get(AUTH_TOKEN)
   }

   return {
      set,
      destroy,
      get
   }
}
