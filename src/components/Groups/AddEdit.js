import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from '../Firebase';
import GroupService from '../../services/group.service';

const AddEdit = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, groupId} = match.params;
    const isAddMode = !groupId;
    const currentUser = firebase.getCurrentUser();

    const { register, handleSubmit, reset, setValue, errors, formState} = useForm();

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
            GroupService.updateById(userId, groupId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                GroupService.findById(userId, groupId, idToken).then(res => {
                    const fields = ['name'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, groupId, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Group' : 'Edit Group'}</h1>
            <div>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" ref={register}/>
                    <div>{errors.name?.message}</div>
                </div>
            </div>
            <div>
                <button type="submit" disabled={formState.isSubmitting}>
                    Save
                </button>
            </div>
        </form>
    )
    
}

export {AddEdit};