import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";
import { FormTextField } from './formTextField.component';
import { FormButton } from './formButton.component';

const StoreAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, storeId} = match.params;
    const isAddMode = !storeId;
    const currentUser = firebase.getCurrentUser();

    const { control, handleSubmit, reset, setValue, errors, formState} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createStore(data)
            : updateStore(data);
    }

    const createStore = (data) => {

        currentUser.getIdToken().then(idToken => {
             StoreService.create(userId, data, idToken).then(res => {
                 history.push('.');
             });    
        })
    }

    const updateStore = (data) => {
        currentUser.getIdToken().then(idToken => {
            StoreService.updateByStoreId(storeId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                StoreService.findByStoreId(storeId, idToken).then(res => {
                    const fields = ['storeLocation'];
                    fields.forEach(field => setValue(field, res[field]));
                })
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