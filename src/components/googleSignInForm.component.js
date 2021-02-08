import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { FormButton } from "./formButton.component";

const GoogleSignInForm = () => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { handleSubmit, reset, formState} = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        
        firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div>
{/*                 <FormButton 
                    label="Sign In With Google"
                    type="submit"
                    disabled={formState.isSubmitting}
                /> */}
            </div>
            { error && <p>{ error.message }</p> }
        </form>
    );
    
}

export {GoogleSignInForm};