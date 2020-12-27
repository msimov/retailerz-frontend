import React, { useContext, useState } from "react";
import { SignUpLink } from '../SignUp';
import { FirebaseContext } from '../Firebase';
import * as CONDITIONS from '../../constants/conditions';
import { PasswordForgetLink } from "../PasswordForget";
import { withProtectedRoute } from "../Session";

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm/>
        <SignInGoogle/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
);

const SignInForm = () => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const resetState = () => {
        setEmail('');
        setPassword('');
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                resetState();
            })
            .catch((error) => {
                setError(error)
            });
    }

    const isInvalid =
        password === '' ||
        email === '';

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ email }
                onChange={ (e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
            />
            <input
                value={ password }
                onChange={ (e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button disabled={ isInvalid } type="submit">
                Sign In
            </button>

            { error && <p>{ error.message }</p> }
        </form>
    );
    
}


const SignInGoogle = () => {
    const firebase = useContext(FirebaseContext);

    const [error, setError] = useState(null);

    const resetState = () => {
        setError(null);
    }
    
    const onSubmit = (event) => {
        
        firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                resetState();
            })
            .catch((error) => {
                setError(error);
            });
            
        event.preventDefault();
    }
    
    return(
        <form onSubmit={ onSubmit }>
            <button type="submit">Sign In With Google</button>
            { error && <p>{ error.message }</p> }
        </form>
    );
    
}

export default withProtectedRoute([CONDITIONS.USER_NULL])(SignInPage);

export { SignInForm, SignInGoogle };