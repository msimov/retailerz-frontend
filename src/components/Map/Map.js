import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ position, setPosition, draggable }) => {
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      zoom={10}
      center={position}
      onClick={(e) => setPosition && setPosition(e.latLng.toJSON())}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        draggable: draggable,
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};

export default Map;
