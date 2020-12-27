import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as CONDITIONS from '../../constants/conditions';
import { FirebaseContext } from '../Firebase';
import { withProtectedRoute } from '../Session';

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm/>
    </div>
);

const SignUpForm = () => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const resetState = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
    }

    const onSubmit = (event) => {
        firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                resetState();
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    }

    const isInvalid = 
        email === '' ||
        password === '' ||
        password !== confirmPassword;


    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ email }
                onChange={ e => setEmail(e.target.value) }
                type="text"
                placeholder="Email Address"
            />
            <input
                value={ password }
                onChange={ e => setPassword(e.target.value) }
                type="password"
                placeholder="Password"
            />
            <input
                value={ confirmPassword }
                onChange={ e => setConfirmPassword(e.target.value) }
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={ isInvalid } type="submit">
                Sign Up
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ ROUTES.SIGN_UP }>Sign Up</Link>
    </p>
);

export default withProtectedRoute([CONDITIONS.USER_NULL])(SignUpPage);

export { SignUpForm, SignUpLink };