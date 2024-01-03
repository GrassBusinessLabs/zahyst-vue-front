<template>
   <div class='map-container'>
      <div class='map-container__map' ref='mapContainer'><div class="center-point"></div><div class="center-point point-rotate"></div></div>
   </div>
</template>

<script lang='ts' setup>
import {onMounted, onUnmounted, ref} from 'vue'
import {LngLatLike} from '@tomtom-international/web-sdk-maps'

import {mapService} from '@/services/map'

const map = mapService()

const mapContainer = ref<HTMLElement | null>(null)

let startingCoords: LngLatLike = {
   lat: 48.8622029334991,
   lng: 32.62480605898742
}

async function currentPosition(): Promise<LngLatLike>{
   const pos: Promise = await new Promise((resolve, 
   reject) => {
      navigator.geolocation.getCurrentPosition
      (resolve, reject);
   })
   return {
         lng: pos.coords.longitude,
         lat: pos.coords.latitude,
   }
} 

onMounted(async () => {
   if (mapContainer.value) {
      const currentPositionValue = await currentPosition()
      startingCoords = currentPositionValue
      map.createMap(mapContainer.value as HTMLElement, {center: startingCoords})
   }
})

onUnmounted(() => {
   map.destroyMap()
})
</script>

<style lang='scss'>
.map-container {
   height: calc(100vh - 250px);

   &__map {
      width: 100%;
      height: 100%;
      overflow: hidden;
   }
}

.map-marker {
   width: 50px;
   height: 50px;
   background-size: cover;
}

.center-point{
   position: absolute;
   left: 50%;
   top: calc(50%);
   z-index: 100;
   height: 12px;
   width: 2px;
   background-color: #000;
}
.point-rotate{
   transform: rotate(90deg);
}
</style>
