import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import MeasureUnitService from '../services/measureUnit.service';
import { FormTextField } from './formTextField.component';
import { FormButton } from './formButton.component';

const MeasureUnitAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, measureUnitId} = match.params;
    const isAddMode = !measureUnitId;
    const currentUser = firebase.getCurrentUser();

    const { control, handleSubmit, reset, setValue, errors, formState} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createMeasureUnit(data)
            : updateMeasureUnit(data);
    }

    const createMeasureUnit = (data) => {

        currentUser.getIdToken().then(idToken => {
             MeasureUnitService.create(userId, data, idToken).then(res => {
                 history.push('.');
             });    
        })
    }

    const updateMeasureUnit = (data) => {
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.updateByMeasureUnitId(measureUnitId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                MeasureUnitService.findByMeasureUnitId(measureUnitId, idToken).then(res => {
                    const fields = ['measureUnitName'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, measureUnitId, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Measure Unit' : 'Edit Measure Unit'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="measureUnitName"
                        label="Measure Unit Name"
                        control={control}
                    />
                    <div>{errors.unit?.message}</div>
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

export {MeasureUnitAddEditForm};