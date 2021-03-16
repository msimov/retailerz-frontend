import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({position, setPosition, draggable}) => {

    return(
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_API_KEY}`}
        >
            <GoogleMap
                mapContainerStyle={{width: '100%', height: '400px'}}
                zoom={10}
                center={position}
                onClick={(e) => (setPosition && setPosition(e.latLng.toJSON()))}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    draggable: draggable,
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