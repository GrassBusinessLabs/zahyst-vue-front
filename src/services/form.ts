import * as yup from 'yup'

import {
   MAX_PASS_LEN,
   MAX_TEXT_LEN,
   MAX_TITLE_LEN,
   MAX_EMAIL_LEN,
   MIN_PASS_LEN,
   MIN_TEXT_LEN,
   MIN_TITLE_LEN,
   MIN_EMAIL_LEN
} from '@/constants'

export const formService = () => {
   function vuetifyConfig(state: any) {
      return {
         props: {
            'error-messages': state.errors
         }
      }
   }

   function emailValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_EMAIL_LEN).max(MAX_EMAIL_LEN).email()
      return required ? validator.required() : validator
   }

   function passwordValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_PASS_LEN).max(MAX_PASS_LEN).required()
      return required ? validator.required() : validator
   }

   function titleValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_TITLE_LEN).max(MAX_TITLE_LEN)
      return required ? validator.required() : validator
   }

   function textValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_TEXT_LEN).max(MAX_TEXT_LEN)
      return required ? validator.required() : validator
   }

   return {
      vuetifyConfig,
      emailValidator,
      passwordValidator,
      titleValidator,
      textValidator
   }
}
