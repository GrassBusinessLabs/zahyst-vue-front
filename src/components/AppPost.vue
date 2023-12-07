<template>
   <v-col cols='12'>
      <v-card>
         <template v-slot:title>
            {{ post.title }}
         </template>

         <template v-slot:text>
            {{ post.body }}
         </template>
      </v-card>
   </v-col>
</template>

<script lang='ts' setup>
import {defineProps} from 'vue'

import type {Post} from '@/models'

defineProps<{
   post: Post
}>()
</script>

<style lang='scss' scoped>

</style>
