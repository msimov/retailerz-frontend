import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { FormButton } from "./formButton.component";
import { FormTextField } from "./formTextField.component";

const SignUpForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { control, handleSubmit, reset, errors, formState} = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {

        firebase
            .doCreateUserWithEmailAndPassword(data.email, data.password)
            .then((authUser) => {
                history.go(0)
            })
            .catch(error => {
                setError(error);
            });

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{'Sign Up'}</h1>
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
                    label="Sign Up"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
            { error && <p>{ error.message }</p> }
        </form>
    );
}

export {SignUpForm};