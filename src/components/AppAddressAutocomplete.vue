<template>
   <v-autocomplete
      v-model='addressModel'
      v-model:search='searchModel'
      :items='items'
      :loading='loading'
      autocomplete='off'
      item-title='address'
      label='Address'
      prepend-inner-icon='mdi-map-marker-outline'
      :no-filter='true'
      :hide-details='true'
      :return-object='true'
      @update:modelValue='selectHandler'
      @update:search='debounceSearch'
   />
</template>

<script lang='ts' setup>
import {defineEmits, ref} from 'vue'
import * as debounce from 'lodash.debounce'

import type {AddressItem} from '@/services/map'
import {mapService} from '@/services/map'

const emit = defineEmits<{
   (e: 'select', address: AddressItem): void
}>()

const map = mapService()

const loading = ref<boolean>(false)
const addressModel = ref<AddressItem | null>(null)
const searchModel = ref<string | null>(null)
const items = ref<AddressItem[]>([])

const debounceSearch = debounce(search, 1000)

function selectHandler(event: AddressItem): void {
   emit('select', event)
}

async function search(value: string | null): Promise<void> {
   try {
      loading.value = true

      const searchValue: string = value?.trim() || ''

      if (!searchValue) {
         items.value = []
         loading.value = false
         return
      }

      items.value = await map.searchAddresses(searchValue)

      loading.value = false
   } catch (e) {
      console.error(e)
      items.value = []
      loading.value = false
   }
}
</script>

<style lang='scss' scoped>

</style>
