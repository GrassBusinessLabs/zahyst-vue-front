import {createI18n, useI18n} from 'vue-i18n'

import {appStorageService} from '@/services'
import {LANG} from '@/constants'
import en from '@/i18n/locales/en.json'
import uk from '@/i18n/locales/uk.json'

export type Lang = 'en' | 'uk'

export interface LangInfo {
   lang: Lang
   name: string
   native: string
   localizeKey: string
}

const defaultLang: Lang = 'en'

const i18n = createI18n({
   legacy: false,
   locale: defaultLang,
   messages: {en, uk}
})

export const useAppI18n = () => {
   const storage = appStorageService()
   const {locale, t: translate} = useI18n({useScope: 'global'})

   const languages: Readonly<Lang[]> = ['en', 'uk']

   async function changeLang(lang: Lang): Promise<void> {
      if (!languages.includes(lang)) {
         lang = defaultLang
      }

      locale.value = lang
      await storage.set(LANG, lang)
      document.documentElement.setAttribute('lang', lang)
   }

   async function getCurrentLang(): Promise<Lang> {
      const storageLang: Lang = await storage.get(LANG) as Lang

      if (languages.includes(storageLang)) {
         return storageLang
      }

      for (const lang of navigator.languages) {
         const browserLang: Lang | null = languages.find((el: string) => lang.includes(el)) || null

         if (browserLang) {
            return browserLang
         }
      }

      return defaultLang
   }

   function getLangsInfo(): LangInfo[] {
      return [
         {lang: 'en', name: 'English', native: 'English', localizeKey: 'LANGUAGES.ENGLISH'},
         {lang: 'uk', name: 'Ukrainian', native: 'Українська', localizeKey: 'LANGUAGES.UKRAINIAN'}
      ]
   }

   function getLangInfo(lang: Lang): LangInfo | null {
      return getLangsInfo().find((el: LangInfo) => el.lang === lang) || null
   }

   async function init(): Promise<void> {
      try {
         const currentLang: Lang = await getCurrentLang()
         await changeLang(currentLang)
      } catch (e) {
         console.error(e)
      }
   }

   return {
      i18n,
      locale,
      translate,
      defaultLang,
      languages,
      changeLang,
      getCurrentLang,
      getLangsInfo,
      init,
      getLangInfo
   }
}

export default i18n
