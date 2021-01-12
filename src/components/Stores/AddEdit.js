import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import StoreService from '../../services/store.service';
import { FirebaseContext } from '../Firebase';
import FormTextField from '../FormTextField';
import FormButton from '../FormButton';

const AddEdit = ({match}) => {
    
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
            StoreService.updateById(userId, storeId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                StoreService.findById(userId, storeId, idToken).then(res => {
                    const fields = ['location'];
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
                        name="location"
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

export {AddEdit};