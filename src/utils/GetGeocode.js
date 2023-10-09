import { apiKey } from "../firebaseConfig";

const GetGeocode = async (address) => {
    try {
        const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=
        ${encodeURIComponent(address)}&key=${apiKey}`
        const response = await fetch(geocodingApiUrl);
        const data = await response.json();
        if (data.status === 'OK') {
            const {lat, lng} = data.results[0].geometry.location;
            return {latitude: lat, longitude: lng};
        } else {
            console.error('No results found for the given address')
            return
        }
    } catch (error) {
        console.error('Error geocoding address: ', error)
        return
    }
}

export default GetGeocode;