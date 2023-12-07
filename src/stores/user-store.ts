import {defineStore} from 'pinia'
import type {Ref} from 'vue'
import {ref} from 'vue'

import type {CurrentUser} from '@/models'
import {authTokenService, requestService} from '@/services'
import {useHandleError, useRouting} from '@/composables'

export const useUserStore = defineStore('user', () => {
   const {handleError} = useHandleError()
   const routing = useRouting()

   const request = requestService()
   const authToken = authTokenService()

   const currentUser: Ref<CurrentUser | null> = ref<CurrentUser | null>(null)

   function setCurrentUser(value: CurrentUser | null): void {
      currentUser.value = value
   }

   async function getUserData(): Promise<CurrentUser | null> {
      try {
         if (currentUser.value?.id) {
            return currentUser.value
         }

         const userData: CurrentUser = await request.getCurrentUser()
         setCurrentUser(userData)

         return currentUser.value
      } catch (e) {
         console.error(e)
         handleError(e)
         return null
      }
   }

   async function populate(): Promise<void> {
      try {
         const token: string | null = await authToken.get()

         if (!token) {
            return
         }

         const userData: CurrentUser | null = await getUserData()
         if (!userData) {
            await logout()
         }
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }

   async function logout(): Promise<void> {
      try {
         await request.logout()
      } catch (e) {
         console.error(e)
      } finally {
         await authToken.destroy()
         setCurrentUser(null)
         await routing.toSignIn()
      }
   }

   return {
      currentUser,
      setCurrentUser,
      populate,
      logout
   }
})
