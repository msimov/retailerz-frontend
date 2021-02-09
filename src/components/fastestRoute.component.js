import { useEffect, useState } from "react"
import RouteXLService from "../services/routeXL.service"


const GenerateRouteForm = ({operations, setRoute}) => {

    const [location, setLocation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    let locations = operations.map(operation => {
        return {
            address: operation.storeLocation,
            lat: operation.storeLat,
            lng: operation.storeLng
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();

        setIsSubmitting(true)

        const startEndLocation = {
            lat: location.lat,
            lng: location.lng
        }

        locations = [
            {
                address: "Start",
                ...startEndLocation
            },
            ...locations,
            {
                address: "End",
                ...startEndLocation
            }

        ]
        
        RouteXLService.generateRoute(locations).then(res => {
            setRoute(Object.entries(res.route).map((route) => ({[route[0]] : route[1]})));
            setIsSubmitting(false);
        })
    }

    useEffect(() => {
        navigator.permissions.query({name: 'geolocation'}).then(result => {
            console.log(result)
            if(result.state === "granted") {
                navigator.geolocation.getCurrentPosition(position => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                })
            } else {
                setLocation({
                    lat: 42.698334,
                    lng: 23.319941
                })
            }
        })
    }, [])

    return(
        <div></div>
        /* <form onSubmit={onSubmit}>
            {location ? 
                <div>
                    <LocationPicker
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
                : <div>Loading...</div>
            }          
            <FormButton 
                label="Generate Route"
                type="submit"
                disabled={isSubmitting}
            />
        </form> */
    )
}


export {GenerateRouteForm}