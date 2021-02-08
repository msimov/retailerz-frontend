import MapPicker from 'react-google-map-picker'

const LocationPicker = (props) => {
  
    const {location, setLocation} = props;
    
    return (
        location ? 
        <MapPicker defaultLocation={location}
            style={{width: '500px', height:'500px'}}
            onChangeLocation={(lat, lng) => {setLocation({lat, lng})}} 
            apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
        />
        : <div>Loading...</div>
    );
}

export {LocationPicker};