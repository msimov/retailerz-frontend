import { useState } from "react"
import RouteXLService from "../services/routeXL.service"
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Map from "./map.component";

const GenerateRouteForm = ({operations, setRoute}) => {

    let locations = operations.map(operation => {
        return {
            address: operation.storeLocation,
            lat: operation.storeLat,
            lng: operation.storeLng
        }
    })

    const [formData, setFormData] = useState({
        homeLat: 42.698334,
        homeLng: 23.319941
    });

    const onSubmit = (event) => {
        event.preventDefault();

        const startEndLocation = {
            lat: formData.homeLat,
            lng: formData.homeLng
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
        })
    }

    const onPositionChange = ({lat, lng}) => {
        setFormData({...formData, homeLat: lat, homeLng: lng})
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Generate fastest route
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Field>
                        <Map position={{lat: formData.homeLat, lng: formData.homeLng}} setPosition={onPositionChange} />
                    </Form.Field>
                    <Button positive>Generate</Button>

                </Segment>
            </Form>
        </Grid.Column>
    )
}


export {GenerateRouteForm}