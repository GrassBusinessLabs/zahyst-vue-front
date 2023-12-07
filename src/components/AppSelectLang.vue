<template>
   <v-select
      class='select-lang'
      v-model='currentLang'
      :items='langs'
      variant='underlined'
      item-value='lang'
      @update:modelValue='changeLang($event)'
   >
      <template v-slot:selection='{ item, index }'>
         <span class='v-select__selection-text'>
            {{ translate(item.props.title.localizeKey) }}
         </span>
      </template>

      <template v-slot:item='{ props, item }'>
         <v-list-item v-bind='props' :title='translate(item.raw.localizeKey)'></v-list-item>
      </template>
   </v-select>
</template>

<script lang='ts' setup>
import {ref} from 'vue'

import type {Lang, LangInfo} from '@/i18n'
import {useAppI18n} from '@/i18n'

const {locale, getLangsInfo, changeLang, translate} = useAppI18n()

const langs = ref<LangInfo[]>(getLangsInfo())
const currentLang = ref<Lang>(locale.value as Lang)
</script>

<style lang='scss' scoped>
.select-lang {
   min-width: 100px;
}
</style>
