import Geocode from 'react-geocode';

const apiKey = process.env.REACT_APP_API_KEY

class GeocodeService {
    constructor() {
        Geocode.setApiKey(apiKey);
        Geocode.setLanguage('en');
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();
    }

    fromLatLng = (lat, lng) =>
        Geocode.fromLatLng(lat, lng);

    fromAddress = (address) =>
        Geocode.fromAddress(address);

}

export default GeocodeService;