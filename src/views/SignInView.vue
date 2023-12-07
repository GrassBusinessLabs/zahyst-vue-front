<template>
   <auth-layout>
      <v-sheet class='mx-auto' width='320'>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12'>
                  <v-text-field
                     v-model='username'
                     v-bind='usernameAttrs'
                     :label='translate("INPUTS.EMAIL")'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='email'
                  ></v-text-field>
               </v-col>

               <v-col cols='12'>
                  <v-text-field
                     v-model='password'
                     v-bind='passwordAttrs'
                     :label='translate("INPUTS.PASSWORD")'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showPassword ? 'text' : 'password'"
                     @click:append-inner='showPassword = !showPassword'
                  ></v-text-field>
               </v-col>

               <v-col cols='12'>
                  <v-btn
                     class='mt-2'
                     :block='true'
                     :disabled='isSubmitting'
                     type='submit'
                     color='primary'
                  >
                     {{ translate('BTNS.SIGN_IN') }}
                  </v-btn>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </auth-layout>
</template>

<script lang='ts' setup>
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'
import type {MaybeRefOrGetter} from 'vue'
import {ref} from 'vue'

import type {CurrentUser, LoginBody} from '@/models'
import {useHandleError, useRouting} from '@/composables'
import {useAppI18n} from '@/i18n'
import {authTokenService, formService, requestService} from '@/services'
import {useUserStore} from '@/stores'
import AuthLayout from '@/layouts/AuthLayout.vue'

const {handleError} = useHandleError()
const {translate} = useAppI18n()
const routing = useRouting()
const userStore = useUserStore()
const {setCurrentUser} = userStore

const {vuetifyConfig, usernameValidator, passwordValidator} = formService()
const request = requestService()
const authToken = authTokenService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         username: usernameValidator(),
         password: passwordValidator()
      })
   ),
   initialValues: {
      username: 'kminchelle',
      password: '0lelplR'
   }
})

const isSubmitting = ref<boolean>(false)
const [username, usernameAttrs] = form.defineField('username' as MaybeRefOrGetter, vuetifyConfig)
const [password, passwordAttrs] = form.defineField('password' as MaybeRefOrGetter, vuetifyConfig)

const showPassword = ref<boolean>(false)

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      const body: LoginBody = {
         username: values.username,
         password: values.password
      }

      const currentUser: CurrentUser = await request.login(body)
      setCurrentUser(currentUser)
      await authToken.set(currentUser.token)

      await routing.toPosts()

      isSubmitting.value = false
   } catch (e) {
      console.error(e)
      handleError(e)
      isSubmitting.value = false
   }
})
</script>

<style lang='scss' scoped>

</style>
