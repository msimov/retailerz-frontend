import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import { useForm } from "react-hook-form";
import UserService from "../services/user.service";
import UserTypeService from "../services/userType.service";
import AuthUserContext from "../context/authUser.context";
import { FormTextField } from "./formTextField.component";
import { FormSelect } from "./formSelect.component";
import { FormButton } from "./formButton.component";

const UserAddEditForm = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {authUser, setAuthUser} = useContext(AuthUserContext);
    
    const {userId} = match.params;
    const currentUser = firebase.getCurrentUser();
    const isAddMode = !userId;

    const [userTypes, setUserTypes] = useState([]); 


    const { handleSubmit, reset, setValue, errors, formState, control} = useForm();

    const onSubmit = (data) => {
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
            setUserTypes(res.map(({id, type}) => ({key: id, label: type})));
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
                    <FormTextField 
                        name="firstName"
                        label="First Name"
                        control={control}
                    />
                    <div>{errors.firstName?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="lastName"
                        label="First Name"
                        control={control}
                    />
                    <div>{errors.lastName?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="email"
                        label="Email"
                        control={control}
                    />
                    <div>{errors.email?.message}</div>
                </div>

                { isAddMode ?
                    <div>
                        <FormSelect 
                            name="type"
                            label="Type"
                            options={userTypes}
                            control={control}
                        />
                        <div>{errors.type?.message}</div>
                    </div>
                    : null
                }
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

export { UserAddEditForm };