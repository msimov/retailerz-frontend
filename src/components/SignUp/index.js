import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as CONDITIONS from '../../constants/conditions';
import { FirebaseContext } from '../Firebase';
import axios from 'axios';
import { withProtectedRoute } from '../Session';

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm/>
    </div>
);

const SignUpForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [type, setType] = useState(1)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const resetState = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setType(1);
        setPassword('');
        setConfirmPassword('');
        setError(null);
    }

    const onSubmit = (event) => {
        firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                //Instead of getting the User Info here Redirect user to /user-info for better user experience if
                //backend is down, and firebase is up. (Check google sign in for an example).
                const currentUser = firebase.getCurrentUser();
                currentUser.getIdToken().then(idToken => {
                    axios.post(
                        'http://localhost:3001/users',
                        {id: currentUser.uid, email, firstName, lastName, type},
                        {headers: {Authorization: `Bearer ${idToken}`}}
                    )
                    .then((res) => {
                        resetState();
                    }).catch(error => {
                        if(error.response !== undefined) {
                            setError(error.response.data);
                        } else {
                            setError(error);
                        }
                    })
                }).catch(error => {
                    setError(error);
                })
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    }

    const isInvalid = 
        email === '' ||
        firstName === '' ||
        lastName === '' ||
        type < 1 ||
        type > 2 ||
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
                value={ firstName }
                onChange={ e => setFirstName(e.target.value) }
                type="text"
                placeholder="First Name"
            />
            <input
                value={ lastName }
                onChange={ e => setLastName(e.target.value) }
                type="text"
                placeholder="Last Name"
            />
            <input
                value={ type }
                onChange={ e => setType(e.target.value) }
                type="number"
                placeholder="Account Type"
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