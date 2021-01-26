import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import { useForm } from "react-hook-form";
import UserService from "../services/user.service";
import UserTypeService from "../services/userType.service";
import { FormTextField } from "./formTextField.component";
import { FormSelect } from "./formSelect.component";
import { FormButton } from "./formButton.component";

const UserAddEditForm = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    
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
                history.go(0)
            });
        })
    }

    const updateUser = (userId, data) => {
        currentUser.getIdToken().then(idToken => {
            UserService.updateByUserId(userId, data, idToken).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {

        UserTypeService.getAll().then(res => {
            setUserTypes(res.map(({userTypeId, userTypeName}) => ({key: userTypeId, label: userTypeName})));
        });
    
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                UserService.findByUserId(userId, idToken).then(res => {
                    const fields = ['userFirstName', 'userLastName', 'userEmail', 'userUserTypeId'];
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
                        name="userFirstName"
                        label="First Name"
                        control={control}
                    />
                    <div>{errors.firstName?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="userLastName"
                        label="First Name"
                        control={control}
                    />
                    <div>{errors.lastName?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="userEmail"
                        label="Email"
                        control={control}
                    />
                    <div>{errors.email?.message}</div>
                </div>

                { isAddMode ?
                    <div>
                        <FormSelect 
                            name="userUserTypeId"
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