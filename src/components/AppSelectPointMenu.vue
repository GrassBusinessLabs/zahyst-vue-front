<template>
  <div class="text-center">
    <v-btn
      text="Create Point"
      size="x-large"
      @click="getAdress()"
      class="w-100"
    ></v-btn>

    <v-bottom-sheet v-model="sheet" inset>
      <v-card
        class="text-center"
        height="700"
      >
        <v-card-text>

          <br>

          <div>
            <app-point-menu-form @close-window="sheet = !sheet" :address="currentAddress" />
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts" setup>
import AppPointMenuForm from '@/components/AppPointMenuForm.vue'
import { ref } from 'vue'
import { mapService } from '@/services/map'
import { ttmapApi } from '@/services/ttmap-api';

const map = mapService()
const ttmap = ttmapApi()


const sheet = ref(false)
const currentAddress = ref<string>('')

async function getAdress(){
  currentAddress.value = await ttmap.getAddressWithLngLat(10, map.getMap()?.getCenter())
  sheet.value = !sheet.value

}
</script>

<style lang="sass" scoped>

</style>