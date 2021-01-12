import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { FormButton } from "./formButton.component";
import { FormTextField } from "./formTextField.component";


const ChangePasswordForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { control, handleSubmit, reset, errors, formState} = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        firebase
        .doPasswordUpdate(data.password)
        .then(() => {
            history.push(".");
        })
        .catch((error) => {
            setError(error);
        });
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{'Change Password'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="password"
                        label="Password"
                        type="password"
                        control={control}
                    />
                    <div>{errors.password?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        control={control}
                    />
                    <div>{errors.confirmPassword?.message}</div>
                </div>
            </div>
            <div>
                <FormButton 
                    label="Save"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
            { error && <p>{ error.message }</p> }
        </form>
    );

} 

export {ChangePasswordForm};