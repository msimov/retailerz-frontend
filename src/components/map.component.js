import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({position, setPosition}) => {

    return(
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_API_KEY}`}
        >
            <GoogleMap
                mapContainerStyle={{width: '100%', height: '400px'}}
                zoom={10}
                center={position}
                onClick={(e) => setPosition(e.latLng.toJSON())}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false
                }}
            >
                <Marker 
                    position={position}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map