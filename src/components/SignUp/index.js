import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import axios from 'axios';

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

    const onSubmit = (event) => {
        firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                const currentUser = firebase.getCurrentUser();
                currentUser.getIdToken().then(idToken => {
                    axios.post(
                        'http://localhost:3001/users',
                        {id: currentUser.uid, email, firstName, lastName, type},
                        {headers: {Authorization: `Bearer ${idToken}`}}
                    )
                    .then((res) => {
                        history.push(ROUTES.HOME)
                    }).catch(error => {
                        setError(error.response.data)
                    })
                })
            })
            .catch(error => {
                setError(error)
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

export default SignUpPage;

export { SignUpForm, SignUpLink };