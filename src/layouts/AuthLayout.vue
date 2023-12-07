<template>
   <v-layout class='rounded rounded-md'>
      <app-header />

      <v-main class='d-flex align-center justify-center'>
         <slot />
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang='scss' scoped>

</style>
