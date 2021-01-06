import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import StoreService from '../../services/store.service';
import { FirebaseContext } from '../Firebase';

const AddEdit = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {id} = match.params;
    const isAddMode = !id;
    const currentUser = firebase.getCurrentUser();

    const validationSchema = Yup.object().shape({
        location: Yup.string()
            .required('Location is required')
    });

    const { register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        return isAddMode
            ? createStore(data)
            : updateStore(id, data);
    }

    const createStore = (data) => {

        currentUser.getIdToken().then(idToken => {
             StoreService.create(currentUser.uid, data, idToken).then(res => {
                 history.push('.');
             });
        })
    }

    const updateStore = (storeId, data) => {
        currentUser.getIdToken().then(idToken => {
            StoreService.updateById(currentUser.uid, storeId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                StoreService.findById(currentUser.uid, id, idToken).then(res => {
                    const fields = ['location'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, id, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Store' : 'Edit Store'}</h1>
            <div>
                <div>
                    <label>Location</label>
                    <input name="location" type="text" ref={register}/>
                    <div>{errors.location?.message}</div>
                </div>
            </div>
            <div>
                <button type="submit" disabled={formState.isSubmitting}>
                    {formState.isSubmitting && <span>Loading...</span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'}>Cancel</Link>
            </div>
        </form>
    )
    
}

export {AddEdit};