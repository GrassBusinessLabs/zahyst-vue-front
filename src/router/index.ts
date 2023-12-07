import type {RouteRecordRaw, RouterOptions} from 'vue-router'
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'

import {authTokenService} from '@/services'
import {useToastDialog} from '@/composables'
import SignInView from '@/views/SignInView.vue'
import PostsView from '@/views/PostsView.vue'
import ErrorView from '@/views/ErrorView.vue'

const toastDialog = useToastDialog()
const authToken = authTokenService()

const routes: RouteRecordRaw[] = [
   {
      path: '/sign-in/',
      name: 'SignIn',
      component: SignInView,
      alias: '/',
      meta: {auth: false}
   },
   {
      path: '/posts',
      name: 'Posts',
      component: PostsView,
      meta: {auth: true}
   },
   {
      path: '/:all(.*)*',
      name: 'all',
      component: ErrorView
   }
] as RouteRecordRaw[]

const router = createRouter({
   history: createWebHistory(),
   routes
} as RouterOptions)

router.beforeEach(async (to: RouteLocationNormalized) => {
   try {
      const metaAuth: boolean = (to.meta as any).auth as boolean
      const authTokenValue: string | null = await authToken.get()

      if (typeof metaAuth as any !== 'boolean') {
         return true
      }

      if (!authTokenValue && metaAuth) {
         return {name: 'SignIn'}
      }

      if (authTokenValue && !metaAuth) {
         return {name: 'Posts'}
      }

      return true
   } catch (e) {
      console.error(e)
      toastDialog.error(e)
      return false
   }
})

export default router
