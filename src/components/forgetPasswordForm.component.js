import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";

const ForgetPasswordForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { control, handleSubmit, reset, errors, formState} = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        
        firebase
            .doPasswordReset(data.email)
            .then(() => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }

    return(
        <div></div>
/*         <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{'Forget Password'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="email"
                        label="Email"
                        type="email"
                        control={control}
                    />
                    <div>{errors.email?.message}</div>
                </div>
            </div>
            <div>
                <FormButton 
                    label="Reset Password"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
            { error && <p>{ error.message }</p> }
        </form> */
    );
}

export {ForgetPasswordForm}