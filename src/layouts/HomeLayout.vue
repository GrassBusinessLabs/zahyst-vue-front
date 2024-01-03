<template>
   <v-layout class='rounded rounded-md'>
      <app-header>
         <div class="d-flex justify-center align-center h-100">
               <v-btn
                  icon="$menu"
                  @click.stop="drawer = !drawer"
               ></v-btn>
            </div>
      </app-header>
      <v-main class='bg-grey-lighten-3 d-flex'>
         <v-navigation-drawer
            v-model='drawer'
            :temporary='true'
            class='position-fixed'
         >
            <v-list-item
               prepend-avatar='https://randomuser.me/api/portraits/men/3.jpg'
               class='my-padding '
            >
               <v-list-item-title class='text-h6 pa-1'>{{ userName }}</v-list-item-title>
               <v-list-item-subtitle class='text-subtitle-1 pa-1'>{{ userEmail }}</v-list-item-subtitle>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density='compact' :nav='true' class=".justify-space-between">
               <v-list-item @click="item.route" :key="index" v-for="(item, index) in items">
                  <template v-slot:prepend>
                     <v-icon icon='mdi-home'></v-icon>
                     <v-list-item-title class='text-subtitle-1 ml-2 pa-2'>{{ item.title }}</v-list-item-title>
                  </template>
               </v-list-item>
               <v-list-item @click="logout">
                  <template v-slot:prepend>
                     <v-icon icon='mdi-logout'></v-icon>
                     <v-list-item-title class='text-subtitle-1 ml-2 pa-2'>Logout</v-list-item-title>
                  </template>
               </v-list-item>
               <app-select-lang/>
            </v-list>
         </v-navigation-drawer>
         <slot />
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import {useUserStore} from '@/stores'
import { useRouting } from '@/composables'
import AppHeader from '@/components/AppHeader.vue'
import AppSelectLang from '@/components/AppSelectLang.vue'

const routing = useRouting()
const userStore = useUserStore()
const {logout} = userStore

var userName = ""
var userEmail = ""

onMounted(async () => {
   const data = await userStore.getUserData()
   if(data){
      userName = data?.user.name.toString()
      userEmail = data?.user.email.toString()
   }

})

const drawer =  ref(false)

const items = ref([
   { 
      title: 'Map',
      route: routing.toMap()
   },

])
console.log()





</script>

<style lang='scss' scoped>
.card-title {
   font-size: 1rem;
}
.my-padding {
   padding: 11.6px;
}
</style>

