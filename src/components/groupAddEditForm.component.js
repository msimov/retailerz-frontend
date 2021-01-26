import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import GroupService from '../services/group.service';
import { FormTextField } from './formTextField.component';
import { FormButton } from './formButton.component';

const GroupAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, groupId} = match.params;
    const isAddMode = !groupId;
    const currentUser = firebase.getCurrentUser();

    const { control, handleSubmit, reset, setValue, errors, formState} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createGroup(data)
            : updateGroup(data);
    }

    const createGroup = (data) => {

        currentUser.getIdToken().then(idToken => {
             GroupService.create(userId, data, idToken).then(res => {
                 history.push('.');
             });    
        })
    }

    const updateGroup = (data) => {
        currentUser.getIdToken().then(idToken => {
            GroupService.updateByGroupId(groupId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                GroupService.findByGroupId(groupId, idToken).then(res => {
                    const fields = ['groupName'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, groupId, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Group' : 'Edit Group'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="groupName"
                        label="Group Name"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
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

export {GroupAddEditForm};