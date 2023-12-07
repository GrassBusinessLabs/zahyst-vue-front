<template>
   <v-app-bar color='primary'>
      <v-app-bar-title>Vue3 Boilerplate</v-app-bar-title>

      <template v-slot:append>
         <app-select-lang />
      </template>
   </v-app-bar>
</template>

<script lang='ts' setup>
import AppSelectLang from '@/components/AppSelectLang.vue'
</script>

<style lang='scss' scoped>

</style>
