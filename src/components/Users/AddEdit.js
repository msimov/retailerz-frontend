import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../Firebase";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from 'react-select';
import UserService from "../../services/user.service";
import UserTypeService from "../../services/user-type.service";
import { AuthUserContext } from "../Session";

const AddEdit = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {authUser, setAuthUser} = useContext(AuthUserContext);
    
    const {userId} = match.params;
    const currentUser = firebase.getCurrentUser();
    const isAddMode = !userId;

    const [userTypes, setUserTypes] = useState([]); 


    const { register, handleSubmit, reset, setValue, errors, formState, control} = useForm();

    const onSubmit = (data) => {
        if(isAddMode) {
            const fields = ['type'];
            fields.forEach(field => {
                data[field] = data[field].value;
            });
        }
        return isAddMode
            ? createUser(data)
            : updateUser(userId, data);
    }

    const createUser = (data) => {
        currentUser.getIdToken().then(idToken => {
            UserService.create(currentUser.uid, data, idToken).then(res => {
                setAuthUser({...authUser, data: res});
                history.push(`/home`);
            });
        })
    }

    const updateUser = (userId, data) => {
        currentUser.getIdToken().then(idToken => {
            UserService.updateById(userId, data, idToken).then(res => {
                setAuthUser({...authUser, data: res});
                history.push('.');
            })
        })
    }

    useEffect(() => {

        UserTypeService.getAll().then(res => {
            setUserTypes(res.map(({id, type}) => ({value: id, label: type})));
        });
    
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                UserService.findById(userId, idToken).then(res => {
                    const fields = ['firstName', 'lastName', 'email', 'type'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, setValue, isAddMode]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div>
                <div>
                    <label>First Name</label>
                    <input name="firstName" type="text" ref={register}/>
                    <div>{errors.firstName?.message}</div>
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="lastName" type="text" ref={register}/>
                    <div>{errors.lastName?.message}</div>
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="text" ref={register}/>
                    <div>{errors.email?.message}</div>
                </div>

                { isAddMode ?
                    <div>
                        <label>Type</label>
                        <Controller
                            as={ReactSelect}
                            defaultValue=""
                            options={userTypes}
                            name="type"
                            control={control}
                        />
                        <div>{errors.type?.message}</div>
                    </div>
                    : null
                }
            </div>
            <div>
                <button type="submit" disabled={formState.isSubmitting}>
                    Save
                </button>
            </div>
        </form>
    )
}

export { AddEdit };