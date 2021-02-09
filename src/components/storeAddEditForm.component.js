import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Map from './map.component';
import { LoadScript } from "@react-google-maps/api";

const StoreAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const {storeId} = match.params;
    const isAddMode = !storeId;
    const currentUser = firebase.getCurrentUser();
    
    const [formData, setFormData] = useState({
        storeLocation: '',
        storeLat: 42.698334,
        storeLng: 23.319941
    });

    const onSubmit = () => {
        return isAddMode
            ? createStore()
            : updateStore();
    }

    const createStore = () => {
        currentUser.getIdToken().then(idToken => {
             StoreService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
             });    
        })
    }

    const updateStore = () => {
        currentUser.getIdToken().then(idToken => {
            StoreService.updateByStoreId(storeId, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    const onClick = () => {
        history.goBack();
    }

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onPositionChange = ({lat, lng}) => {
        setFormData({...formData, storeLat: lat, storeLng: lng})
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                StoreService.findByStoreId(storeId, idToken).then(res => {
                    const fields = ['storeLocation', 'storeLat', 'storeLng'];
                    let store = null; 
                    fields.forEach(field => {
                        store = {...store, [field]: res[field]}
                    });
                    setFormData(store)
                })
            })
        }
    }, [currentUser, storeId, isAddMode]);

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add store" : "Edit store"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Location'
                        name='storeLocation'
                        onChange={onChange}
                        value={formData.storeLocation}
                    />
                    <Form.Field>
                        <Map position={{lat: formData.storeLat, lng: formData.storeLng}} setPosition={onPositionChange} />
                    </Form.Field>
                    <Button.Group fluid>
                        <Button type='button' onClick={onClick}>Cancel</Button>
                        <Button.Or/>
                        {
                            isAddMode
                            ? <Button positive>Add</Button>
                            : <Button positive>Save</Button>
                        }
                    </Button.Group>
                </Segment>
            </Form>
        </Grid.Column>
/*         <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Store' : 'Edit Store'}</h1>

            <div>
                <div>
                    <LocationPicker
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
            </div>
            <div>
                <FormButton 
                    label="Save"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
        </form> */
    )
    
}

export {StoreAddEditForm};