import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";
import { FormTextField } from './formTextField.component';
import { FormButton } from './formButton.component';
import { LocationPicker } from './formLocationPicker.component';
const StoreAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, storeId} = match.params;
    const isAddMode = !storeId;
    const currentUser = firebase.getCurrentUser();
    
    const [location, setLocation] = useState(null);
    const { control, handleSubmit, reset, setValue, errors, formState} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createStore(data)
            : updateStore(data);
    }

    const createStore = (data) => {
        currentUser.getIdToken().then(idToken => {
             StoreService.create(userId, {...data, storeLat: location.lat, storeLng: location.lng}, idToken).then(res => {
                history.go(0)
             });    
        })
    }

    const updateStore = (data) => {
        currentUser.getIdToken().then(idToken => {
            StoreService.updateByStoreId(storeId, {...data, storeLat: location.lat, storeLng: location.lng}, idToken).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                StoreService.findByStoreId(storeId, idToken).then(res => {
                    const fields = ['storeLocation'];
                    fields.forEach(field => setValue(field, res[field]));
                    setLocation({
                        lat: res.storeLat,
                        lng: res.storeLng
                    })
                })
            })
        } else {
            navigator.permissions.query({name: 'geolocation'}).then(result => {
                if(result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(position => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    })
                } else {
                    setLocation({
                        lat: 42.698334,
                        lng: 23.319941
                    })
                }
            })
        }
    }, [currentUser, userId, storeId, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Store' : 'Edit Store'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="storeLocation"
                        label="Location"
                        control={control}
                    />
                    <div>{errors.location?.message}</div>
                </div>
            </div>
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
        </form>
    )
    
}

export {StoreAddEditForm};