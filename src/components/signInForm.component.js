import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { FormButton } from "./formButton.component";
import { FormTextField } from "./formTextField.component";

const SignInForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { control, handleSubmit, reset, errors, formState} = useForm();
    const [error, setError] = useState(null);


    const onSubmit = (data) => {
        firebase
            .doSignInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                history.push('/home');
            })
            .catch((error) => {
                setError(error);
            });
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{'Sign In'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="email"
                        label="Email"
                        control={control}
                    />
                    <div>{errors.email?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="password"
                        label="Password"
                        type="password"
                        control={control}
                    />
                    <div>{errors.password?.message}</div>
                </div>
            </div>
            <div>
                <FormButton 
                    label="Sign In"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
            { error && <p>{ error.message }</p> }
        </form>
    );
}

export {SignInForm};