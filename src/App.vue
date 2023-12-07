<template>
   <v-app>
      <router-view></router-view>
   </v-app>
</template>

<script setup lang='ts'>
import {onMounted} from 'vue'

import {useAppI18n} from '@/i18n'
import {useUserStore} from '@/stores'

const appI18n = useAppI18n()
const userStore = useUserStore()
const {populate} = userStore

populate()

onMounted(() => {
   appI18n.init()
})
</script>

<style scoped>

</style>
