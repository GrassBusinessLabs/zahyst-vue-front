<template>
   <div class='map-container'>
      <div class='map-container__map' ref='mapContainer'><div class="center-point"></div><div class="center-point point-rotate"></div></div>
   </div>
</template>

<script lang='ts' setup>
import {onMounted, onUnmounted, ref} from 'vue'
import {LngLatLike} from '@tomtom-international/web-sdk-maps'



import { mapService } from '@/services/map'

const map = mapService()

const mapContainer = ref<HTMLElement | null>(null)

async function currentPosition(): Promise<LngLatLike> {
   return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            resolve({
               lng: position.coords.longitude,
               lat: position.coords.latitude,
            });
         },
         (error) => {
            reject(error);
         }
      );
   });
}

onMounted(async () => {
   if (mapContainer.value) {
      const currentPositionValue = await currentPosition()
      map.createMap(mapContainer.value as HTMLElement, {center: currentPositionValue})
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
