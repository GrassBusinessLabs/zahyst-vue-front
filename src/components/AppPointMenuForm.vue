<template>
<v-form @submit.prevent='submit'>
    <v-sheet class="pa-2" rounded>
        <v-text-field
            label="Name"
            v-model="valueName"
        ></v-text-field>
    </v-sheet>
    <v-sheet class="pa-2" rounded>
        <v-textarea
            label="Description"
            class="mb-2"
            v-model="valueDescription"
        ></v-textarea>
    </v-sheet>
    <v-sheet class="pa-2" rounded>
        <span>Address: {{ props.address }}</span>
    </v-sheet>
    <v-sheet class="pa-2" rounded>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                <v-autocomplete
                    v-model="valueType"
                    :items="items"
                    label="Type"
                ></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
        <br>
        <v-btn
            block
            color="success"
            size="large"
            variant="elevated"
            type='submit'
        >
        Submit
        </v-btn>
    </v-sheet>
</v-form>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
// import * as yup from 'yup'
// import {toTypedSchema} from '@vee-validate/yup'
import { requestService } from '@/services'
import {useForm} from 'vee-validate'
import { Location } from '@/models/location'
import { mapService } from '@/services/map'
import { ttmapApi } from '@/services/ttmap-api'
// import { formService } from '@/services'

// const { pointNameValidator, pointDescriptionValidator } = formService()

const map = mapService()
const ttmap = ttmapApi()
const api = requestService() 

const items = ['type1', 'type2', 'type3', 'type4']
const valueType = ref(items[0])
const valueName = ref('')
const valueDescription = ref('')

const isSubmitting = ref<boolean>(false)

const form = useForm({
//     validationSchema: toTypedSchema(
//       yup.object({
//         name: pointNameValidator(),
//         description: pointDescriptionValidator()
//       })
//    ),
})

const submit = form.handleSubmit(async values => {
   try {
        console.log(values)
        if (isSubmitting.value) {
            return
        }
        isSubmitting.value = true
        const position = map.getMap()?.getCenter()

        const mapCenter = map.getMap()?.getCenter();
        let address = ''
        if (mapCenter) {
            address = await ttmap.getAddressWithLngLat(10, mapCenter);
        } else {
            console.error("Map center is undefined or null.");
        }
        const body: Location = {
            title: valueType.value.toString(),
            description: valueDescription.value.toString(),
            type: valueType.value.toString(), 
            address: address.toString(),
            lat: position?.lat,
            lon: position?.lng
        }

        const data = await api.createLocation(body)
        if(position != undefined)
            map.addMarkerToMap(map.createMarker(data.id, position))
        form.resetForm()
        isSubmitting.value = false
        emit('closeWindow')
    } catch (e) {
        console.error(e)
        isSubmitting.value = false
    }
})

const props = defineProps<{
    address: string,
}>()

const emit = defineEmits<{
  (e: 'closeWindow'): void
}>()


</script>

<style lang="sass" scoped>

</style>