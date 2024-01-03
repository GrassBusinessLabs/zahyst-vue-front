
import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { mapService } from "./map"
import axios from "axios"


export const ttmapApi = () => {
    const map = mapService()
    
    async function getAddressWithLngLat(radius:number, coords: LngLatLike) {
        const apiUrl: string = "https://api.tomtom.com/search/2/reverseGeocode/" + coords.lat + "," + coords.lng + ".json?key=" + map.getApiKey() + "&radius=" + radius.toString()
        const response = await axios.get(apiUrl)
        const address = response.data.addresses[0].address.freeformAddress
        return address
    }


    return{
        getAddressWithLngLat,
    }
}