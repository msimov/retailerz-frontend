import React, { useContext, useState } from "react";
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { FirebaseContext } from "../Firebase";
import { withProtectedRoute } from "../Session";

const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget Page</h1>
        <PasswordForgetForm/>
    </div>
);

const PasswordForgetForm = () => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const resetState = () => {
        setEmail('');
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        firebase
            .doPasswordReset(email)
            .then(() => {
                resetState();
            })
            .catch((error) => {
                setError(error);
            });
    }

    const isInvalid = email === '';

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={ isInvalid } type="submit">
                Reset Password
            </button>

            { error && <p>{ error.message }</p>}
        </form>
    );
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ ROUTES.PASSWORD_FORGET }>Forget Password?</Link>
    </p>
);

const condition = authUser => authUser == null;

export default withProtectedRoute(condition, ROUTES.HOME)(PasswordForgetPage);

export { PasswordForgetForm,  PasswordForgetLink };
